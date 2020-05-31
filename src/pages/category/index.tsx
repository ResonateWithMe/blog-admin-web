/**
 * @description index
 * @author ShiLin
 * @date 2020/5/15 11:30
 */
import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import ProTable, { ProColumns, TableDropdown } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { findCategoryList } from '@/services/category';
import { Category } from '@/interfaces/Category';
import { FormInstance } from 'antd/es/form';

export default () => {
  const editForm = useRef<FormInstance>();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const addRecord = (params: {}) => {
    console.log(params);
  };

  const editRecord = (params: {}) => {
    console.log(params);
  };

  const delRecord = (params: {}) => {
    console.log(params);
  };

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (text, row, _, action) => [
        <Button
          type="link"
          onClick={() => {
            setEditVisible(true);
            const { current } = editForm;
            return current?.setFieldsValue(row);
          }}
        >
          编辑
        </Button>,
        <TableDropdown
          onSelect={() => delRecord(row.categoryId)}
          menus={[{ key: 'delete', name: '删除' }]}
        />,
      ],
    },
  ];

  return (
    <PageHeaderWrapper>
      <Drawer title="新增" width={600} onClose={() => setAddVisible(false)} visible={addVisible}>
        <ProTable<Category>
          columns={columns}
          type="form"
          onSubmit={(params) => addRecord(params)}
        />
      </Drawer>
      <Drawer
        forceRender
        title="编辑"
        width={600}
        onClose={() => setEditVisible(false)}
        visible={editVisible}
      >
        <ProTable<Category>
          columns={columns}
          formRef={editForm}
          type="form"
          onSubmit={(params) => editRecord(params)}
        />
      </Drawer>
      <ProTable<Category>
        columns={columns}
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
          <Button key="3" type="primary" onClick={() => setAddVisible(true)}>
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
    </PageHeaderWrapper>
  );
};
