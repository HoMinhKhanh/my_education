import React, { useState } from 'react';
import { SwitcherOutlined, UserOutlined, ReadOutlined, FileOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getItem } from '../../util';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminCourse from '../../components/AdminCourse/AdminCourse';
import AdminNews from '../../components/AdminNews/AdminNews';
import AdminLesson from '../../components/AdminLesson/AdminLesson';

const AdminPage = () => {
    const items = [
        getItem('Tài khoản', 'user', <UserOutlined />),
        getItem('Khóa học', 'course', <SwitcherOutlined />),
        getItem('Bài học', 'lesson', <FileOutlined />),
        getItem('Tin tức', 'news', <ReadOutlined />),
    ];
    
    const [keySelected, setKeySelected] = useState('')

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <AdminUser />
                )
            case 'course':
                return (
                    <AdminCourse />
                )
            case 'lesson':
                return (
                    <AdminLesson />
                )
            case 'news':
                return (
                    <AdminNews />
                )
            default:
                return <></>
        }
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

export default AdminPage