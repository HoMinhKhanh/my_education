import React from 'react';
import { PlayCircleFilled, MehFilled, HourglassFilled, SafetyCertificateFilled } from '@ant-design/icons';
import { WrapperButtonHover, WrapperCourseDetail, WrapperCourseDetailH5, WrapperCourseDetailLi, WrapperCourseDetailSpan, WrapperCourseDetailUl } from './style';
import { Image } from 'antd';

const CourseDetailComponent = () => {
    return (
        <div>
            <WrapperCourseDetail>
                <div style=
                    {{
                        position: 'relative',
                        margin: '2px 0px 20px',
                    }}>
                    <Image 
                        src={'https://i.ytimg.com/vi/6ZcGSYn9Ark/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAptGmj8g7I7_nt17ZmbM9N96vLGw'}
                        alt="image course"
                        preview={false}
                        style={{
                            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
                            borderRadius: '16px',
                        }}
                    />
                    <PlayCircleFilled style={{ position: 'absolute', left: '43%', top: '43%', fontSize: '6rem', color: '#333' }}/>
                </div>
                <WrapperCourseDetailH5>
                    Miễn phí
                </WrapperCourseDetailH5>
                <WrapperButtonHover textButton='Đăng ký học' type='default' 
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
                <WrapperCourseDetailUl>
                    <WrapperCourseDetailLi>
                        <SafetyCertificateFilled />
                        <WrapperCourseDetailSpan>Trình độ cơ bản</WrapperCourseDetailSpan>
                    </WrapperCourseDetailLi>
                    <WrapperCourseDetailLi>
                        <HourglassFilled />
                        <WrapperCourseDetailSpan>Tổng số <strong>138</strong> bài học</WrapperCourseDetailSpan>
                    </WrapperCourseDetailLi>
                    <WrapperCourseDetailLi>
                        <MehFilled />
                        <WrapperCourseDetailSpan>Học mọi lúc, mọi nơi</WrapperCourseDetailSpan>
                    </WrapperCourseDetailLi>
                </WrapperCourseDetailUl>
            </WrapperCourseDetail>
        </div>
    )
}

export default CourseDetailComponent