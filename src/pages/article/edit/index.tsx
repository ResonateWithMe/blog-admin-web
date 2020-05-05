import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Form, Input, Button, Select, Spin } from 'antd';
import { queryArticle, getAllCategories, updateArticle } from '@/services/article';
import styles from './index.less';

interface EditProps {
  id: number;
  location: Location;
}

interface Category {
  categoryIcon: string;
  categoryId: number;
  categoryName: string;
  categoryRank: number;
  createTime: Date;
}

interface Article {
  articleCategoryId: number;
  articleCategoryName: string;
  articleContent: string;
  articleCoverImage: string;
  articleId: number;
  articleStatus: number;
  articleSubUrl: string;
  articleTags: string;
  articleTitle: string;
  articleViews: number;
  createTime: string;
  enableComment: boolean;
  isDeleted: number;
  key: number;
  updateTime: Date;
}

const tailLayout = {
  wrapperCol: {
    lg: {
      offset: 10,
      span: 4,
    },
    xs: {
      offset: 0,
      span: 24,
    },
  },
};

// 初始化Markdown解析器
const mdParser = new MarkdownIt(/* Markdown-it options */);

const Edit: React.FC<EditProps> = (props) => {
  // @ts-ignore
  const {
    location: { query },
  } = props;
  const [categoriesAll, setCategoriesAll] = useState<Category[]>([]);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [form] = Form.useForm();

  // @ts-ignore
  const handleEditorChange = ({ html, text }) => {
    form.setFieldsValue({
      articleContent: html,
      articleContentText: text,
    });
  };
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onFinish = (values) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateArticle(values).then((res) => {});
  };

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (value) => {};

  const initArticleData = () => {
    setSpinning(true);
    Promise.all([queryArticle(query.id), getAllCategories()])
      .then((values) => {
        const [articleResult, allCategoriesResult] = values;
        if (articleResult.resultCode !== 200 || allCategoriesResult.resultCode !== 200) {
          return;
        }
        const articles = articleResult.data || {};
        const articleData: Article = articles.article || {};
        const currentCategoryData: Category[] = articles.categories || [];
        form.setFieldsValue({
          articleTitle: articleData.articleTitle,
          articleContentText: articleData.articleContent,
          categories: currentCategoryData.map((item) => item.categoryName),
        });
        setCategoriesAll(allCategoriesResult.data || []);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {})
      .finally(() => {
        setSpinning(false);
      });
  };

  useEffect(() => {
    initArticleData();
  }, []);

  return (
    <PageHeaderWrapper>
      <div className={styles.edit}>
        <Spin tip="Loading..." spinning={spinning}>
          <Form form={form} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              label="标题"
              name="articleTitle"
              rules={[{ required: true, message: '请输入文章标题!' }]}
            >
              <Input placeholder="请输入文章标题" />
            </Form.Item>
            <Form.Item
              label="分类"
              name="categories"
              rules={[{ required: true, message: '请选择文章分类!' }]}
            >
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择文章分类"
                onChange={handleChange}
              >
                {categoriesAll.map((item) => {
                  return (
                    <Select.Option value={item.categoryName} key={item.categoryId}>
                      {item.categoryName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="articleContentText"
              rules={[{ required: true, message: '请输入文章内容!' }]}
            >
              <MdEditor
                value=""
                style={{ height: '500px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button block type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </PageHeaderWrapper>
  );
};

export default Edit;
