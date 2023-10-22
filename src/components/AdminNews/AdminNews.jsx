import React from 'react';
import { WrapperHeader } from './style';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';

const AdminNews = () => {
    return (
        <div>
            <WrapperHeader>Quản lý tin tức</WrapperHeader>
            <Button style={{ marginTop: '12px', borderColor: '#404040', height: '60px', width: '60px', borderRadius: '6px' }}>
                <PlusOutlined style={{ fontSize: '2.4rem', color: '#404040' }} />
            </Button>
            <div style={{ marginTop: '16px' }}>
                <TableComponent />
            </div>
        </div>
    )
}

export default AdminNews