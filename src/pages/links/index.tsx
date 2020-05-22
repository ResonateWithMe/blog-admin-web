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
import { findLinksList } from '@/services/links';

const columns: ProColumns<any>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 72,
  },
  {
    title: '标题',
    dataIndex: 'linkName',
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
    title: '链接地址',
    dataIndex: 'linkUrl',
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
    title: '链接类型',
    dataIndex: 'linkType',
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
    title: '链接描述',
    dataIndex: 'linkDescription',
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
    title: '链接排序',
    dataIndex: 'linkRank',
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
    key: 'createTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInForm: true,
  },
  {
    title: 'option',
    valueType: 'option',
    render: (text, row, _, action) => [
      <a href={row.linkUrl} target="_blank" rel="noopener noreferrer">
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
        <ProTable<Link> columns={columns} type="form" onSubmit={(params) => console.log(params)} />
      </Drawer>
      <ProTable<Link>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => {
          const data = await findLinksList({
            currentPage: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: data.data.list,
            total: data.data.totalCount,
          };
        }}
        rowKey="id"
        dateFormatter="string"
        headerTitle="友情链接"
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
