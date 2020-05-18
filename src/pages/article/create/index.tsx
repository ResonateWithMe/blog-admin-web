/**
 * @description index
 * @author ShiLin
 * @date 2020/5/14 17:42
 */
import React, { useEffect } from 'react';
import { connect } from '@@/plugin-dva/exports';
import { Article } from '@/interfaces/article';
import { Category } from '@/interfaces/category';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { ConnectState } from '@/models/connect';
import { Store } from 'antd/es/form/interface';
import { Dispatch } from 'umi';
import ArticleEditForm from '../components/ArticleEditForm';

interface CreateProps {
  articleDetail?: Article | undefined;
  allCategories?: Category[] | undefined;
  dispatch: Dispatch;
  loading?: boolean;
  updating?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CreatePage: React.FC<CreateProps> = (props) => {
  const { dispatch, updating, allCategories } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onFinish = (values: Store) => {};

  useEffect(() => {
    dispatch({
      type: 'category/fetchAllCategory',
    });
  }, []);

  return (
    <PageHeaderWrapper>
      <Card>
        <ArticleEditForm
          allCategories={allCategories}
          updating={updating}
          onFinish={onFinish}
          submitTitle="新建文章"
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ category, loading }: ConnectState) => ({
  updating: loading.effects['article/updateArticle'],
  allCategories: category.categoryList,
}))(CreatePage);
