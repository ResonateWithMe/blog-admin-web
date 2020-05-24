import React, { FC, useEffect, useState } from 'react';
import { Card, Col, Form, List, Row, Tag, Select, Modal } from 'antd';
import {
  MessageOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import { Article } from '@/interfaces/Article';
import { Category } from '@/interfaces/Category';
import { Tag as TagType } from '@/interfaces/Tag';

import { history } from '@@/core/history';
import ArticleListContent from '../components/ArticleListContent';
import StandardFormRow from '../components/StandardFormRow';

import styles from './style.less';

const { CheckableTag } = Tag;

const { confirm } = Modal;
const { Option } = Select;
const FormItem = Form.Item;

interface ListSearchArticlesProps {
  dispatch: Dispatch;
  articleList: Article[];
  categoryList: Category[];
  tagList: TagType[];
  loading: boolean;
  deleting: boolean;
}

const ListSearchArticles: FC<ListSearchArticlesProps> = (props) => {
  const { dispatch, articleList, loading, deleting, categoryList, tagList } = props;
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [articleStatus, setArticleStatus] = useState<number>();
  const [enableComment, setEnableComment] = useState<number>();
  const [form] = Form.useForm();

  const goEditPage = (articleId: string | number) => {
    history.push({
      pathname: '/article/edit',
      query: {
        id: articleId,
      },
    });
  };

  const deleteArticle = (articleId: React.ReactText) => {
    confirm({
      title: '删除提示',
      icon: <ExclamationCircleOutlined />,
      content: '您想要删除这篇文章？',
      okText: '是',
      cancelText: '否',
      onOk() {
        dispatch({
          type: 'article/deleteArticle',
          payload: [articleId],
        });
        return deleting;
      },
      onCancel() {},
    });
  };

  const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
    handleClick?: () => void;
  }> = ({ type, text, handleClick }) => {
    switch (type) {
      case 'message':
        return (
          <span>
            <MessageOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'edit':
        return (
          <span onClick={handleClick}>
            <EditOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'delete':
        return (
          <span onClick={handleClick}>
            <DeleteOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      default:
        return null;
    }
  };

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((t) => t !== category);
    setSelectedCategories(nextSelectedTags);
  };

  const handleArticleStateChange = (value: number) => {
    setArticleStatus(value);
  };

  const enableCommentChange = (value: number) => {
    setEnableComment(value);
  };

  useEffect(() => {
    dispatch({
      type: 'article/fetchAllArticle',
      payload: {
        currentPage: 1,
        pageSize: 10,
        articleCategories: selectedCategories,
        articleTags: selectedTags,
        articleStatus,
        enableComment,
      },
    });
  }, [selectedTags, selectedCategories, articleStatus, enableComment]);

  useEffect(() => {
    dispatch({
      type: 'article/fetchAllArticle',
      payload: {
        currentPage: 1,
        pageSize: 10,
      },
    });
    dispatch({
      type: 'category/fetchAllCategory',
    });
    dispatch({
      type: 'tag/fetchAllTag',
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'article/fetchAllArticle',
      payload: {
        currentPage: 1,
        pageSize: 10,
      },
    });
  }, [deleting]);

  return (
    <>
      <Card bordered={false}>
        <Form
          layout="inline"
          form={form}
          initialValues={{
            owner: ['wjh', 'zxx'],
          }}
          onValuesChange={() => {
            /* dispatch({
              type: 'articleAndlistAndListSearchArticles/fetch',
              payload: {
                count: 8,
              },
            }); */
          }}
        >
          <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
            <FormItem>
              {categoryList.map((category) => (
                <CheckableTag
                  key={category.categoryId}
                  checked={selectedCategories.indexOf(category.categoryName) > -1}
                  onChange={(checked) => handleCategoryChange(category.categoryName, checked)}
                >
                  {category.categoryName}
                </CheckableTag>
              ))}

              {/* <Button type="primary" shape="round" icon={<DownloadOutlined />}>
                Download
              </Button> */}
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="所属标签" block style={{ paddingBottom: 11 }}>
            <FormItem>
              {tagList.map((tag) => (
                <CheckableTag
                  key={tag.tagId}
                  checked={selectedTags.indexOf(tag.tagName) > -1}
                  onChange={(checked) => handleTagChange(tag.tagName, checked)}
                >
                  {tag.tagName}
                </CheckableTag>
              ))}
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="文章状态">
                  <Select
                    placeholder="不限"
                    style={{ minWidth: 120, width: '100%' }}
                    onChange={handleArticleStateChange}
                  >
                    <Option value="1">已发布</Option>
                    <Option value="0">未发布</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="是否可评论">
                  <Select
                    placeholder="不限"
                    style={{ minWidth: 120, width: '100%' }}
                    onChange={enableCommentChange}
                  >
                    <Option value="1">可评论</Option>
                    <Option value="0">不可评论</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <Card
        style={{ marginTop: 24 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <List<Article>
          size="large"
          loading={loading}
          rowKey="id"
          itemLayout="vertical"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={articleList}
          renderItem={(item) => (
            <List.Item
              key={item.key}
              actions={[
                <IconText key="message" type="message" text={item.articleViews} />,
                <IconText
                  key="edit"
                  type="edit"
                  text="编辑"
                  handleClick={() => goEditPage(item.articleId)}
                />,
                <IconText
                  key="delete"
                  type="delete"
                  text="删除"
                  handleClick={() => deleteArticle(item.articleId)}
                />,
              ]}
              extra={
                <div className={styles.listItemExtra}>
                  <img
                    src="https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/34fae6cd7b899e5195d5334f4da7d933c8950d15.jpg"
                    width="200"
                    alt=""
                  />
                </div>
              }
            >
              <List.Item.Meta
                title={
                  <a className={styles.listItemMetaTitle} href={item.articleSubUrl}>
                    {item.articleTitle}
                  </a>
                }
                description={
                  <span>
                    {item.articleTags.map((tag) => {
                      return <Tag key={tag.tagId}>{tag.tagName}</Tag>;
                    })}
                  </span>
                }
              />
              <ArticleListContent data={item} />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default connect(({ article, category, tag, loading }: ConnectState) => ({
  articleList: article.articleList || [],
  categoryList: category.allCategory || [],
  tagList: tag.tagList || [],
  loading: loading.effects['article/fetchAllArticle'] || false,
  deleting: loading.effects['article/deleteArticle'] || false,
}))(ListSearchArticles);
