import React, { useEffect, useRef, useState } from 'react';
import { WrapperHeader } from './style';
import { Button, Form, Space } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent'
import * as NewsService from '../../services/NewsService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import * as message from '../../components/MessageComponent/MessageComponent';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

const AdminNews = () => {

    const user = useSelector((state) => state?.user)
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const searchInput = useRef(null);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const [stateNewsDetails, setstateNewsDetails] = useState({
        title: '', 
        content: '', 
        like: '', 
        author: '', 
    });

    const [form] = Form.useForm();

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            const res = NewsService.updateNews( id, access_token, { ...rests })
            return res
        }
    )

    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, access_token } = data
            const res = NewsService.deleteNews( id, access_token)
            return res
        }
    )

    const getAllNews = async () => {
        const res = await NewsService.getAllNews()
        return res
    }
    
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete

    const queryNews = useQuery({queryKey : ['news'], queryFn : getAllNews})
    const { isLoading : isLoadingNews, data : allNews } = queryNews

    const fetchGetDetailsNews = async (rowSelected) => {
        const res = await NewsService.getDetailsNews(rowSelected)
        if (res?.data){
            setstateNewsDetails({
                title: res?.data?.title,
                content: res?.data?.content,
                like: res?.data?.like,
                author: res?.data?.author,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() =>{
        form.setFieldsValue(stateNewsDetails)
    },[form, stateNewsDetails])

    useEffect(() =>{
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsNews(rowSelected)
        }
    },[rowSelected])

    const handleDetailsNews = () => {
        setIsOpenDrawer(true)
    }

    const renderAction = () => {
        return (
            <div style={{ fontSize: '24px' }}>
                <EditOutlined style={{ color: 'orange', cursor: 'pointer' }} onClick={handleDetailsNews}/>
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
          title: 'Tiêu đề',
          dataIndex: 'title',
          sorter: (a, b) => a.title.length - b.title.length,
          ...getColumnSearchProps('title'),
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            sorter: (a, b) => a.content.length - b.content.length,
            ...getColumnSearchProps('content'),
        },
        {
            title: 'Lượt thích',
            dataIndex: 'like',
            sorter: (a, b) => a.like - b.like,
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            sorter: (a, b) => a.author.length - b.author.length,
            ...getColumnSearchProps('author'),
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction,
        },
    ];
    
    const dataTable = allNews?.data?.length && allNews?.data?.map((news) => {
      return {
        ...news,
        key: news._id
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
        setstateNewsDetails({
            title: '', 
            content: '', 
            like: '', 
            author: '', 
        })
        form.resetFields()
    }

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    }

    const handleDeleteUser = () => {
        mutationDelete.mutate({ id: rowSelected, access_token: user?.access_token }, {
            onSettled: () => {
                queryNews.refetch()
            }
        })
    }

    const handleOnChangeDetails = (e) => {
        setstateNewsDetails({
            ...stateNewsDetails,
            [e.target.name] : e.target.value
        })
    }

    const onUpdateUser = () => {
        mutationUpdate.mutate({ id: rowSelected, access_token: user?.access_token, ...stateNewsDetails }, {
            onSettled: () => {
                queryNews.refetch()
            }
        })
    }

    return (
        <div>
            <WrapperHeader>Quản lý tin tức</WrapperHeader>
            <div style={{ marginTop: '16px' }}>
                <TableComponent onChange={handleChange} columns={columns} isLoading={isLoadingNews} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        }
                    };
                }}/>
            </div>

            <DrawerComponent forceRender title='Cập nhật tin tức' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width= '50%'>
                <LoadingComponent isLoading={isLoadingUpdated || isLoadingUpdate}>
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
                        onFinish={onUpdateUser}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập tiêu đề khóa học!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateNewsDetails.title}
                                onChange={handleOnChangeDetails}
                                name="title"
                            />
                        </Form.Item>

                        <Form.Item
                        label="Nội dung"
                        name="content"
                        rules={[
                            {
                            required: true,
                            message: 'Xin hãy nhập nội dung tin tức!',
                            },
                        ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateNewsDetails.content}
                                onChange={handleOnChangeDetails}
                                name="content"
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

            <ModalComponent forceRender title="Xóa tin tức" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser} >
                <LoadingComponent isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc chắn muốn xóa tin tức này ?</div>
                </LoadingComponent>
            </ModalComponent>
        </div>
    )
}

export default AdminNews