import {
  Button,
  Divider,
  message,
  Space,
  Table,
  Card,
  Descriptions,
  Badge,
  Typography,
} from 'antd';
import { history } from '@@/core/history';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ActionType } from '@ant-design/pro-table';
import { queryArticleList, updateRule, addRule } from '@/services/article';
import { Article } from '@/interfaces/article';
import CreateForm from '../components/CreateForm';
import UpdateForm, { FormValueType } from '../components/UpdateForm';
import AdvancedSearchForm from '../components/AdvancedSearchForm';
import styles from './index.less';

const { Paragraph } = Typography;

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [tableDataSource, setTableDataSource] = useState([]);

  const actionRef = useRef<ActionType>();

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
   */
  // eslint-disable-next-line no-shadow
  const onSelectChange = (selectedRowKeys: React.SetStateAction<string[]>) => {
    setSelectedRowKeys(selectedRowKeys);
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

  /**
   * 获取文章数据
   * @constructor
   */
  const getTableDataSource = () => {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleDelete(articleId: number) {}

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
      title: '文章分类ID',
      dataIndex: 'articleCategoryId',
      key: 'articleCategoryId',
    },
    {
      title: '操作',
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
    onChange: (keys) => onSelectChange(keys),
  };

  const articleStatusType = {
    1: {
      status: 'success',
      text: '发布',
    },
    0: {
      status: 'default',
      text: '草稿',
    },
  };
  const enableCommentType = {
    1: {
      status: 'success',
      text: '开启（允许评论）',
    },
    0: {
      status: 'default',
      text: '关闭（不允许评论）',
    },
  };

  const expandedRowRender = (record: Article) => {
    const {
      articleCategoryName,
      articleTags,
      articleStatus,
      articleViews,
      enableComment,
      createTime,
      updateTime,
      articleContent,
      articleCoverImage,
    } = record;
    return (
      <Card>
        <Descriptions title="文章信息">
          <Descriptions.Item label="文章分类名称">{articleCategoryName}</Descriptions.Item>
          <Descriptions.Item label="文章标签">{articleTags}</Descriptions.Item>
          <Descriptions.Item label="文章状态">
            <Badge
              status={articleStatusType[articleStatus].status}
              text={articleStatusType[articleStatus].text}
            />
          </Descriptions.Item>
          <Descriptions.Item label="阅读量">{articleViews}</Descriptions.Item>
          <Descriptions.Item label="文章封面" span={2}>
            {articleCoverImage}
          </Descriptions.Item>
          <Descriptions.Item label="开启评论">
            <Badge
              status={enableCommentType[enableComment].status}
              text={enableCommentType[enableComment].text}
            />
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">{createTime}</Descriptions.Item>
          <Descriptions.Item label="更新时间">{updateTime}</Descriptions.Item>
          <Descriptions.Item label="文章内容" span={3}>
            <Paragraph ellipsis={{ rows: 3, expandable: true }}>{articleContent}</Paragraph>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    );
  };

  useEffect(() => {
    getTableDataSource();
  }, []);

  return (
    <PageHeaderWrapper>
      <Card className={styles.article}>
        <AdvancedSearchForm />
        <Divider />
        <div className={styles.actionContainer}>
          <Space>
            <Button onClick={() => handleModalVisible(true)} type="primary">
              添加文章
            </Button>
            <Button>批量删除</Button>
          </Space>
        </div>
        <Table
          rowSelection={rowSelection}
          dataSource={tableDataSource}
          columns={columns}
          expandable={{ expandedRowRender }}
        />
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
      </Card>
    </PageHeaderWrapper>
  );
};

export default TableList;
