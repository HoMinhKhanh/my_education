import React, { useState } from 'react';
import { CreditCardOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import * as CourseService from '../../services/CourseService';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import InstructorManager from '../../components/InstructorManager/InstructorManager';

const InstructorPage = () => {
    const user = useSelector((state) => state?.user)

    const fetchCountCourseInstructor = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await CourseService.getAllCourseInstructor(id)
            return res
        }
    }
    
    const { isLoadingLesson, data: courses } = useQuery(['count-courses', user?.id], fetchCountCourseInstructor, { enabled: !!user?.id })

    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
    }

    const items = courses?.data?.map(
        course => getItem(
            course?.name, 
            course?._id, 
            <CreditCardOutlined />, 
            null,
            'item', 
            null,
        )
    )
    
    const [keySelected, setKeySelected] = useState('')

    const renderPage = (key) => {
        return (
            <div>
                <InstructorManager id={key} />
            </div>
        )
    }

    const handleOnClick = ({ key }) => {
        setKeySelected(key)
    }

    return (
        <>
            <HeaderComponent />
            <div style={{ display: 'flex' }}>
                <Menu
                    mode="inline"
                    style={{
                        width: '256px',
                        height: '100vh',
                        borderRight: '2px solid #ccc',
                        fontSize: '1.4rem'
                    }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div style={{ width: '100%', padding: '0 40px 0 20px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    )
}

export default InstructorPage