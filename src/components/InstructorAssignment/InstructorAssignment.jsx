import React, { useEffect, useRef, useState } from 'react';
import { WrapperHeader } from './style';
import { Button, Form, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import * as LessonService from '../../services/LessonService';
import * as AssignmentService from '../../services/AssignmentService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import * as message from '../../components/MessageComponent/MessageComponent';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

const InstructorAssignment = ({course}) => {
    const user = useSelector((state) => state?.user)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const searchInput = useRef(null);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [stateAssignment, setstateAssignment] = useState({
        title: '', 
        description: '', 
        courseId: course?._id, 
        instructorId: user?.id,
    });

    const [stateAssignmentDetails, setstateAssignmentDetails] = useState({
        title: '', 
        description: '', 
        courseId: course?._id, 
        instructorId: user?.id,
    });

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { title, description, courseId, instructorId } = data
            const res = AssignmentService.createAssignment({title, description, courseId, instructorId})
            return res
        }
    )

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            const res = AssignmentService.updateAssignment( id, access_token, { ...rests })
            return res
        }
    )

    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, access_token } = data
            const res = AssignmentService.deleteAssignment( id, access_token)
            return res
        }
    )

    const mutationDeleteMany = useMutationHooks(
        (data) => {
            const { access_token, ...ids } = data
            const res = AssignmentService.deleteManyAssignment( ids, access_token)
            return res
        }
    )

    const handleDeleteManyLesson = (ids) => {
        mutationDeleteMany.mutate({ ids: ids, access_token: user?.access_token }, {
            onSettled: () => {
                queryAssignment.refetch()
            }
        })
    }
    
    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany

    const fetchCountAssignment = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await AssignmentService.countAllAssignment(id)
            return res
        }
    }

    const queryAssignment = useQuery(['count-assignments', course?._id], fetchCountAssignment, { enabled: !!course?._id })
    const { isLoadingLesson, data: countAssignments } =  queryAssignment

    const fetchGetDetailsAssignment = async (rowSelected) => {
        const res = await AssignmentService.getDetailsAssignment(rowSelected)
        if (res?.data){
            setstateAssignmentDetails({
                title: res?.data?.title,
                description: res?.data?.description,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() =>{
        form.setFieldsValue(stateAssignmentDetails)
    },[form, stateAssignmentDetails])

    useEffect(() =>{
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsAssignment(rowSelected)
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
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          sorter: (a, b) => a.name.length - b.name.length,
          ...getColumnSearchProps('title'),
        },
        {
          title: 'Description',
          dataIndex: 'description',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction,
        },
    ];

    const dataTableFilter = countAssignments?.data?.length && countAssignments?.data?.map((countAssignment) => {
        return {
          ...countAssignment,
          key: countAssignment._id
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
        setstateAssignment({
            title: '', 
            description: '',
        })
        form.resetFields()
    };

    const handleCancelDrawer = () => {
        setIsOpenDrawer(false);
        setstateAssignmentDetails({
            title: '', 
            description: '',
        })
        form.resetFields()
    }

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    }

    const handleDeleteLesson = () => {
        mutationDelete.mutate({ id: rowSelected, access_token: user?.access_token }, {
            onSettled: () => {
                queryAssignment.refetch()
            }
        })
    }

    const onFinish = () => {
        mutation.mutate(stateAssignment, {
            onSettled: () => {
                queryAssignment.refetch()
            }
        })
    }

    const handleOnChange = (e) => {
        setstateAssignment({
            ...stateAssignment,
            courseId: course?._id, 
            instructorId: user?.id,
            [e.target.name] : e.target.value
        })
    }

    const handleOnChangeDetails = (e) => {
        setstateAssignmentDetails({
            ...stateAssignmentDetails,
            courseId: course?._id, 
            instructorId: user?.id,
            [e.target.name] : e.target.value
        })
    }

    const onUpdateLesson = () => {
        mutationUpdate.mutate({ id: rowSelected, access_token: user?.access_token, ...stateAssignmentDetails }, {
            onSettled: () => {
                queryAssignment.refetch()
            }
        })
    }

    return (
        <div>
            <WrapperHeader>Quản lý bài tập</WrapperHeader>
            <br></br>
            <Button onClick={showModal} style={{ marginTop: '12px', borderColor: '#404040', height: '60px', width: '60px', borderRadius: '6px' }}>
                <PlusOutlined style={{ fontSize: '2.4rem', color: '#404040' }} />
            </Button>
            <div style={{ marginTop: '16px' }}>
                <TableComponent handleDeleteMany={handleDeleteManyLesson} onChange={handleChange} columns={columns} isLoading={isLoadingLesson} data={dataTableFilter} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        }
                    };
                }}/>
            </div>
            <ModalComponent forceRender title="Tạo bài tập" footer={null} open={isModalOpen} onCancel={handleCancel}>
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
                        label="Tiêu đề"
                        name="title"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập tiêu đề của bài tập!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateAssignment.title}
                                onChange={handleOnChange}
                                name="title"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập mô tả của bài tập!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateAssignment.description}
                                onChange={handleOnChange}
                                name="description"
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

            <DrawerComponent title='Cập nhật bài học' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width= '50%'>
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
                        label="Tiêu đề"
                        name="title"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập tiêu đề của bài tập!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateAssignment.title}
                                onChange={handleOnChangeDetails}
                                name="title"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập mô tả của bài tập!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateAssignment.description}
                                onChange={handleOnChangeDetails}
                                name="description"
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

            <ModalComponent title="Xóa bài tập" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteLesson} >
                <LoadingComponent isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc chắn muốn xóa bài tập này ?</div>
                </LoadingComponent>
            </ModalComponent>
        </div>
    )
}

export default InstructorAssignment