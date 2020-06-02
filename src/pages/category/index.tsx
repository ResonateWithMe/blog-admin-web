/**
 * @description index
 * @author ShiLin
 * @date 2020/5/15 11:30
 */
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Modal } from 'antd';
import ProTable, { ProColumns, TableDropdown, ActionType } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { findCategoryList } from '@/services/category';
import { Category } from '@/interfaces/Category';
import { FormInstance } from 'antd/es/form';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import { Dispatch } from '@@/plugin-dva/connect';

interface PropsType {
  dispatch: Dispatch;
  updating: boolean;
  adding: boolean;
  deleting: boolean;
}

const CategoryPage: React.FC<PropsType> = (props) => {
  const { dispatch, updating, adding, deleting } = props;
  const editForm = useRef<FormInstance>();
  const tableRef = useRef<ActionType>();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const addRecord = (params: {}) => {
    dispatch({
      type: 'category/fetchAdd',
      payload: params,
    });
  };

  const editRecord = (params: {}) => {
    dispatch({
      type: 'category/fetchUpdate',
      payload: params,
    });
  };

  const delRecord = (params: {}) => {
    Modal.confirm({
      title: '删除提示',
      icon: <ExclamationCircleOutlined />,
      content: '您想要删除这篇文章？',
      onOk() {
        dispatch({
          type: 'category/fetchDel',
          payload: [params],
        });
      },
    });
  };

  const columns: ProColumns<Category>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 72,
    },
    {
      title: '分类ID',
      dataIndex: 'categoryId',
      hideInSearch: true,
      width: 200,
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
      renderFormItem() {
        return editVisible && <Input disabled />;
      },
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
      // TODO：图标选择
      /* renderFormItem() {
        return <Input placeholder="请选择标签"/>;
      }, */
    },
    {
      title: '分类排序',
      dataIndex: 'categoryRank',
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

  useEffect(() => {
    if (updating || adding || deleting) {
      if (adding) {
        setAddVisible(false);
      }
      if (updating) {
        setEditVisible(false);
      }
      return tableRef?.current?.reload;
    }
    return undefined;
  }, [updating, adding, deleting]);

  return (
    <PageHeaderWrapper>
      <Drawer title="新增" width={600} onClose={() => setAddVisible(false)} visible={addVisible}>
        <ProTable<Category>
          columns={columns}
          type="form"
          loading={adding}
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
          loading={updating}
          type="form"
          onSubmit={(params) => editRecord(params)}
        />
      </Drawer>
      <ProTable<Category>
        columns={columns}
        actionRef={tableRef}
        rowKey="categoryId"
        dateFormatter="string"
        headerTitle="文章分类列表"
        toolBarRender={() => [
          <Button key="3" type="primary" onClick={() => setAddVisible(true)}>
            <PlusOutlined />
            新建
          </Button>,
        ]}
        request={async (params = {}) => {
          const data = await findCategoryList({
            ...params,
            currentPage: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: data.data.data,
            total: data.data.totalCount,
          };
        }}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }: ConnectState) => ({
  updating: loading.effects['category/fetchUpdate'] || false,
  adding: loading.effects['category/fetchAdd'] || false,
  deleting: loading.effects['category/fetchDel'] || false,
}))(CategoryPage);
