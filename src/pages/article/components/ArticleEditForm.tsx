/**
 * @description ArticleEditForm
 * @author ShiLin
 * @date 2020/5/14 17:40
 */
import React, { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Form, Button, Select, Upload, Card, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons/lib';
import { Category } from '@/interfaces/category';
import { UploadProps } from 'antd/es/upload/interface';
import TextArea from 'antd/es/input/TextArea';
import { Article } from '@/interfaces/article';
import { Store } from 'antd/es/form/interface';
import EditableTagGroup from './EditableTagGroup';

interface EditFormProps {
  articleDetail?: Article | undefined;
  allCategories?: Category[] | undefined;
  loading?: boolean;
  updating?: boolean;
  submitTitle?: string;
  onFinish?: (values: Store) => void;
}

const tailLayout = {
  wrapperCol: {
    lg: { offset: 2, span: 4 },
    xs: { offset: 0, span: 24 },
  },
};

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 17 },
};

// 初始化Markdown解析器
const mdParser = new MarkdownIt(/* Markdown-it options */);

const uploadUrl = '/api/upload/file';

const ArticleEditForm: React.FC<EditFormProps> = (props) => {
  const { articleDetail, allCategories, updating, onFinish, submitTitle } = props;
  const [articleTags, setArticleTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState('');
  const [form] = Form.useForm();

  // @ts-ignore
  const handleEditorChange = ({ text }) => {
    form.setFieldsValue({
      articleContent: text,
    });
  };

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
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
      const url = fileList[0] ? fileList[0].url || '' : '';
      form.setFieldsValue({
        articleCoverImage: url,
      });
      setCoverImage(url);
    },
    listType: 'picture',
    multiple: true,
  };

  useEffect(() => {
    form.setFieldsValue({
      articleTitle: articleDetail?.articleTitle,
      articleTags: articleDetail?.articleTags,
      articleCategoryId: articleDetail?.articleCategoryId,
      articleContent: articleDetail?.articleContent,
      articleStatus: articleDetail?.articleStatus,
      enableComment: articleDetail?.enableComment,
      articleCoverImage: articleDetail?.articleCoverImage,
    });
    setCoverImage(articleDetail?.articleCoverImage || '');
    setArticleTags(articleDetail?.articleTags.split(',') || []);
  }, [articleDetail]);

  useEffect(() => {
    form.setFieldsValue({
      articleTags: articleTags && articleTags.length && articleTags.toString(),
    });
  }, [articleTags]);

  return (
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
          {typeof allCategories !== 'undefined' &&
            allCategories.map((item) => {
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
        rules={[{ required: false, message: '请输入文章标签!' }]}
      >
        <EditableTagGroup tags={articleTags} setTags={setArticleTags} />
      </Form.Item>
      <Form.Item
        label="封面"
        name="articleCoverImage"
        rules={[{ required: false, message: '请上传文章封面!' }]}
      >
        <>
          <Card
            hoverable
            style={{ width: 400, marginBottom: '20px' }}
            cover={<img alt="封面" src={coverImage} />}
          >
            <Card.Meta
              title={form.getFieldValue('articleTitle')}
              description={form.getFieldValue('articleCoverImage')}
            />
          </Card>
          <Upload {...uploadProps}>
            <Button>
              <UploadOutlined /> 点击上传
            </Button>
          </Upload>
        </>
      </Form.Item>
      <Form.Item
        label="状态"
        name="articleStatus"
        rules={[{ required: false, message: '请选择文章状态!' }]}
      >
        <Radio.Group name="articleStatus">
          <Radio value={1}>发布</Radio>
          <Radio value={0}>草稿</Radio>
        </Radio.Group>
        {/* <Switch checkedChildren="发布" unCheckedChildren="草稿" /> */}
      </Form.Item>
      <Form.Item
        label="评论"
        name="enableComment"
        rules={[{ required: false, message: '请选择评论开启状态!' }]}
      >
        <Radio.Group name="enableComment">
          <Radio value={1}>开启</Radio>
          <Radio value={0}>关闭</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="内容"
        {...{
          labelCol: { span: 2 },
          wrapperCol: { span: 20 },
        }}
        name="articleContent"
        rules={[{ required: false, message: '请输入文章内容!' }]}
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
        <Button block type="primary" htmlType="submit" loading={updating}>
          {submitTitle || '更新文章'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ArticleEditForm;
