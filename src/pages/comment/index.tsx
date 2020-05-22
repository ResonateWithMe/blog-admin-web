/**
 * @description index
 * @author ShiLin
 * @date 2020/5/15 11:30
 */
import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import ProTable, { ProColumns, TableDropdown, ActionType } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { findCommentList } from '@/services/comment';
import { Comment } from '@/interfaces/Comment';

const columns: ProColumns<any>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 72,
  },
  {
    title: '评论者',
    dataIndex: 'commentator',
    copyable: true,
    ellipsis: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 200,
    hideInSearch: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
    ellipsis: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 200,
    hideInSearch: true,
  },
  {
    title: '网站链接',
    dataIndex: 'websiteUrl',
    copyable: true,
    ellipsis: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 200,
    hideInSearch: true,
  },
  {
    title: '评论内容',
    dataIndex: 'commentBody',
    copyable: true,
    ellipsis: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 200,
    hideInSearch: true,
  },
  {
    title: '评论IP',
    dataIndex: 'commentatorIp',
    copyable: true,
    ellipsis: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 200,
    hideInSearch: true,
  },
  {
    title: '回复内容',
    dataIndex: 'replyBody',
    copyable: true,
    ellipsis: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 200,
    hideInSearch: true,
  },
  {
    title: '评论状态',
    dataIndex: 'commentStatus',
    copyable: true,
    ellipsis: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 200,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    key: 'commentCreateTime',
    dataIndex: 'commentCreateTime',
    valueType: 'dateTime',
    hideInForm: true,
  },
  {
    title: 'option',
    valueType: 'option',
    render: (text, row, _, action) => [
      <a href={row.websiteUrl} target="_blank" rel="noopener noreferrer">
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
  return (
    <PageHeaderWrapper>
      <Drawer width={600} onClose={() => setVisible(false)} visible={visible}>
        <Button
          style={{
            margin: 8,
          }}
          onClick={() => {
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
          刷新
        </Button>
        <Button
          onClick={() => {
            if (actionRef.current) {
              actionRef.current.reset();
            }
          }}
        >
          重置
        </Button>
        <ProTable<Comment>
          columns={columns}
          type="form"
          onSubmit={(params) => console.log(params)}
        />
      </Drawer>
      <ProTable<Comment>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => {
          const data = await findCommentList({
            currentPage: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: data.data.list,
            total: data.totalCount,
          };
        }}
        rowKey="id"
        dateFormatter="string"
        headerTitle="评论列表"
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
    </PageHeaderWrapper>
  );
};
