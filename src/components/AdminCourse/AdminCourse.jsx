import React, { useEffect, useRef, useState } from 'react';
import { WrapperHeader } from './style';
import { Button, Form, Space, Upload } from 'antd';
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import { getBase64 } from '../../util';
import * as CourseService from '../../services/CourseService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import * as message from '../../components/MessageComponent/MessageComponent';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

const AdminCourse = () => {
    const user = useSelector((state) => state?.user)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const searchInput = useRef(null);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [stateCourse, setStateCourse] = useState({
        name: '', 
        description: '', 
        image: '', 
        type: '', 
        level: '', 
        price: '',
    });

    const [stateCourseDetails, setStateCourseDetails] = useState({
        name: '', 
        description: '', 
        image: '', 
        type: '', 
        level: '', 
        price: '',
    });

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { name, description, image, type, level, price } = data
            const res = CourseService.createCourse({name, description, image, type, level, price})
            return res
        }
    )

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            const res = CourseService.updateCourse( id, access_token, { ...rests })
            return res
        }
    )

    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, access_token } = data
            const res = CourseService.deleteCourse( id, access_token)
            return res
        }
    )

    const getAllCourses = async () => {
        const res = await CourseService.getAllCourse()
        return res
    }
    
    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete

    const queryCourse = useQuery({queryKey : ['courses'], queryFn : getAllCourses})
    const { isLoading : isLoadingCourses, data : courses } = queryCourse

    const fetchGetDetailsCourse = async (rowSelected) => {
        const res = await CourseService.getDetailsCourse(rowSelected)
        if (res?.data){
            setStateCourseDetails({
                name: res?.data?.name,
                description: res?.data?.description, 
                image: res?.data?.image, 
                type: res?.data?.type, 
                level: res?.data?.level, 
                price: res?.data?.price,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() =>{
        form.setFieldsValue(stateCourseDetails)
    },[form, stateCourseDetails])

    useEffect(() =>{
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsCourse(rowSelected)
        }
    },[rowSelected])

    const handleDetailsCourse = () => {
        setIsOpenDrawer(true)
    }

    const renderAction = () => {
        return (
            <div style={{ fontSize: '24px' }}>
                <EditOutlined style={{ color: 'orange', cursor: 'pointer' }} onClick={handleDetailsCourse}/>
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
          title: 'Type',
          dataIndex: 'type',
        },
        {
          title: 'Level',
          dataIndex: 'level',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          sorter: (a, b) => a.price - b.price,
          filters: [
            {
              text: 'Miễn phí',
              value: '0',
            },
            {
              text: '>=300.000đ',
              value: '>=300000',
            },
          ],
          onFilter: (value, record) => {
            if (value === '0') {
                return record.price === 0
            }
            return record.price >= 300000
          },
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction,
        },
    ];
    
    const dataTable = courses?.data?.length && courses?.data?.map((course) => {
      return {
        ...course,
        key: course._id
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateCourse({
            name: '', 
            description: '', 
            image: '', 
            type: '', 
            level: '', 
            price: '',
        })
        form.resetFields()
    };

    const handleCancelDrawer = () => {
        setIsOpenDrawer(false);
        setStateCourseDetails({
            name: '', 
            description: '', 
            image: '', 
            type: '', 
            level: '', 
            price: '',
        })
        form.resetFields()
    }

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    }

    const handleDeleteCourse = () => {
        mutationDelete.mutate({ id: rowSelected, access_token: user?.access_token }, {
            onSettled: () => {
                queryCourse.refetch()
            }
        })
    }

    const onFinish = () => {
        mutation.mutate(stateCourse, {
            onSettled: () => {
                queryCourse.refetch()
            }
        })
    }

    const handleOnChange = (e) => {
        setStateCourse({
            ...stateCourse,
            [e.target.name] : e.target.value
        })
    }

    const handleOnChangeDetails = (e) => {
        setStateCourseDetails({
            ...stateCourseDetails,
            [e.target.name] : e.target.value
        })
    }

    const handleOnChangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateCourse({
            ...stateCourse,
            image: file.preview
        })
    }

    const handleOnChangeAvatarDetails = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateCourseDetails({
            ...stateCourseDetails,
            image: file.preview
        })
    }

    const onUpdateCourse = () => {
        mutationUpdate.mutate({ id: rowSelected, access_token: user?.access_token, ...stateCourseDetails }, {
            onSettled: () => {
                queryCourse.refetch()
            }
        })
    }

    return (
        <div>
            <WrapperHeader>Quản lý khóa học</WrapperHeader>
            <Button onClick={showModal} style={{ marginTop: '12px', borderColor: '#404040', height: '60px', width: '60px', borderRadius: '6px' }}>
                <PlusOutlined style={{ fontSize: '2.4rem', color: '#404040' }} />
            </Button>
            <div style={{ marginTop: '16px' }}>
                <TableComponent onChange={handleChange} columns={columns} isLoading={isLoadingCourses} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        }
                    };
                }}/>
            </div>

            <ModalComponent forceRender title="Tạo khóa học" footer={null} open={isModalOpen} onCancel={handleCancel}>
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
                        label="Tên khóa học"
                        name="name"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập tên của khóa học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateCourse.name}
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
                            message: 'Xin hãy nhập mô tả của khóa học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateCourse.description}
                                onChange={handleOnChange}
                                name="description"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Hình ảnh"
                        name="image"
                        rules={[
                            {
                            required: false,
                            message: 'Xin hãy chọn hình ảnh của khóa học!',
                            },
                        ]}
                        >
                            <Upload onChange={handleOnChangeAvatar} maxCount={1} name="image">
                                <Button icon={<UploadOutlined />}>Upload</Button>
                                {stateCourse?.image && (
                                    <img src={stateCourse?.image} style={{ height: '60px', width: '60px', objectFit: 'cover', borderRadius: '6px' }} alt='' />
                                )}
                            </Upload>
                        </Form.Item>

                        <Form.Item
                        label="Môn học"
                        name="type"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập môn học của khóa học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateCourse.type}
                                onChange={handleOnChange}
                                name="type"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Độ khó"
                        name="level"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập độ khó của khóa học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateCourse.level}
                                onChange={handleOnChange}
                                name="level"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Giá"
                        name="price"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập giá của khóa học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateCourse.price}
                                onChange={handleOnChange}
                                name="price"
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 17,
                                span: 7,
                            }}
                            >
                            <Button type="primary" htmlType="submit">
                                Đăng khóa học
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
                        onFinish={onUpdateCourse}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                        label="Tên khóa học"
                        name="name"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập tên của khóa học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateCourseDetails.name}
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
                            message: 'Xin hãy nhập mô tả của khóa học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateCourseDetails.description}
                                onChange={handleOnChangeDetails}
                                name="description"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Hình ảnh"
                        name="image"
                        rules={[
                            {
                            required: false,
                            message: 'Xin hãy chọn hình ảnh của khóa học!',
                            },
                        ]}
                        >
                            <Upload onChange={handleOnChangeAvatarDetails} maxCount={1} name="image">
                                <Button icon={<UploadOutlined />}>Upload</Button>
                                {stateCourseDetails?.image && (
                                    <img src={stateCourseDetails?.image} style={{ height: '60px', width: '60px', objectFit: 'cover', borderRadius: '6px' }} alt='' />
                                )}
                            </Upload>
                        </Form.Item>

                        <Form.Item
                        label="Môn học"
                        name="type"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập môn học của khóa học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateCourseDetails.type}
                                onChange={handleOnChangeDetails}
                                name="type"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Độ khó"
                        name="level"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập độ khó của khóa học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateCourseDetails.level}
                                onChange={handleOnChangeDetails}
                                name="level"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Giá"
                        name="price"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập giá của khóa học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateCourseDetails.price}
                                onChange={handleOnChangeDetails}
                                name="price"
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

            <ModalComponent title="Xóa khóa học" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteCourse} >
                <LoadingComponent isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc chắn muốn xóa khóa học này ?</div>
                </LoadingComponent>
            </ModalComponent>
        </div>
    )
}

export default AdminCourse