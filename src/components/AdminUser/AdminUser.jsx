import React, { useEffect, useRef, useState } from 'react';
import { WrapperHeader } from './style';
import { Button, Form, Select, Space } from 'antd';
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
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const searchInput = useRef(null);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    // const [stateUser, setStateUser] = useState({
    //     name: '', 
    //     email: '', 
    //     password: '', 
    //     role: '', 
    //     phone: '', 
    // });

    const [stateUserDetails, setStateUserDetails] = useState({
        name: '', 
        email: '', 
        role: '', 
        phone: '', 
    });

    const [form] = Form.useForm();

    // const mutation = useMutationHooks(
    //     (data) => {
    //         const { name, email, password, role, phone } = data
    //         const res = UserService.createUser({name, email, password, role, phone})
    //         return res
    //     }
    // )

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

    const mutationDeleteMany = useMutationHooks(
        (data) => {
            const { access_token, ...ids } = data
            const res = UserService.deleteManyUser( ids, access_token)
            return res
        }
    )

    const getAllUsers = async () => {
        const access_token = user.access_token
        const res = await UserService.getAllUser(access_token)
        return res
    }

    const handleDeleteManyUser = (ids) => {
        mutationDeleteMany.mutate({ ids: ids, access_token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }
    
    // const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany

    const queryUser = useQuery({queryKey : ['user'], queryFn : getAllUsers})
    const { isLoading : isLoadingUsers, data : users } = queryUser

    const fetchGetDetailsUser = async (rowSelected, token) => {
        const res = await UserService.getDetailsUser(rowSelected, token)
        if (res?.data){
            setStateUserDetails({
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
            fetchGetDetailsUser(rowSelected, user?.access_token)
        }
    },[rowSelected, isOpenDrawer])

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

    // useEffect(() => {
    //     if(isSuccess && data?.status === 'OK'){
    //         message.success()
    //         handleCancel()
    //     } else if (isError) {
    //         message.error()
    //     }
    // },[isSuccess, isError])

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

    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    //     setStateUser({
    //         name: '', 
    //         email: '', 
    //         password: '', 
    //         role: '', 
    //         phone: '',
    //     })
    //     form.resetFields()
    // };

    const handleCancelDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetails({
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

    // const onFinish = () => {
    //     mutation.mutate(stateUser, {
    //         onSettled: () => {
    //             queryUser.refetch()
    //         }
    //     })
    // }

    // const handleOnChange = (e) => {
    //     setStateUser({
    //         ...stateUser,
    //         [e.target.name] : e.target.value
    //     })
    // }

    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
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

    const onChange = (value) => {
        setStateUserDetails({
            ...stateUserDetails,
            role : value
        })
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };
    
    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <div>
            <WrapperHeader>Quản lý tài khoản</WrapperHeader>
            {/* <Button onClick={showModal} style={{ marginTop: '12px', borderColor: '#404040', height: '60px', width: '60px', borderRadius: '6px' }}>
                <PlusOutlined style={{ fontSize: '2.4rem', color: '#404040' }} />
            </Button> */}
            <div style={{ marginTop: '16px' }}>
                <TableComponent handleDeleteMany={handleDeleteManyUser} onChange={handleChange} columns={columns} isLoading={isLoadingUsers} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        }
                    };
                }}/>
            </div>

            {/* <ModalComponent title="Tạo tài khoản" footer={null} open={isModalOpen} onCancel={handleCancel}>
                <LoadingComponent isLoading={isLoading}>
                    <Form
                        name="modalForm"
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
                        label="Tên người dùng"
                        name="name"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập tên của người dùng!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateUser.name}
                                onChange={handleOnChange}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập email của người dùng!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateUser.email}
                                onChange={handleOnChange}
                                name="email"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập password của người dùng!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateUser.password}
                                onChange={handleOnChange}
                                name="password"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Vai trò"
                        name="role"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập vai trò của người dùng!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateUser.role}
                                onChange={handleOnChange}
                                name="role"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập số điện thoại của người dùng!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateUser.phone}
                                onChange={handleOnChange}
                                name="phone"
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 17,
                                span: 7,
                            }}
                            >
                            <Button type="primary" htmlType="submit">
                                Tạo tài khoản
                            </Button>
                        </Form.Item>
                    </Form>
                </LoadingComponent>
            </ModalComponent> */}

            <DrawerComponent forceRender title='Cập nhật thông tin người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width= '50%'>
                <LoadingComponent isLoading={isLoadingUpdated || isLoadingUpdate}>
                    <Form
                        name="drawer"
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
                            {/* <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateUserDetails.role}
                                onChange={handleOnChangeDetails}
                                name="role"
                            /> */}
                            <Select
                                showSearch
                                placeholder="Chọn vai trò"
                                optionFilterProp="children"
                                onChange={onChange}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                options={[
                                {
                                    value: 'admin',
                                    label: 'admin',
                                },
                                {
                                    value: 'student',
                                    label: 'student',
                                },
                                {
                                    value: 'instructor',
                                    label: 'instructor',
                                },
                                ]}
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

            <ModalComponent title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser} >
                <LoadingComponent isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc chắn muốn xóa tài khoản này ?</div>
                </LoadingComponent>
            </ModalComponent>
        </div>
    )
}

export default AdminUser