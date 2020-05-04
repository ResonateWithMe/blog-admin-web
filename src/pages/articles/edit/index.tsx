import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Form, Input, Button } from 'antd';
import styles from './index.less';

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

export default (): React.ReactNode => {
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
  const onFinish = (values) => {};

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <PageHeaderWrapper>
      <div className={styles.edit}>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="标题"
            name="articleTitle"
            rules={[{ required: true, message: '请输入文章标题!' }]}
          >
            <Input placeholder="请输入文章标题" />
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
      </div>
    </PageHeaderWrapper>
  );
};
