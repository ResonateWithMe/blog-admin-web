import React, { FC, useEffect } from 'react';
import { Card, Col, Form, List, Row, Select, Tag } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import { Article } from '@/interfaces/article';
import { Category } from '@/interfaces/category';
import ArticleListContent from './components/ArticleListContent';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';

const { Option } = Select;
const FormItem = Form.Item;

interface ListSearchArticlesProps {
  dispatch: Dispatch;
  articleList: Article[];
  allCategories: Category[];
  loading: boolean;
}

const ListSearchArticles: FC<ListSearchArticlesProps> = ({
  dispatch,
  articleList,
  allCategories,
  loading,
}) => {
  const [form] = Form.useForm();
  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  const owners = [
    {
      id: 'wzj',
      name: '我自己',
    },
    {
      id: 'wjh',
      name: '吴家豪',
    },
    {
      id: 'zxx',
      name: '周星星',
    },
    {
      id: 'zly',
      name: '赵丽颖',
    },
    {
      id: 'ym',
      name: '姚明',
    },
  ];

  const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
  }> = ({ type, text }) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'like-o':
        return (
          <span>
            <LikeOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'message':
        return (
          <span>
            <MessageOutlined style={{ marginRight: 8 }} />
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
      type: 'article/fetchAllCategories',
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
            <FormItem name="category">
              <TagSelect expandable>
                {allCategories.map((item) => {
                  return (
                    <TagSelect.Option value={item.categoryId} key={item.categoryId}>
                      {item.categoryName}
                    </TagSelect.Option>
                  );
                })}
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="owner" grid>
            <FormItem name="owner" noStyle>
              <Select mode="multiple" placeholder="选择 owner">
                {owners.map((owner) => (
                  <Option key={owner.id} value={owner.id}>
                    {owner.name}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <a className={styles.selfTrigger} onClick={setOwner}>
              只看自己的
            </a>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="活跃用户" name="user">
                  <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="lisa">李三</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="好评度" name="rate">
                  <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="good">优秀</Option>
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
                <IconText key="star" type="star-o" text={item.key} />,
                <IconText key="like" type="like-o" text={item?.key} />,
                <IconText key="message" type="message" text={item?.key} />,
              ]}
              extra={
                <div className={styles.listItemExtra}>
                  <img
                    src="https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/34fae6cd7b899e5195d5334f4da7d933c8950d15.jpg"
                    width="272"
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
                    <Tag>Ant Design</Tag>
                    <Tag>设计语言</Tag>
                    <Tag>蚂蚁金服</Tag>
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

export default connect(({ article, loading }: ConnectState) => ({
  articleList: article.articleList || [],
  allCategories: article.allCategories || [],
  loading: loading.effects['article/fetchAllArticle'] || false,
}))(ListSearchArticles);
