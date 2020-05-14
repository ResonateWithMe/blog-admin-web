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
import ArticleEditForm from '../components/ArticleEditForm';

interface CreateProps {
  articleDetail?: Article | undefined;
  allCategories?: Category[] | undefined;
  loading?: boolean;
  updating?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CreatePage: React.FC<CreateProps> = (props) => {
  const { articleDetail, allCategories, updating } = props;
  return (
    <PageHeaderWrapper title="新建文章">
      <Card>
        <ArticleEditForm
          articleDetail={articleDetail}
          allCategories={allCategories}
          updating={updating}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ article, loading }: ConnectState) => ({
  articleDetail: article.articleDetail?.article,
  allCategories: article.articleDetail?.allCategories,
  loading: loading.effects['article/fetchArticleDetail'],
  updating: loading.effects['article/updateArticle'],
}))(CreatePage);
