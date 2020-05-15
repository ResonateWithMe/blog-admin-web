/**
 * @description index
 * @author ShiLin
 * @date 2020/5/14 17:42
 */
import React from 'react';
import { connect } from '@@/plugin-dva/exports';
import { Article } from '@/interfaces/article';
import { Category } from '@/interfaces/category';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { ConnectState } from '@/models/connect';
import { Store } from 'antd/es/form/interface';
import ArticleEditForm from '../components/ArticleEditForm';

interface CreateProps {
  articleDetail?: Article | undefined;
  allCategories?: Category[] | undefined;
  loading?: boolean;
  updating?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CreatePage: React.FC<CreateProps> = (props) => {
  const { updating } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onFinish = (values: Store) => {};

  return (
    <PageHeaderWrapper>
      <Card>
        <ArticleEditForm updating={updating} onFinish={onFinish} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }: ConnectState) => ({
  updating: loading.effects['article/updateArticle'],
}))(CreatePage);
