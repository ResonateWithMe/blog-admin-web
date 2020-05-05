import { Button, Divider, message, Space, Table } from 'antd';
import { history } from '@@/core/history';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ActionType } from '@ant-design/pro-table';
import CreateForm from '../components/CreateForm';
import UpdateForm, { FormValueType } from '../components/UpdateForm';
import AdvancedSearchForm from '../components/AdvancedSearchForm';
import { queryArticleList, updateRule, addRule } from '../../../services/article';
import styles from './index.less';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({
      desc: fields.desc,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * 行选择
 * @param selectedRowKeys
 * @param setSelectedRowKeys
 */
// @ts-ignore
const onSelectChange = (selectedRowKeys, setSelectedRowKeys) => {
  setSelectedRowKeys(selectedRowKeys);
};

/**
 * 获取文章数据
 * @constructor
 */
const getTableDataSource = (setTableDataSource: (data: []) => void) => {
  queryArticleList({
    currentPage: 1,
    pageSize: 10,
  }).then((res) => {
    if (res.resultCode !== 200) {
      return;
    }
    setTableDataSource(res.data ? res.data.list : []);
  });
};

/**
 * 进入对应文章Id的编辑页面
 * @constructor
 * @param articleId
 */
const goEditPage = (articleId: number) => {
  history.push({
    pathname: '/article/edit',
    query: {
      id: articleId,
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleDelete(articleId: number) {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TableList: React.FC<{}> = (props) => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [tableDataSource, setTableDataSource] = useState([]);

  const actionRef = useRef<ActionType>();
  const columns = [
    {
      title: '序号',
      dataIndex: 'articleId',
      key: 'articleId',
    },
    {
      title: '文章标题',
      dataIndex: 'articleTitle',
      key: 'articleTitle',
    },
    {
      title: '文章自定义路径url',
      dataIndex: 'articleSubUrl',
      key: 'articleSubUrl',
    },
    {
      title: '文章封面图',
      dataIndex: 'articleCoverImage',
      key: 'articleCoverImage',
      ellipsis: true,
    },
    {
      title: '文章内容',
      dataIndex: 'articleContent',
      key: 'articleContent',
    },
    {
      title: '文章分类id',
      dataIndex: 'articleCategoryId',
      key: 'articleCategoryId',
    },
    {
      title: '文章分类名称',
      dataIndex: 'articleCategoryName',
      key: 'articleCategoryName',
      ellipsis: true,
    },
    {
      title: '文章标签',
      dataIndex: 'articleTags',
      key: 'articleTags',
      ellipsis: true,
    },
    {
      title: '文章状态',
      dataIndex: 'articleStatus',
      key: 'articleStatus',
    },
    {
      title: '阅读量',
      dataIndex: 'articleViews',
      key: 'articleViews',
    },
    {
      title: '开启评论',
      dataIndex: 'enableComment',
      key: 'enableComment',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text: { articleId: number }) => (
        <Space>
          <a onClick={() => goEditPage(text.articleId)}>编辑</a>
          <a onClick={() => handleDelete(text.articleId)}>删除</a>
        </Space>
      ),
    },
  ];
  const rowSelection = {
    selectedRowKeys,
    // @ts-ignore
    onChange: (keys) => onSelectChange(keys, setSelectedRowKeys),
  };

  useEffect(() => {
    getTableDataSource(setTableDataSource);
  }, []);

  return (
    <PageHeaderWrapper>
      <div className={styles.article}>
        <AdvancedSearchForm />
        <Divider />
        <div className={styles.actionContainer}>
          <Space>
            <Button onClick={() => handleModalVisible(true)}>新增</Button>
            <Button>Clear filters</Button>
            <Button>Clear filters and sorters</Button>
          </Space>
        </div>
        <Table rowSelection={rowSelection} dataSource={tableDataSource} columns={columns} />
        <CreateForm
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
        />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            onSubmit={async (value) => {
              const success = await handleUpdate(value);
              if (success) {
                handleModalVisible(false);
                setStepFormValues({});
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            onCancel={() => {
              handleUpdateModalVisible(false);
              setStepFormValues({});
            }}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </div>
    </PageHeaderWrapper>
  );
};

export default TableList;
