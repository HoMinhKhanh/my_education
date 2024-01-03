import { Col, Row } from 'antd';
import React from 'react';
import { WrapperProductDetails, WrapperProductDetailsH1, WrapperProductDetailsLi, WrapperProductDetailsP, WrapperProductDetailsUl } from './style';
import ChapterComponent from '../../components/ChapterComponent/ChapterComponent';
import CourseDetailComponent from '../../components/CourseDetailComponent/CourseDetailComponent';
import { useParams } from 'react-router-dom';
import * as CourseService from '../../services/CourseService';
import * as LessonService from '../../services/LessonService';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

const ProductDetailsPage = () => {
    const { id } = useParams()

    const fetchGetDetailsCourse = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await CourseService.getDetailsCourse(id)
            return res.data
        }
    }

    const fetchCountLesson = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await LessonService.countAllLesson(id)
            return res
        }
    }

    const { isLoading, data: courseDetails } = useQuery(['course-details', id], fetchGetDetailsCourse, { enabled: !!id })
    const { isLoadingLesson, data: lessons } = useQuery(['count-lessons', id], fetchCountLesson, { enabled: !!id })

    return (
        <WrapperProductDetails>
            <LoadingComponent isLoading={isLoading}>
                <Row>
                    <Col span={16}>
                        <div style={{ marginTop: '20px', padding: '0 12px' }}>
                            <WrapperProductDetailsH1>{courseDetails?.name}</WrapperProductDetailsH1>
                            <div>
                                <WrapperProductDetailsP>{courseDetails?.description}</WrapperProductDetailsP>
                            </div>
                            <div style={{ marginTop: '12px' }}>
                                <div>
                                    <h2>Nội dung khóa học</h2>
                                    <div>
                                        <WrapperProductDetailsUl>
                                            <li><strong>3</strong> chương</li>
                                            <WrapperProductDetailsLi>•</WrapperProductDetailsLi>
                                            <li><strong>{lessons?.total}</strong> bài học</li>
                                        </WrapperProductDetailsUl>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <ChapterComponent courseDetails={courseDetails} lessons={lessons}/>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <CourseDetailComponent courseDetails={courseDetails} lessons={lessons}/>
                    </Col>
                </Row>
            </LoadingComponent>
        </WrapperProductDetails>
    )
}

export default ProductDetailsPage