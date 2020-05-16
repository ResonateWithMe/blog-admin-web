import React, { FC, useEffect } from 'react';
import { Card, Col, Form, List, Row, Tag, Select } from 'antd';
import { MessageOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import { Article } from '@/interfaces/article';
import { Category } from '@/interfaces/category';
import { Tag as TagType } from '@/interfaces/tag';

import { history } from '@@/core/history';
import ArticleListContent from '../components/ArticleListContent';
import StandardFormRow from '../components/StandardFormRow';
import TagSelect from '../components/TagSelect';
import styles from './style.less';

const { Option } = Select;
const FormItem = Form.Item;

interface ListSearchArticlesProps {
  dispatch: Dispatch;
  articleList: Article[];
  categoryList: Category[];
  tagList: TagType[];
  loading: boolean;
}

const ListSearchArticles: FC<ListSearchArticlesProps> = (props) => {
  const { dispatch, articleList, categoryList, tagList, loading } = props;
  const [form] = Form.useForm();
  // const setOwner = () => {
  //   form.setFieldsValue({
  //     owner: ['wzj'],
  //   });
  // };

  const goEditPage = (articleId: string | number) => {
    history.push({
      pathname: '/article/edit',
      query: {
        id: articleId,
      },
    });
  };

  const deleteArticle = () => {};

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
      payload: {
        currentPage: 1,
        pageSize: 10,
      },
    });
  }, []);

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
            <FormItem name="categoryList">
              <TagSelect expandable>
                {categoryList.map((item) => {
                  return (
                    <TagSelect.Option value={item.categoryId} key={item.categoryId}>
                      {item.categoryName}
                    </TagSelect.Option>
                  );
                })}
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="所属标签" block style={{ paddingBottom: 11 }}>
            <FormItem name="tagList">
              <TagSelect expandable>
                {tagList.map((tag) => {
                  return (
                    <TagSelect.Option value={tag.tagId} key={tag.tagId}>
                      {tag.tagName}
                    </TagSelect.Option>
                  );
                })}
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="文章状态" name="articleStatus">
                  <Select placeholder="不限" style={{ minWidth: 100, width: '100%' }}>
                    <Option value="1">已发布</Option>
                    <Option value="0">未发布</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="是否可评论" name="enableComment">
                  <Select placeholder="不限" style={{ minWidth: 100, width: '100%' }}>
                    <Option value="1">可评论</Option>
                    <Option value="0">不可评论</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
          {/* 预留
            <StandardFormRow title="作者" grid>
            <FormItem name="owner" noStyle>
              <Select mode="multiple" placeholder="选择标签" style={{minWidth: 200}}>
                {tagList.map((owner) => (
                  <Option key={owner.tagId} value={owner.tagId}>
                    {owner.tagName}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <a className={styles.selfTrigger} onClick={setOwner}>
              只看自己的
            </a>
          </StandardFormRow> */}
        </Form>
      </Card>
      <Card
        style={{ marginTop: 24 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <List<Article>
          size="large"
          loading={articleList.length === 0 ? loading : false}
          rowKey="id"
          itemLayout="vertical"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
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
                <IconText key="delete" type="delete" text="删除" handleClick={deleteArticle} />,
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
                    {item.articleTags.split(',').map((tag) => {
                      return <Tag key={tag}>{tag}</Tag>;
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
  categoryList: category.categoryList || [],
  tagList: tag.tagList || [],
  loading: loading.effects['article/fetchAllArticle'] || false,
}))(ListSearchArticles);
