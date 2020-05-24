/**
 * @description tag
 * @author ShiLin
 * @date 2020/5/15 11:49
 */
import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import ProTable, { ActionType, ProColumns, TableDropdown } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Category } from '@/interfaces/Category';
import { findTagList } from '@/services/tag';

const columns: ProColumns<any>[] = [
  {
    title: '标签ID',
    dataIndex: 'tagId',
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 200,
  },
  {
    title: '标签名称',
    dataIndex: 'tagName',
    copyable: true,
    ellipsis: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 200,
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInForm: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, row, _, action) => [
      <a href={row.html_url} target="_blank" rel="noopener noreferrer">
        查看
      </a>,
      <TableDropdown
        onSelect={() => action.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const addRecord = (params: {}) => {
  console.log(params);
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  return (
    <PageHeaderWrapper>
      <Drawer title="新增" width={600} onClose={() => setVisible(false)} visible={visible}>
        <ProTable<Category> columns={columns} type="form" onSubmit={addRecord} />
      </Drawer>
      <ProTable<Category>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => {
          const data = await findTagList({
            currentPage: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: data.data.data,
            total: data.data.totalCount,
          };
        }}
        rowKey="tagId"
        dateFormatter="string"
        headerTitle="文章标签列表"
        toolBarRender={() => [
          <Button key="3" type="primary" onClick={() => setVisible(true)}>
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
    </PageHeaderWrapper>
  );
};
