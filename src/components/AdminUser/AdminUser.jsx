import React, { useEffect, useRef, useState } from 'react';
import { WrapperHeader } from './style';
import { Button, Form, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent'
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import * as message from '../../components/MessageComponent/MessageComponent';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

const AdminUser = () => {
    const user = useSelector((state) => state?.user)
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const searchInput = useRef(null);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const [stateUserDetails, setstateUserDetails] = useState({
        name: '', 
        email: '', 
        role: '', 
        phone: '', 
    });

    const [form] = Form.useForm();

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            const res = UserService.updateUser( id, access_token, { ...rests })
            return res
        }
    )

    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, access_token } = data
            const res = UserService.deleteUser( id, access_token)
            return res
        }
    )

    const getAllUsers = async () => {
        const access_token = user.access_token
        const res = await UserService.getAllUser(access_token)
        return res
    }
    
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete

    const queryUser = useQuery({queryKey : ['user'], queryFn : getAllUsers})
    const { isLoading : isLoadingUsers, data : users } = queryUser

    const fetchGetDetailsUser = async (rowSelected, token) => {
        const res = await UserService.getDetailsUser(rowSelected, token)
        if (res?.data){
            setstateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                role: res?.data?.role,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() =>{
        form.setFieldsValue(stateUserDetails)
    },[form, stateUserDetails])

    useEffect(() =>{
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsUser(rowSelected, user.access_token)
        }
    },[rowSelected])

    const handleDetailsUser = () => {
        setIsOpenDrawer(true)
    }

    const renderAction = () => {
        return (
            <div style={{ fontSize: '24px' }}>
                <EditOutlined style={{ color: 'orange', cursor: 'pointer' }} onClick={handleDetailsUser}/>
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
          title: 'Email',
          dataIndex: 'email',
          sorter: (a, b) => a.email.length - b.email.length,
          ...getColumnSearchProps('email'),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone - b.phone,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            sorter: (a, b) => a.role.length - b.role.length,
            ...getColumnSearchProps('role'),
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction,
        },
    ];
    
    const dataTable = users?.data?.length && users?.data?.map((user) => {
      return {
        ...user,
        key: user._id
      }
    })

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

    const handleCancelDrawer = () => {
        setIsOpenDrawer(false);
        setstateUserDetails({
            name: '', 
            email: '', 
            phone: '', 
            role: '', 
        })
        form.resetFields()
    }

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    }

    const handleDeleteUser = () => {
        mutationDelete.mutate({ id: rowSelected, access_token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

    const handleOnChangeDetails = (e) => {
        setstateUserDetails({
            ...stateUserDetails,
            [e.target.name] : e.target.value
        })
    }

    const onUpdateUser = () => {
        mutationUpdate.mutate({ id: rowSelected, access_token: user?.access_token, ...stateUserDetails }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

    return (
        <div>
            <WrapperHeader>Quản lý tài khoản</WrapperHeader>
            <div style={{ marginTop: '16px' }}>
                <TableComponent onChange={handleChange} columns={columns} isLoading={isLoadingUsers} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        }
                    };
                }}/>
            </div>

            <DrawerComponent forceRender title='Cập nhật thông tin người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width= '50%'>
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
                        onFinish={onUpdateUser}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                        label="Tên người dùng"
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
                                value={stateUserDetails.name}
                                onChange={handleOnChangeDetails}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập email người dùng!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateUserDetails.email}
                                onChange={handleOnChangeDetails}
                                name="email"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập số điện thoại người dùng!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateUserDetails.phone}
                                onChange={handleOnChangeDetails}
                                name="phone"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Vai trò"
                        name="role"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập vai trò người dùng!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateUserDetails.role}
                                onChange={handleOnChangeDetails}
                                name="role"
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

            <ModalComponent forceRender title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser} >
                <LoadingComponent isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc chắn muốn xóa tài khoản này ?</div>
                </LoadingComponent>
            </ModalComponent>
        </div>
    )
}

export default AdminUser