import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Form, Input, Button, Select, Spin, Upload, Switch } from 'antd';
import { queryArticle, getAllCategories, updateArticle } from '@/services/article';
import { UploadOutlined } from '@ant-design/icons/lib';
import { Category } from '@/interface/category';
import { Article } from '@/interface/article';
import { Result } from '@/interface/result';
import { ArticleRelevant } from '@/interface/article_relevant';
import styles from './index.less';
import EditableTagGroup from '../components/EditableTagGroup';
import { UploadProps } from 'antd/es/upload/interface';

interface Query {
  id: number;
}

interface Location {
  hash: string;
  key: string;
  pathname: string;
  query: Query;
  search: string;
  state: object;
}

interface EditProps {
  location: Location;
}

interface UploadParam {
  articleId: string;
  articleCategoryId: string;
  articleContentText: string;
  articleCoverImage: string;
  articleStatus: boolean;
  articleTags: string;
  articleTitle: string;
  categories: string;
  enableComment: boolean;
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

const uploadUrl = '/api/upload/file';

const Edit: React.FC<EditProps> = (props) => {
  // @ts-ignore
  const {
    location: { query },
  } = props;
  const [categoriesAll, setCategoriesAll] = useState<Category[]>([]);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [articleTags, setArticleTags] = useState<string[]>([]);
  const [fileList, setFileList] = useState([]);
  const [articleStatusSwitch, setArticleStatusSwitch] = useState(true);
  const [enableCommentSwitch, setEnableCommentSwitch] = useState(true);
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
    console.log(values);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      articleTitle,
      articleCategoryId,
      articleTags: articleTagsC,
      articleContentText,
      articleCoverImage,
      articleStatus,
      enableComment,
    }: UploadParam = values;
    updateArticle({
      articleTitle,
      articleCategoryId,
      articleTags: articleTagsC,
      articleContentText,
      articleCoverImage,
      articleStatus,
      enableComment,
    }).then((res) => {
      console.log(res);
    });
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
        const [articleResult, allCategoriesResult]: [
          Result<ArticleRelevant>,
          Result<Category[]>,
        ] = values;
        if (articleResult.resultCode !== 200 || allCategoriesResult.resultCode !== 200) {
          return;
        }
        const articles = articleResult.data || {};
        const articleData: Article = articles.article || {};
        const currentCategoryData: Category[] = articles.categories || [];
        setArticleTags(articleData.articleTags.split(','));
        form.setFieldsValue({
          articleTitle: articleData.articleTitle,
          articleTags: articleData.articleTags.split(','),
          categories: currentCategoryData.map((item) => item.categoryName),
          articleContentText: articleData.articleContent,
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

  // @ts-ignore
  const uploadProps: UploadProps = {
    action: uploadUrl,
    onChange: (info) => {
      // eslint-disable-next-line no-shadow
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map((file) => {
        if (file.response) {
          // eslint-disable-next-line no-param-reassign
          file.url = file.response.url;
        }
        return file;
      });

      // @ts-ignore
      setFileList(fileList);
    },
    listType: 'picture',
    multiple: true,
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
              label="标签"
              name="articleTags"
              rules={[{ required: true, message: '请输入文章标签!' }]}
            >
              <EditableTagGroup tags={articleTags} setTags={setArticleTags} />
            </Form.Item>
            <Form.Item
              label="封面"
              name="articleCoverImage"
              rules={[{ required: true, message: '请上传文章封面!' }]}
            >
              <Upload {...uploadProps} fileList={fileList}>
                <Button>
                  <UploadOutlined /> 点击上传
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="状态"
              name="articleStatus"
              rules={[{ required: true, message: '请选择文章状态!' }]}
            >
              <Switch
                checked={articleStatusSwitch}
                onChange={(state) => setArticleStatusSwitch(state)}
                checkedChildren="发布"
                unCheckedChildren="草稿"
              />
            </Form.Item>
            <Form.Item
              label="评论"
              name="enableComment"
              rules={[{ required: true, message: '请选择评论开启状态!' }]}
            >
              <Switch
                checked={enableCommentSwitch}
                onChange={(state) => setEnableCommentSwitch(state)}
                checkedChildren="开启"
                unCheckedChildren="关闭"
              />
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
