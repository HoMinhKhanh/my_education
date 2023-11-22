import React, { useState } from 'react';
import { FileDoneOutlined, MailOutlined, ScheduleOutlined, AreaChartOutlined } from '@ant-design/icons';
import * as CourseService from '../../services/CourseService';
import { Menu } from 'antd';

const InstructorManager = ({ id }) => {
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [stateCourseDetails, setstateCourseDetails] = useState({});

    const fetchGetDetailsCourse = async (id) => {
        const res = await CourseService.getDetailsCourse(id)
        if (res?.data){
            setstateCourseDetails(res?.data)
            setIsLoadingUpdate(false)
        }
    }

    const items = [
        {
          label: 'Bài học',
          key: 'Course',
          icon: <MailOutlined />,
        },
        {
            label: 'Bài tập',
            key: 'assignment',
            icon: <FileDoneOutlined />,
        },
        {
        label: 'Điểm số',
        key: 'score',
        icon: <ScheduleOutlined />,
        },
        {
        label: 'Thống kê',
        key: 'statistical',
        icon: <AreaChartOutlined />,
        },
    ]

    const [current, setCurrent] = useState('mail');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };


    return (
        <div>
            <div>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} /> 
            </div>
            {id}
        </div>
    )
}

export default InstructorManager