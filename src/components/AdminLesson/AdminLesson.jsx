import React, { useEffect, useRef, useState } from 'react';
import { WrapperHeader } from './style';
import { Button, Form, Space, Upload } from 'antd';
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import { getBase64 } from '../../util';
import * as LessonService from '../../services/LessonService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import * as message from '../../components/MessageComponent/MessageComponent';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

const AdminLesson = () => {

    const user = useSelector((state) => state?.user)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const searchInput = useRef(null);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [stateLesson, setstateLesson] = useState({
        name: '', 
        description: '', 
        videoId: '', 
        courseId: '', 
        rating: '',
    });

    const [stateLessonDetails, setstateLessonDetails] = useState({
        name: '', 
        description: '', 
        videoId: '', 
        courseId: '', 
        rating: '',
    });

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { name, description, videoId, courseId, rating } = data
            const res = LessonService.createLesson({name, description, videoId, courseId, rating})
            return res
        }
    )

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            const res = LessonService.updateLesson( id, access_token, { ...rests })
            return res
        }
    )

    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, access_token } = data
            const res = LessonService.deleteLesson( id, access_token)
            return res
        }
    )

    const mutationDeleteMany = useMutationHooks(
        (data) => {
            const { access_token, ...ids } = data
            const res = LessonService.deleteManyLesson( ids, access_token)
            return res
        }
    )

    const getAllCourses = async () => {
        const res = await LessonService.getAllLesson()
        return res
    }

    const handleDeleteManyLesson = (ids) => {
        mutationDeleteMany.mutate({ ids: ids, access_token: user?.access_token }, {
            onSettled: () => {
                queryLesson.refetch()
            }
        })
    }
    
    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany

    const queryLesson = useQuery({queryKey : ['lessons'], queryFn : getAllCourses})
    const { isLoading : isLoadingLessons, data : lessons } = queryLesson

    const fetchGetDetailsLesson = async (rowSelected) => {
        const res = await LessonService.getDetailsLesson(rowSelected)
        if (res?.data){
            setstateLessonDetails({
                name: res?.data?.name,
                description: res?.data?.description, 
                videoId: res?.data?.videoId, 
                courseId: res?.data?.courseId, 
                rating: res?.data?.rating,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() =>{
        form.setFieldsValue(stateLessonDetails)
    },[form, stateLessonDetails])

    useEffect(() =>{
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsLesson(rowSelected)
        }
    },[rowSelected, isOpenDrawer])

    const handleDetailsLesson = () => {
        setIsOpenDrawer(true)
    }

    const renderAction = () => {
        return (
            <div style={{ fontSize: '24px' }}>
                <EditOutlined style={{ color: 'orange', cursor: 'pointer' }} onClick={handleDetailsLesson}/>
                <DeleteOutlined style={{ color: 'red', cursor: 'pointer', marginLeft: '8px' }} onClick={() => { setIsModalOpenDelete(true) }}/>
            </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <InputComponent
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1677ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
    });

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          sorter: (a, b) => a.name.length - b.name.length,
          ...getColumnSearchProps('name'),
        },
        {
          title: 'Description',
          dataIndex: 'description',
        },
        {
          title: 'VideoId',
          dataIndex: 'videoId',
        },
        {
            title: 'CourseId',
            dataIndex: 'courseId',
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          sorter: (a, b) => a.rating - b.rating,
          filters: [
            {
              text: '<=3',
              value: '<=3',
            },
            {
              text: '>=3',
              value: '>=3',
            },
          ],
          onFilter: (value, record) => {
            if (value === '<=3') {
                return record.price <= 3
            }
            return record.price >= 3
          },
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction,
        },
    ];
    
    const dataTable = lessons?.data?.length && lessons?.data?.map((lesson) => {
      return {
        ...lesson,
        key: lesson._id
      }
    })

    useEffect(() => {
        if(isSuccess && data?.status === 'OK'){
            message.success()
            handleCancel()
        } else if (isError) {
            message.error()
        }
    },[isSuccess, isError])

    useEffect(() => {
        if(isSuccessUpdated && dataUpdated?.status === 'OK'){
            message.success()
            handleCancelDrawer()
        } else if (isErrorUpdated) {
            message.error()
        }
    },[isSuccessUpdated, isErrorUpdated])

    useEffect(() => {
        if(isSuccessDeleted && dataDeleted?.status === 'OK'){
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    },[isSuccessDeleted, isErrorDeleted])

    useEffect(() => {
        if(isSuccessDeletedMany && dataDeletedMany?.status === 'OK'){
            message.success()
        } else if (isErrorDeletedMany) {
            message.error()
        }
    },[isSuccessDeletedMany, isErrorDeletedMany])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setstateLesson({
            name: '', 
            description: '', 
            videoId: '', 
            courseId: '', 
            rating: '',
        })
        form.resetFields()
    };

    const handleCancelDrawer = () => {
        setIsOpenDrawer(false);
        setstateLessonDetails({
            name: '', 
            description: '', 
            videoId: '', 
            courseId: '', 
            rating: '',
        })
        form.resetFields()
    }

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    }

    const handleDeleteLesson = () => {
        mutationDelete.mutate({ id: rowSelected, access_token: user?.access_token }, {
            onSettled: () => {
                queryLesson.refetch()
            }
        })
    }

    const onFinish = () => {
        mutation.mutate(stateLesson, {
            onSettled: () => {
                queryLesson.refetch()
            }
        })
    }

    const handleOnChange = (e) => {
        setstateLesson({
            ...stateLesson,
            [e.target.name] : e.target.value
        })
    }

    const handleOnChangeDetails = (e) => {
        setstateLessonDetails({
            ...stateLessonDetails,
            [e.target.name] : e.target.value
        })
    }

    const onUpdateLesson = () => {
        mutationUpdate.mutate({ id: rowSelected, access_token: user?.access_token, ...stateLessonDetails }, {
            onSettled: () => {
                queryLesson.refetch()
            }
        })
    }

    return (
        <div>
            <WrapperHeader>Quản lý bài học</WrapperHeader>
            <Button onClick={showModal} style={{ marginTop: '12px', borderColor: '#404040', height: '60px', width: '60px', borderRadius: '6px' }}>
                <PlusOutlined style={{ fontSize: '2.4rem', color: '#404040' }} />
            </Button>
            <div style={{ marginTop: '16px' }}>
                <TableComponent handleDeleteMany={handleDeleteManyLesson} onChange={handleChange} columns={columns} isLoading={isLoadingLessons} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        }
                    };
                }}/>
            </div>

            <ModalComponent forceRender title="Tạo bài học" footer={null} open={isModalOpen} onCancel={handleCancel}>
                <LoadingComponent isLoading={isLoading}>
                    <Form
                        name="basic"
                        labelCol={{
                        span: 6,
                        }}
                        wrapperCol={{
                        span: 18,
                        }}
                        style={{
                        maxWidth: 600,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                        label="Tên bài học"
                        name="name"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập tên của bài học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateLesson.name}
                                onChange={handleOnChange}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập mô tả của bài học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateLesson.description}
                                onChange={handleOnChange}
                                name="description"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Thuộc khóa học"
                        name="courseId"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy chọn khóa học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateLesson.courseId}
                                onChange={handleOnChange}
                                name="courseId"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Video"
                        name="videoId"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập video ID bài học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateLesson.videoId}
                                onChange={handleOnChange}
                                name="videoId"
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 17,
                                span: 7,
                            }}
                            >
                            <Button type="primary" htmlType="submit">
                                Đăng bài học
                            </Button>
                        </Form.Item>
                    </Form>
                </LoadingComponent>
            </ModalComponent>

            <DrawerComponent title='Cập nhật khóa học' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width= '50%'>
                <LoadingComponent isLoading={isLoadingUpdated || isLoadingUpdate}>
                    <Form
                        name="basic1"
                        labelCol={{
                        span: 6,
                        }}
                        wrapperCol={{
                        span: 18,
                        }}
                        style={{
                        maxWidth: 600,
                        }}
                        onFinish={onUpdateLesson}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                        label="Tên bài học"
                        name="name"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập tên của bài học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateLesson.name}
                                onChange={handleOnChangeDetails}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập mô tả của bài học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateLesson.description}
                                onChange={handleOnChangeDetails}
                                name="description"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Thuộc khóa học"
                        name="courseId"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy chọn khóa học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateLesson.courseId}
                                onChange={handleOnChangeDetails}
                                name="courseId"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Video"
                        name="videoId"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập video ID bài học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateLesson.videoId}
                                onChange={handleOnChangeDetails}
                                name="videoId"
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 20,
                                span: 4,
                            }}
                            >
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </LoadingComponent>
            </DrawerComponent>

            <ModalComponent title="Xóa khóa học" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteLesson} >
                <LoadingComponent isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc chắn muốn xóa bài học này ?</div>
                </LoadingComponent>
            </ModalComponent>
        </div>
    )
}

export default AdminLesson