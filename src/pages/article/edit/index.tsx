import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Form, Button, Select, Spin, Upload, Switch, Card, notification } from 'antd';
import { queryArticle, updateArticle } from '@/services/article';
import { UploadOutlined } from '@ant-design/icons/lib';
import { Category } from '@/interfaces/category';
import { Article } from '@/interfaces/article';
import { UploadChangeParam, UploadProps } from 'antd/es/upload/interface';
import TextArea from 'antd/es/input/TextArea';
import EditableTagGroup from '../components/EditableTagGroup';

interface Query {
  id: string;
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
  articleContent: string;
  articleCoverImage: UploadChangeParam;
  articleStatus: boolean;
  articleTags: string;
  articleTitle: string;
  categories: string;
  enableComment: boolean;
}

const tailLayout = {
  wrapperCol: {
    lg: {
      offset: 2,
      span: 4,
    },
    xs: {
      offset: 0,
      span: 24,
    },
  },
};

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 17 },
};

// 初始化Markdown解析器
const mdParser = new MarkdownIt(/* Markdown-it options */);

const uploadUrl = '/api/upload/file';

const Edit: React.FC<EditProps> = (props) => {
  const { location } = props;
  const [categoriesAll, setCategoriesAll] = useState<Category[]>([]);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [articleTags, setArticleTags] = useState<string[]>([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  // @ts-ignore
  const handleEditorChange = ({ text }) => {
    form.setFieldsValue({
      articleContent: text,
    });
  };
  // @ts-ignore
  const onFinish = (values) => {
    const {
      articleTitle,
      articleCategoryId,
      articleTags: articleTags2,
      articleContent,
      articleCoverImage,
      articleStatus,
      enableComment,
    }: UploadParam = values;
    setLoading(true);
    updateArticle({
      articleId: location.query.id,
      articleTitle,
      articleCategoryId,
      articleTags: articleTags2.toString(),
      articleContent,
      articleCoverImage: articleCoverImage.file.response.data,
      articleStatus,
      enableComment,
    })
      .then((res) => {
        if (res.resultCode === 200) {
          notification.success({
            message: `${res.message}`,
            description: 'The article content is update success!',
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  const initArticleData = () => {
    setSpinning(true);
    queryArticle(location.query.id)
      .then((res) => {
        if (res.resultCode !== 200) {
          return;
        }
        const result = res.data || {};
        const article: Article = result.article || {};
        const allCategories: Category[] = result.allCategories || [];
        setArticleTags(article.articleTags.split(','));
        form.setFieldsValue({
          articleTitle: article.articleTitle,
          articleTags: article.articleTags.split(','),
          articleCategoryId: article.articleCategoryId,
          articleContent: article.articleContent,
          articleStatus: article.articleStatus,
          enableComment: article.enableComment,
        });
        setCategoriesAll(allCategories || []);
      })
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
          file.url = file.response.data;
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
    <PageHeaderWrapper title="文章编辑">
      <Card>
        <Spin tip="Loading..." spinning={spinning}>
          <Form
            {...formItemLayout}
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="标题"
              name="articleTitle"
              rules={[{ required: true, message: '请输入文章标题!' }]}
            >
              <TextArea placeholder="请输入文章标题" autoSize={{ minRows: 1, maxRows: 6 }} />
              {/* <Input placeholder="请输入文章标题" /> */}
            </Form.Item>
            <Form.Item
              label="分类"
              {...{
                labelCol: { span: 2 },
                wrapperCol: { span: 6 },
              }}
              name="articleCategoryId"
              rules={[{ required: true, message: '请选择文章分类!' }]}
            >
              <Select style={{ width: '100%' }} placeholder="请选择文章分类">
                {categoriesAll.map((item) => {
                  return (
                    <Select.Option value={item.categoryId} key={item.categoryId}>
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
              rules={[{ required: false, message: '请选择文章状态!' }]}
            >
              <Switch checkedChildren="发布" unCheckedChildren="草稿" />
            </Form.Item>
            <Form.Item
              label="评论"
              name="enableComment"
              rules={[{ required: false, message: '请选择评论开启状态!' }]}
            >
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
            <Form.Item
              label="内容"
              {...{
                labelCol: { span: 2 },
                wrapperCol: { span: 20 },
              }}
              name="articleContent"
              rules={[{ required: true, message: '请输入文章内容!' }]}
            >
              <MdEditor
                placeholder="请输入文章内容"
                config={{ view: { menu: true, md: true, html: false } }}
                style={{ height: '500px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button block type="primary" htmlType="submit" loading={loading}>
                保存
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </PageHeaderWrapper>
  );
};

export default Edit;
