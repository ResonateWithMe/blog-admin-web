/**
 * @description tag
 * @author ShiLin
 * @date 2020/5/15 11:49
 */
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Modal } from 'antd';
import ProTable, { ActionType, ProColumns, TableDropdown } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { findTagList } from '@/services/tag';
import { Tag } from '@/interfaces/Tag';
import { FormInstance } from 'antd/es/form';
import { connect } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { Dispatch } from '@@/plugin-dva/connect';

interface PropsType {
  dispatch: Dispatch;
  updating: boolean;
  adding: boolean;
  deleting: boolean;
}

const TagPage: React.FC<PropsType> = (props) => {
  const { dispatch, updating, adding, deleting } = props;
  const editForm = useRef<FormInstance>();
  const tableRef = useRef<ActionType>();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const addRecord = (params: {}) => {
    dispatch({
      type: 'tag/fetchAdd',
      payload: params,
    });
  };

  const editRecord = (params: {}) => {
    dispatch({
      type: 'tag/fetchUpdate',
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
          type: 'tag/fetchDel',
          payload: [params],
        });
      },
    });
  };

  const columns: ProColumns<Tag>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 72,
    },
    {
      title: '标签ID',
      dataIndex: 'tagId',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
      width: 200,
      renderFormItem() {
        return editVisible && <Input disabled />;
      },
    },
    {
      title: '标签名称',
      dataIndex: 'tagName',
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
          onSelect={() => delRecord(row.tagId)}
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
        <ProTable<Tag>
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
        <ProTable<Tag>
          columns={columns}
          formRef={editForm}
          loading={updating}
          type="form"
          onSubmit={(params) => editRecord(params)}
        />
      </Drawer>
      <ProTable<Tag>
        columns={columns}
        rowKey="tagId"
        dateFormatter="string"
        headerTitle="文章标签列表"
        toolBarRender={() => [
          <Button key="3" type="primary" onClick={() => setAddVisible(true)}>
            <PlusOutlined />
            新建
          </Button>,
        ]}
        request={async (params = {}) => {
          const data = await findTagList({
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
}))(TagPage);
