import React, { useState } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
// import {Category} from "@/interfaces/category";
import styles from './styles/AdvancedSearchForm.less';

const AdvancedSearchForm = () => {
  const [expand, setExpand] = useState(false);
  // const [categoriesAll, setCategoriesAll] = useState<Category[]>([]);
  const [form] = Form.useForm();

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onFinish = (values) => {};

  return (
    <Form
      form={form}
      name="advanced_search"
      className={styles.ant_advanced_search_form}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            label="标题"
            name="articleTitle"
            rules={[{ required: true, message: 'Input something!' }]}
          >
            <Input placeholder="请输入文章标题" />
          </Form.Item>
        </Col>
        {/* <Col span={8}>
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
        </Col> */}
      </Row>

      <Row>
        <Col
          span={24}
          style={{
            textAlign: 'right',
          }}
        >
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
          <a
            style={{
              fontSize: 12,
            }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? <UpOutlined /> : <DownOutlined />} Collapse
          </a>
        </Col>
      </Row>
    </Form>
  );
};

export default AdvancedSearchForm;
