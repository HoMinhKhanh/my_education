import React, { useState } from 'react';
import { FileDoneOutlined, MailOutlined, ScheduleOutlined, AreaChartOutlined } from '@ant-design/icons';
import * as CourseService from '../../services/CourseService';
import { Menu } from 'antd';
import { useQuery } from '@tanstack/react-query';
import InstructorLesson from '../InstructorLesson/InstructorLesson';
import InstructorAssignment from '../InstructorAssignment/InstructorAssignment';
import InstructorScore from '../InstructorScore/InstructorScore';

const InstructorManager = ({ id }) => {

    const fetchGetDetailsCourse = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await CourseService.getDetailsCourse(id)
            return res
        }
    }
    
    const { isLoadingCourse, data: course } = useQuery(['course', id], fetchGetDetailsCourse, { enabled: !!id })

    const items = [
        {
          label: 'Bài học',
          key: 'lesson',
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

    const [current, setCurrent] = useState('');

    const renderPage = (key) => {
        switch (key) {
            case 'lesson':
                return (
                    <InstructorLesson course={course?.data} />
                )
            case 'assignment':
                return (
                    <InstructorAssignment course={course?.data} />
                )
            case 'score':
                return (
                    <InstructorScore course={course?.data} />
                )
            case 'statistical':
                return (
                    <div>
                        statistical
                    </div>
                )
            default:
                return <></>
        }
    }

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };


    return (
        <div>
            <div>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} /> 
            </div>
            <div>
                <h1 style={{ fontSize: '2.0rem', lineHeight: '1.4', fontWeight: '700', margin: '12px 0 12px 12px', color: '#242424' }}>
                    {course?.data?.name}
                </h1>
                <div style={{ margin: '12px 0 12px 12px' }}>
                    {renderPage(current)}
                </div>
            </div>
        </div>
    )
}

export default InstructorManager