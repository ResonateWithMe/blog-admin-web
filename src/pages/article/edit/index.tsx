import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import 'react-markdown-editor-lite/lib/index.css';
import { Spin, Card } from 'antd';
import { Category } from '@/interfaces/category';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import { Dispatch } from '@@/plugin-dva/connect';
import { Article } from '@/interfaces/article';
import ArticleEditForm from '@/pages/article/components/ArticleEditForm';

interface Query {
  id: string;
  type: string;
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
  articleDetail: Article | undefined;
  allCategories: Category[] | undefined;
  dispatch: Dispatch;
  loading?: boolean;
  updating?: boolean;
}

const Edit: React.FC<EditProps> = (props) => {
  const { location, articleDetail, allCategories, dispatch, loading, updating } = props;

  useEffect(() => {
    dispatch({
      type: 'article/fetchArticleDetail',
      payload: location.query.id,
    });
  }, []);

  return (
    <PageHeaderWrapper title="文章编辑">
      <Card>
        <Spin tip="Loading..." spinning={loading}>
          <ArticleEditForm
            articleDetail={articleDetail}
            allCategories={allCategories}
            updating={updating}
          />
        </Spin>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ article, loading }: ConnectState) => ({
  articleDetail: article.articleDetail?.article,
  allCategories: article.articleDetail?.allCategories,
  loading: loading.effects['article/fetchArticleDetail'],
  updating: loading.effects['article/updateArticle'],
}))(Edit);
