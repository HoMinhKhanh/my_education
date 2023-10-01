import { Col, Row } from 'antd';
import React from 'react';
import { WrapperProductDetails, WrapperProductDetailsH1, WrapperProductDetailsLi, WrapperProductDetailsP, WrapperProductDetailsUl } from './style';
import ChapterComponent from '../../components/ChapterComponent/ChapterComponent';
import CourseDetailComponent from '../../components/CourseDetailComponent/CourseDetailComponent';

const ProductDetailsPage = () => {
    return (
        <WrapperProductDetails>
            <Row>
                <Col span={16}>
                    <div style={{ marginTop: '20px', padding: '0 12px' }}>
                        <WrapperProductDetailsH1>Khóa học Tiếng Anh Matt</WrapperProductDetailsH1>
                        <div>
                            <WrapperProductDetailsP>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus harum odit optio eligendi, numquam laboriosam voluptatibus molestiae officiis in eius quos exercitationem facilis quod corrupti. Nihil facere ea fuga illum?</WrapperProductDetailsP>
                        </div>
                        <div>
                            <div>
                                <h2>Nội dung khóa học</h2>
                                <div>
                                    <WrapperProductDetailsUl>
                                        <li><strong>11</strong> chương</li>
                                        <WrapperProductDetailsLi>•</WrapperProductDetailsLi>
                                        <li><strong>138</strong> bài học</li>
                                    </WrapperProductDetailsUl>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ChapterComponent />
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <CourseDetailComponent />
                </Col>
            </Row>
        </WrapperProductDetails>
    )
}

export default ProductDetailsPage