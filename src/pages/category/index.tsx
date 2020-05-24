/**
 * @description index
 * @author ShiLin
 * @date 2020/5/15 11:30
 */
import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import ProTable, { ActionType, ProColumns, TableDropdown } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { findCategoryList } from '@/services/category';
import { Category } from '@/interfaces/Category';

const columns: ProColumns<Category>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 100,
  },
  {
    title: '分类ID',
    dataIndex: 'categoryId',
    hideInForm: true,
    hideInSearch: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 200,
  },
  {
    title: '分类名称',
    dataIndex: 'categoryName',
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
    title: '分类图标',
    dataIndex: 'categoryIcon',
    ellipsis: true,
    hideInSearch: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 200,
  },
  {
    title: '分类排序',
    dataIndex: 'categoryRank',
    hideInForm: true,
    hideInSearch: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInForm: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, row, _, action) => [
      <a href={row.categoryIcon} target="_blank" rel="noopener noreferrer">
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

export default () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);

  const addRecord = (params: {}) => {
    console.log(params);
  };

  return (
    <PageHeaderWrapper>
      <Drawer title="新增" width={600} onClose={() => setVisible(false)} visible={visible}>
        <ProTable<Category>
          columns={columns}
          type="form"
          onSubmit={(params) => addRecord(params)}
        />
      </Drawer>
      <ProTable<Category>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => {
          const data = await findCategoryList({
            currentPage: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: data.data.data,
            total: data.data.totalCount,
          };
        }}
        rowKey="categoryId"
        dateFormatter="string"
        headerTitle="文章分类列表"
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
