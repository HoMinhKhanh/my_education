import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const ChapterComponent = ({lessons}) => {

  function getItem(label, key, icon, children, type, disabled = false) {
    return {
      key,
      icon,
      children,
      label,
      type,
      disabled,
    };
  }
  const items = [
    getItem('Bài học', 'sub1', <PlusOutlined />, lessons?.data?.map(lesson => getItem(lesson?.name, lesson?._id, null, null, 'item', lesson?.lock)))
  ];
  
  // submenu keys of first level
  const rootSubmenuKeys = ['sub1'];

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