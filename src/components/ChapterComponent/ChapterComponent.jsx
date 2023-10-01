import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Giới thiệu', 'sub1', <PlusOutlined />, [
    getItem('Thứ bạn cần thay đổi khi học Tiếng Anh!', '1'),
    getItem('Dẫn Chứng Cách Thay Đổi', '2'),
    getItem('Tất cả cần biết về lý thuyết khi học Tiếng Anh', '3'),
    getItem('Làm điều này mỗi khi xem Tiếng Anh', '4'),
  ]),
  getItem('Bài học', 'sub2', <PlusOutlined />, [
    getItem('Cách học TỪ VỰNG hiệu quả', '5'),
    getItem('Speaking, phát âm và giọng điệu', '6'),
  ]),
  getItem('Bài tập', 'sub3', <PlusOutlined />, [
    getItem('Bài tập 1', '9'),
    getItem('Bài tập 2', '10'),
    getItem('Bài tập 3', '11'),
    getItem('Bài tập 4', '12'),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
const ChapterComponent = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        marginTop: '20px',
        width: '100%',
        backgroundColor: 'rgb(245, 245, 245)',
        border: '1px solid rgb(235, 235, 235)',
        borderRadius: '6px',
        color: '#333',
        fontSize: '1.6rem',
        fontWeight: '600',
      }}
      items={items}
    />
  );
};
export default ChapterComponent;