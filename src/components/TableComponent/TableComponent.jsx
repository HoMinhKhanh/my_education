import React, { useState } from 'react';
import { Button, Dropdown, Space, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from 'react';

const TableComponent = (props) => {

    const { selectionType = 'checkbox', data:dataSource = [], isLoading = false, columns= [], handleDeleteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])

    const newColumnExport = useMemo(() => {
      const arr = columns?.filter((col) => col.dataIndex !== 'action')
      return arr
    }, [columns])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
      handleDeleteMany(rowSelectedKeys)
    }

    const exportExcel = () => {
      const excel = new Excel();
      excel
        .addSheet("test")
        .addColumns(newColumnExport)
        .addDataSource(dataSource, {
          str2Percent: true
        })
        .saveAs("Excel.xlsx");
    };

    const items = [
      {
        key: '1',
        label: (
          <div onClick={handleDeleteAll}>
            Xóa những mục đã chọn
          </div>
        ),
      },
    ];

    return (
      <LoadingComponent isLoading={isLoading}>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          {rowSelectedKeys.length > 0 && (
            <div>
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Hành động
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          )}
          
          <Button onClick={exportExcel}>Xuất Excel</Button>
        </div>

        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
          {...props}
        />
      </LoadingComponent>
    )
}

export default TableComponent