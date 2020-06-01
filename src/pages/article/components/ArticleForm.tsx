/**
 * @description ArticleForm
 * @author ShiLin
 * @date 2020/5/14 17:40
 */
import React, { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Form, Button, Select, Switch, Tag } from 'antd';
import { Category } from '@/interfaces/Category';
import TextArea from 'antd/es/input/TextArea';
import { Store } from 'antd/es/form/interface';
import { ArticleDetail } from '@/interfaces/ArticleDetail';
import { connect } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { Tag as TagInterface } from '@/interfaces/Tag';
import { Dispatch } from '@@/plugin-dva/connect';
import CoverUpload from './CoverUpload/coverUpload';

interface ArticleFormProps {
  /**
   * @type {boolean} loading 提交状态
   */
  articleDetail?: ArticleDetail | undefined;
  allTags: TagInterface[];
  allCategories: Category[];
  dispatch: Dispatch;
  submitting?: boolean;
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

const colors = [
  '#f50',
  '#2db7f5',
  '#87d068',
  '#108ee9',
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

// 初始化Markdown解析器
const mdParser = new MarkdownIt(/* Markdown-it options */);

const ArticleForm: React.FC<ArticleFormProps> = (props) => {
  const {
    articleDetail,
    allCategories,
    submitting,
    onFinish,
    submitTitle,
    dispatch,
    allTags,
  } = props;
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

  const tagRender = ({ closable, label, onClose }: any) => {
    return (
      <Tag
        color={colors[Math.floor(Math.random() * colors.length)]}
        closable={closable}
        onClose={onClose}
        style={{ marginTop: 2, marginBottom: 2, marginRight: 4 }}
      >
        {label}
      </Tag>
    );
  };

  useEffect(() => {
    form.setFieldsValue({
      articleTitle: articleDetail?.articleTitle,
      articleTags: articleDetail?.articleTags.map((item) => item.tagName),
      articleCategoryId: articleDetail?.articleCategoryId,
      articleContent: articleDetail?.articleContent,
      articleStatus: articleDetail?.articleStatus,
      enableComment: articleDetail?.enableComment,
      articleCoverImage: articleDetail?.articleCoverImage,
    });
    // setCoverImage(articleDetail?.articleCoverImage || '');
  }, [articleDetail]);

  useEffect(() => {
    dispatch({
      type: 'category/fetchAll',
    });
    dispatch({
      type: 'tag/fetchAllTag',
    });
  }, []);

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
          {allCategories.map((item) => {
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
        <Select
          tagRender={tagRender}
          mode="tags"
          style={{ width: '100%' }}
          options={allTags.map((item) => ({
            label: item.tagName,
            value: item.tagName,
          }))}
          placeholder="请选择或新建标签"
        />
      </Form.Item>
      <Form.Item
        label="封面"
        name="articleCoverImage"
        rules={[{ required: false, message: '请上传文章封面!' }]}
      >
        <CoverUpload
          coverImage={coverImage}
          setCoverImage={(imageUrl) => {
            form.setFieldsValue({
              articleCoverImage: imageUrl,
            });
            setCoverImage(imageUrl);
          }}
        />
      </Form.Item>
      <Form.Item
        label="状态"
        name="articleStatus"
        valuePropName="checked"
        rules={[{ required: false, message: '请选择文章状态!' }]}
      >
        <Switch defaultChecked checkedChildren="发布" unCheckedChildren="草稿" />
      </Form.Item>
      <Form.Item
        label="评论"
        name="enableComment"
        valuePropName="checked"
        rules={[{ required: false, message: '请选择评论开启状态!' }]}
      >
        <Switch defaultChecked checkedChildren="开启" unCheckedChildren="关闭" />
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
        <Button block type="primary" htmlType="submit" loading={submitting}>
          {submitTitle || '更新文章'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ tag, category }: ConnectState) => ({
  allTags: tag.allTag || [],
  allCategories: category.allCategory || [],
}))(ArticleForm);
