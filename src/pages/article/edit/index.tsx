import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import 'react-markdown-editor-lite/lib/index.css';
import { Spin, Card, message } from 'antd';
import { Category } from '@/interfaces/category';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import { Dispatch } from '@@/plugin-dva/connect';
import { Article } from '@/interfaces/article';
import ArticleEditForm from '@/pages/article/components/ArticleEditForm';
import { Store } from 'antd/es/form/interface';

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

  const onFinish = (values: Store) => {
    try {
      dispatch({
        type: 'article/updateArticle',
        payload: {
          ...values,
          articleId: location.query.id,
        },
      });
    } catch (e) {
      message.error('更新失败');
    }
  };

  useEffect(() => {
    dispatch({
      type: 'category/fetchAllCategory',
    });
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
            onFinish={onFinish}
          />
        </Spin>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ article, category, loading }: ConnectState) => ({
  articleDetail: article.articleDetail,
  allCategories: category.categoryList,
  loading: loading.effects['article/fetchArticleDetail'],
  updating: loading.effects['article/updateArticle'],
}))(Edit);
