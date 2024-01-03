import React, { useState } from 'react';
import { WrapperLessonsDetailDescription, WrapperLessonsDetailDescriptionP, WrapperLessonsDetailDiv, WrapperLessonsDetailHeader, WrapperLessonsDetailLeft, WrapperLessonsDetailName, WrapperLessonsDetailRight, WrapperLessonsDetailVideo } from './style';
import { Col, Button, Form, Input, Table } from 'antd';
import { useParams } from 'react-router-dom';
import * as LessonService from '../../services/LessonService';
import * as AssignmentService from '../../services/AssignmentService';
import * as AnswerService from '../../services/AnswerService';
import { useQuery } from '@tanstack/react-query';
import { PlusOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useSelector } from 'react-redux';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { useEffect } from 'react';
import { useMutationHooks } from '../../hooks/useMutationHook';

const LessonDetailsPage = () => {
    const user = useSelector((state) => state?.user)
    const { id } = useParams()
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [keySelected, setKeySelected] = useState('sub1')
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const [stateLessonDetails, setstateLessonDetails] = useState({
        name: '', 
        description: '', 
        videoId: '', 
        courseId: '', 
        rating: '',
    });

    const [stateAssignmentDetails, setstateAssignmentDetails] = useState({
        id: '', 
        title: '',
        description: '',
        courseId: '',
        instructorId: '',
    });

    const [stateAnswerDetails, setstateAnswerDetails] = useState({
        title: '',
        assignmentId: '', 
        studentId: '', 
        courseId: '', 
        content: '', 
        score: '',
    });

    const [stateAnswer, setstateAnswer] = useState({
        title: '',
        assignmentId: '', 
        studentId: '', 
        courseId: '', 
        content: '',
    });

    const [dataTableAnswer, setDataTableAnswer] = useState();

    const handleCopyPaste = (event) => {
        // Ngăn chặn sự kiện Copy (Ctrl+C) và Paste (Ctrl+V)
        event.preventDefault();
        Toastify({
            text: "Bạn không thể Copy/Paste...",
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
        }).showToast();
    };

    const mutation = useMutationHooks(
        (data) => {
            const { title, assignmentId, studentId, courseId, content } = data
            const res = AnswerService.createAnswer({ title, assignmentId, studentId, courseId, content })
            return res
        }
    )

    const { data, isLoading, isSuccess, isError } = mutation

    const fetchCountLesson = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await LessonService.countAllLesson(id)
            return res
        }
    }

    const fetchCountAssignment = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await AssignmentService.countAllAssignment(id)
            return res
        }
    }

    const fetchCountAnswer = async (context) => {
        const courseId = context?.queryKey && context?.queryKey[1]
        const studentId = context?.queryKey && context?.queryKey[2]
        if (id) {
            const res = await AnswerService.countAllAnswer({ courseId, studentId })
            return res
        }
    }

    const { isLoadingLesson, data: lessons } = useQuery(['count-lessons', id], fetchCountLesson, { enabled: !!id })
    const { isLoadingAssignment, data: assignments } = useQuery(['count-assignments', id], fetchCountAssignment, { enabled: !!id })
    const { isLoadingAnswer, data: answers } = useQuery(['count-answers', id, user?.id], fetchCountAnswer, { enabled: !!id })

    function getItem(label, key, icon, children, type, disabled = false) {
        return {
          key,
          icon,
          children,
          label,
          type,
          disabled,
        };
    }

    const items = [
        getItem(
            'Bài học', 
            'sub1', 
            <PlusOutlined />, 
            lessons?.data?.map(
                lesson => getItem(
                    lesson?.name, 
                    lesson?._id, 
                    lesson?.lock ? <CloseCircleOutlined style={{color: 'red'}} /> : <CheckCircleOutlined style={{color: 'green'}} />, 
                    null, 
                    'item', 
                    lesson?.lock)
            )
        ),
        getItem(
            'Bài tập', 
            'sub2', 
            <PlusOutlined />,
            assignments?.data?.map(
                assignment => getItem(
                    assignment?.title,  
                    assignment?._id, 
                )
            )
        ),
        getItem(
            'Điểm số', 
            'sub3', 
            <PlusOutlined />,
            answers?.data?.map(
                answer => getItem(
                    answer?.title,
                    answer?._id, 
                )
            )
        )
    ];

    const columns = [
        {
            title: 'Bài kiểm tra',
            dataIndex: 'title',
        },
        {
            title: 'Điểm số',
            dataIndex: 'score',
        },
        {
            title: 'Ngày nộp',
            dataIndex: 'createdAt',
        },
        {
            title: 'Nhận xét',
            dataIndex: 'comment',
        },
    ];

    const dataTable = answers?.data?.length && answers?.data?.map((answer) => {
        return {
          ...answer,
          key: answer._id
        }
    })

    const renderPage = (key) => {
        switch (key) {
            case 'sub1':
                return (
                    <>
                        <WrapperLessonsDetailVideo>
                            <iframe 
                                style={{ border: 'none' }}
                                width="100%" 
                                height="100%" 
                                src={`https://www.youtube.com/embed/${stateLessonDetails?.videoId}`} 
                                title={stateLessonDetails?.name} 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                        </WrapperLessonsDetailVideo>
                        <WrapperLessonsDetailDescription>
                            <WrapperLessonsDetailName>{stateLessonDetails?.name}</WrapperLessonsDetailName>
                            <WrapperLessonsDetailDescriptionP>
                                <p>{stateLessonDetails?.description}</p>
                            </WrapperLessonsDetailDescriptionP>
                        </WrapperLessonsDetailDescription>
                    </>
                )
            case 'sub2':
                return (
                    <LoadingComponent isLoading={isLoading}>
                        <div 
                            onCopy={handleCopyPaste}
                            onPaste={handleCopyPaste}
                            onCut={handleCopyPaste}
                            style={{ width: '100%', padding: '0 40px 0 20px' }}
                        >
                            <h1 style={{ fontSize: '2.4rem', lineHeight: '1.4', fontWeight: '600', margin: '12px 0 12px 12px' }}>Bài tập</h1>
                            <hr />
                            <h2 style={{ fontSize: '1.8rem', lineHeight: '1.4', fontWeight: '600', margin: '12px 0 12px 12px' }}>{stateAssignmentDetails?.title}</h2>
                            <div>
                                <Form
                                    name="basic"
                                    labelCol={{
                                    span: 4,
                                    }}
                                    wrapperCol={{
                                    span: 20,
                                    }}
                                    style={{
                                        width: '100%',
                                        fontSize: '1.6rem',
                                        lineHeight: '1.4',
                                        fontWeight: '600',
                                    }}
                                    initialValues={{
                                    remember: true,
                                    }}
                                    onFinish={onFinish}
                                    autoComplete="off"
                                    form={form}
                                >
                                    <Form.Item
                                    label="Câu hỏi"
                                    >
                                        <p>{stateAssignmentDetails?.description}</p>
                                    </Form.Item>

                                    <Form.Item
                                    label="Trả lời"
                                    name="answer"
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Bạn chưa điền câu trả lời!',
                                        },
                                    ]}
                                    >
                                        <TextArea onChange={handleOnChange}/>
                                    </Form.Item>

                                    <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                    >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </LoadingComponent>
                )
            case 'sub3':
                return (
                    <div style={{ width: '100%', padding: '0 40px 0 20px' }}>
                        <h1 style={{ fontSize: '2.4rem', lineHeight: '1.4', fontWeight: '600', margin: '12px 0 12px 12px' }}>Điểm số</h1>
                        <hr />
                        <h2 style={{ fontSize: '1.8rem', lineHeight: '1.4', fontWeight: '600', margin: '12px 0 12px 12px' }}>{stateAnswerDetails?.title}</h2>
                        <div style={{ marginTop: '16px' }}>
                            <Table columns={columns} dataSource={dataTableAnswer ? dataTableAnswer : dataTable} />
                        </div>
                    </div>
                )
            default:
                return <></>
        }
    }
    
    // submenu keys of first level
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];

    const [openKeys, setOpenKeys] = useState(['sub1']);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        setKeySelected(latestOpenKey)
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    useEffect(() => {
        const handleWindowBlur = () => {
            Toastify({
                text: "Cảnh báo : Bạn vừa rời khỏi trình duyệt...",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
            }).showToast();
          };
    
        window.addEventListener('blur', handleWindowBlur);
    
        // Hủy đăng ký sự kiện khi component unmount
        return () => {
          window.removeEventListener('blur', handleWindowBlur);
        };
    }, []);

    const fetchGetDetailsLesson = async (id) => {
        const res = await LessonService.getDetailsLesson(id)
        if (res?.data){
            setstateLessonDetails({
                name: res?.data?.name,
                description: res?.data?.description, 
                videoId: res?.data?.videoId, 
                courseId: res?.data?.courseId, 
                rating: res?.data?.rating,
            })
            setIsLoadingUpdate(false)
        }
    }

    const fetchGetDetailsAssignment = async (id) => {
        const res = await AssignmentService.getDetailsAssignment(id)
        if (res?.data){
            setstateAssignmentDetails({
                id: res?.data?._id,
                title: res?.data?.title,
                description: res?.data?.description, 
                courseId: res?.data?.courseId, 
                instructorId: res?.data?.instructorId,
            })
            setIsLoadingUpdate(false)
        }
    }

    const fetchGetDetailsAnswer = async (id) => {
        const res = await AnswerService.getDetailsAnswer(id)
        const answer = res?.data
        if (answer){
            setstateAnswerDetails({
                title: answer.title,
                assignmentId: answer.assignmentId, 
                studentId: answer.studentId, 
                courseId: answer.courseId,
                content: answer.content,
                score: answer.score,
            })

            const yourArray = [answer];
            yourArray[0].key = answer._id;
            setDataTableAnswer(yourArray)
            setIsLoadingUpdate(false)
        }
    }

    const handleLessonClick = (key) => {
        if (keySelected === 'sub1') {
            setIsLoadingUpdate(true)
            fetchGetDetailsLesson(key?.key)
        } else if (keySelected === 'sub2') {
            setIsLoadingUpdate(true)
            fetchGetDetailsAssignment(key?.key)
        } else if (keySelected === 'sub3') {
            setIsLoadingUpdate(true)
            fetchGetDetailsAnswer(key?.key)
        }
    }

    const handleCancel = () => {
        setstateAnswer({
            title: '', 
            assignmentId: '', 
            studentId: '', 
            courseId: '', 
            content: '',
        })
        form.resetFields()
    };

    const handleOnChange = (e) => {
        setstateAnswer({
            title: stateAssignmentDetails.title,
            assignmentId: stateAssignmentDetails.id, 
            studentId: user?.id, 
            courseId: id,
            content: e.target.value,
        })
    }

    useEffect(() => {
        if(isSuccess && data?.status === 'OK'){
            Toastify({
                text: "Bạn đã nộp bài thành công",
                duration: 2000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
            }).showToast();
            handleCancel()
        } else if (isError) {
            Toastify({
                text: "Bạn chưa nộp bài thành công",
                duration: 2000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
            }).showToast();
        }
    },[isSuccess, isError])

    const onFinish = () => {
        console.log('stateAnswer:', stateAnswer)
        mutation.mutate(stateAnswer);
    };


    return (
        <WrapperLessonsDetailDiv>
            <Col span={18}>
                <LoadingComponent isLoading={isLoadingUpdate}>
                    <WrapperLessonsDetailLeft>
                        {renderPage(keySelected)}
                    </WrapperLessonsDetailLeft>
                </LoadingComponent>
            </Col>
            <Col span={6}>
                <WrapperLessonsDetailRight>
                    <WrapperLessonsDetailHeader>Nội dung khóa học</WrapperLessonsDetailHeader>
                </WrapperLessonsDetailRight>
                <div>
                    <Menu
                        mode="inline"
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        onClick={handleLessonClick}
                        style={{
                            width: '100%',
                            backgroundColor: 'rgb(245, 245, 245)',
                            border: '1px solid rgb(235, 235, 235)',
                            borderRadius: '6px',
                            color: '#333',
                            fontSize: '1.6rem',
                            fontWeight: '600',
                        }}
                        items={items}
                    />
                </div>
            </Col>
        </WrapperLessonsDetailDiv>
    )
}

export default LessonDetailsPage