/**
 * @description index
 * @author ShiLin
 * @date 2020/5/15 11:30
 */
import React, { useRef } from 'react';
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
    ellipsis: true,
    width: 120,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
    ellipsis: true,
    width: 100,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
  },
  {
    title: '网站链接',
    dataIndex: 'websiteUrl',
    copyable: true,
    ellipsis: true,
    width: 100,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
  },
  {
    title: '评论内容',
    dataIndex: 'commentBody',
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
    hideInSearch: true,
  },
  {
    title: '回复内容',
    dataIndex: 'replyBody',
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
    title: '评论状态',
    dataIndex: 'commentStatus',
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
  },
  {
    title: '创建时间',
    key: 'commentCreateTime',
    dataIndex: 'commentCreateTime',
    valueType: 'dateTime',
    hideInForm: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, row, _, action) => [
      <a href={row.websiteUrl} target="_blank" rel="noopener noreferrer">
        查看
      </a>,
      <TableDropdown
        onSelect={() => action.reload()}
        menus={[
          { key: 'approved', name: '审核通过' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <PageHeaderWrapper>
      <ProTable<Comment>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => {
          const data = await findCommentList({
            currentPage: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: data.data.data,
            total: data.totalCount,
          };
        }}
        rowKey="articleId"
        dateFormatter="string"
        headerTitle="评论列表"
      />
    </PageHeaderWrapper>
  );
};
