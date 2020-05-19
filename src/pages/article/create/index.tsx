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
import { Card, message } from 'antd';
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

const CreatePage: React.FC<CreateProps> = (props) => {
  const { dispatch, updating, allCategories } = props;

  const onFinish = (values: Store) => {
    try {
      dispatch({
        type: 'article/createArticle',
        payload: {
          ...values,
        },
      });
    } catch (e) {
      message.error('新建失败');
    }
  };

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
