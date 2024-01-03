import React, { useEffect, useRef, useState } from 'react';
import { WrapperHeader } from './style';
import { Select, Button, Form, Space } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import * as AssignmentService from '../../services/AssignmentService';
import * as AnswerService from '../../services/AnswerService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import * as message from '../../components/MessageComponent/MessageComponent';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

const InstructorScore = ({course}) => {
    const user = useSelector((state) => state?.user)
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [idAssignmentSelected, setIdAssignmentSelected] = useState('');
    const searchInput = useRef(null);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const [stateAnswerDetails, setstateAnswerDetails] = useState({
        title: '', 
        name: '',
        content: '',
        score: '',
    });

    const [form] = Form.useForm();

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            const res = AnswerService.updateAnswer( id, access_token, { ...rests })
            return res
        }
    )

    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, access_token } = data
            const res = AnswerService.deleteAnswer( id, access_token)
            return res
        }
    )

    const mutationDeleteMany = useMutationHooks(
        (data) => {
            const { access_token, ...ids } = data
            const res = AnswerService.deleteManyAnswer( ids, access_token)
            return res
        }
    )

    const handleDeleteManyLesson = (ids) => {
        mutationDeleteMany.mutate({ ids: ids, access_token: user?.access_token }, {
            onSettled: () => {
                queryAnswer.refetch()
            }
        })
    }
    
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

    const fetchGetDetailsAnswer = async (rowSelected) => {
        const res = await AnswerService.getDetailsAnswer(rowSelected)
        if (res?.data){
            setstateAnswerDetails({
                title: res?.data?.title,
                name: res?.data?.studentId?.name,
                content: res?.data?.content,
                score: res?.data?.score,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() =>{
        form.setFieldsValue(stateAnswerDetails)
    },[form, stateAnswerDetails])

    useEffect(() =>{
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsAnswer(rowSelected)
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
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Content',
          dataIndex: 'content',
        },
        {
            title: 'Score',
            dataIndex: 'score',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction,
        },
    ];

    let dataTableFilter = []

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

    const handleCancelDrawer = () => {
        setIsOpenDrawer(false);
        setstateAnswerDetails({
            title: '', 
            name: '',
            content: '',
            score: '',
        })
        form.resetFields()
    }

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    }

    const handleDeleteLesson = () => {
        mutationDelete.mutate({ id: rowSelected, access_token: user?.access_token }, {
            onSettled: () => {
                queryAnswer.refetch()
            }
        })
    }

    const handleOnChangeDetails = (e) => {
        setstateAnswerDetails({
            ...stateAnswerDetails,
            [e.target.name] : e.target.value
        })
    }

    const onUpdateLesson = () => {
        mutationUpdate.mutate({ id: rowSelected, access_token: user?.access_token, ...stateAnswerDetails }, {
            onSettled: () => {
                queryAnswer.refetch()
            }
        })
    }

    const fetchCountAnswer = async (context) => {
        const courseId = context?.queryKey && context?.queryKey[1]
        const assignmentId = context?.queryKey && context?.queryKey[2]
        if (courseId && assignmentId) {
            const res = await AnswerService.countAllAnswerInstructor({ courseId, assignmentId })
            return res
        }
    }

    const queryAnswer = useQuery(['count-answers', course?._id, idAssignmentSelected], fetchCountAnswer, { enabled: !!idAssignmentSelected })
    const { isLoadingAnswer, data: countAnswers } = queryAnswer

    dataTableFilter = countAnswers?.data?.length && countAnswers?.data?.map((countAnswer) => {
        return {
          ...countAnswer,
          name: countAnswer.studentId.name,
          key: countAnswer._id
        }
    })

    const resultCourses = countAssignments?.data?.map((item, index) => ({
        value: item._id,
        label: item.title,
    }));

    const onChange = (value) => {
        setIdAssignmentSelected(value)
    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <div>
            <WrapperHeader>Điểm số</WrapperHeader>
            <Select
                style={{ marginTop: '12px', minWidth: '300px', maxWidth: '300px' }}
                showSearch
                placeholder="Chọn bài tập"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={filterOption}
                options={resultCourses}
            />
            <br></br>
            <div style={{ marginTop: '16px' }}>
                <TableComponent handleDeleteMany={handleDeleteManyLesson} onChange={handleChange} columns={columns} isLoading={isLoadingAnswer} data={dataTableFilter} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        }
                    };
                }}/>
            </div>

            <DrawerComponent forceRender title='Chấm điểm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width= '50%'>
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
                            label="Tên học viên"
                            name="name"
                        >
                            <p>{stateAnswerDetails.name}</p>
                        </Form.Item>

                        <Form.Item
                            label="Câu trả lời"
                            name="content"
                        >
                            <p>{stateAnswerDetails.content}</p>
                        </Form.Item>

                        <Form.Item
                            label="Điểm"
                            name="score"
                            rules={[
                                {
                                required: true,
                                message: 'Xin hãy nhập điểm!',
                                },
                            ]}
                        >
                            <InputComponent 
                                size='large' 
                                bordered={true}
                                value={stateAnswerDetails.score}
                                onChange={handleOnChangeDetails}
                                name="score"
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

            <ModalComponent title="Xóa câu trả lời" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteLesson} >
                <LoadingComponent isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc chắn muốn xóa câu trả lời này ?</div>
                </LoadingComponent>
            </ModalComponent>
        </div>
    )
}

export default InstructorScore