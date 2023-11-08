import React, { useState } from 'react';
import { SwitcherOutlined, UserOutlined, ReadOutlined, FileOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getItem } from '../../util';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminLesson from '../../components/AdminLesson/AdminLesson';

const InstructorPage = () => {
    const items = [
        getItem('Bài học', 'lesson', <FileOutlined />),
    ];
    
    const [keySelected, setKeySelected] = useState('')

    const renderPage = (key) => {
        switch (key) {
            case 'lesson':
                return (
                    <AdminLesson />
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

export default InstructorPage