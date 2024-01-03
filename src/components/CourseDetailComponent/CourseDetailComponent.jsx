import React from 'react';
import { PlayCircleFilled, MehFilled, HourglassFilled, SafetyCertificateFilled } from '@ant-design/icons';
import { WrapperButtonHover, WrapperCourseDetail, WrapperCourseDetailH5, WrapperCourseDetailLi, WrapperCourseDetailSpan, WrapperCourseDetailUl } from './style';
import { Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as MyCourseService from '../../services/MyCourseService';
import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/MessageComponent/MessageComponent';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const CourseDetailComponent = ({courseDetails, lessons}) => {
    const user = useSelector((state) => state.user)
    const [myCourse, setMyCourse] = useState(false)
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const [stateMyCourse, setStateMyCourse] = useState({
        userId: '', 
        courseId: '',
    });

    useEffect(() => {
        setStateMyCourse({
            userId: user?.id, 
            courseId: courseDetails?._id,
        })
    },[user, courseDetails])

    const coursesData  = queryClient.getQueryData(['my-course', user?.id]);

    useEffect(() => {
        if (coursesData) {
          const foundCourse = coursesData?.data.find(course => course?.courseId?._id === courseDetails?._id);
          if (foundCourse) {
            setMyCourse(true);
          }
        } else {
          console.log('Data is not ready yet');
        }
    }, [coursesData, courseDetails?._id]);

    const mutation = useMutationHooks(
        (data) => {
            const { userId, courseId } = data
            const res = MyCourseService.createMyCourse({userId, courseId})
            return res
        }
    )

    const { data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        if(isSuccess && data?.status === 'OK'){
            message.success()
            navigate(`/lesson-details/${stateMyCourse?.courseId}`)
        } else if (isError) {
            message.error()
        }
    },[isSuccess, isError])

    const handleDetailsLesson = (id) => {
        navigate(`/lesson-details/${id}`)
    }

    const handleRegisterCourse = () => {
        mutation.mutate(stateMyCourse)
    }

    return (
        <div>
            <LoadingComponent isLoading={isLoading}>
                <WrapperCourseDetail>
                    <div style=
                        {{
                            position: 'relative',
                            margin: '2px 0px 20px',
                        }}>
                        <Image 
                            src={courseDetails?.image}
                            alt={courseDetails?.name}
                            preview={false}
                            style={{
                                boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
                                borderRadius: '16px',
                            }}
                        />
                        <PlayCircleFilled style={{ position: 'absolute', left: '43%', top: '43%', fontSize: '6rem', color: '#333' }}/>
                    </div>
                    <WrapperCourseDetailH5>
                        {courseDetails?.price ? `${courseDetails?.price.toLocaleString()}đ` : 'Miễn phí' }
                    </WrapperCourseDetailH5>
                    { myCourse ? (
                        <WrapperButtonHover 
                            onClick={() => handleDetailsLesson(courseDetails?._id)}
                            textButton='Vào học'
                            type='default' 
                            style={{
                                fontSize: '1.6rem',
                                marginTop: '16px',
                                minWidth: '180px',
                                backgroundColor: '#f05123',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '16px',
                                height: '36px',
                                fontWeight: '600',
                            }}
                        />
                    ) : (
                        <WrapperButtonHover 
                            onClick={handleRegisterCourse}
                            textButton='Đăng ký'
                            type='default' 
                            style={{
                                fontSize: '1.6rem',
                                marginTop: '16px',
                                minWidth: '180px',
                                backgroundColor: '#f05123',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '16px',
                                height: '36px',
                                fontWeight: '600',
                            }}
                        />
                    )}
                    <WrapperCourseDetailUl>
                        <WrapperCourseDetailLi>
                            <SafetyCertificateFilled />
                            <WrapperCourseDetailSpan>Trình độ <strong>{courseDetails?.level}</strong></WrapperCourseDetailSpan>
                        </WrapperCourseDetailLi>
                        <WrapperCourseDetailLi>
                            <HourglassFilled />
                            <WrapperCourseDetailSpan>Tổng số <strong>{lessons?.total}</strong> bài học</WrapperCourseDetailSpan>
                        </WrapperCourseDetailLi>
                        <WrapperCourseDetailLi>
                            <MehFilled />
                            <WrapperCourseDetailSpan>Học mọi lúc, mọi nơi</WrapperCourseDetailSpan>
                        </WrapperCourseDetailLi>
                    </WrapperCourseDetailUl>
                </WrapperCourseDetail>
            </LoadingComponent>
        </div>
    )
}

export default CourseDetailComponent