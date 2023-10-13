import React from 'react';
import { WrapperLessonsDetailDiv } from './style';
import { Col } from 'antd';

const LessonDetailsPage = () => {
    return (
        <WrapperLessonsDetailDiv>
            <Col span={18}>Left</Col>
            <Col span={6}>Right</Col>
        </WrapperLessonsDetailDiv>
    )
}

export default LessonDetailsPage