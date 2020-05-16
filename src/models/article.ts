/**
 * @description article
 * @author ShiLin
 * @date 2020/5/13 18:07
 */

import { Reducer, Effect } from 'umi';
import { Article } from '@/interfaces/article';
import { queryArticleList, queryArticleDetail, updateArticle } from '@/services/article';
import { message, notification } from 'antd';
import { ArticleDetail } from '@/interfaces/article_detail';

export interface ArticleStateType {
  articleList?: Article[];
  articleDetail?: ArticleDetail;
  detailSpinning?: boolean;
}

export interface ArticleModelType {
  namespace: 'article';
  state: ArticleStateType;
  effects: {
    fetchAllArticle: Effect;
    fetchArticleDetail: Effect;
    updateArticle: Effect;
  };
  reducers: {
    saveAllArticle: Reducer<ArticleStateType>;
    saveArticleDetail: Reducer<ArticleStateType>;
  };
}

const ArticleModel: ArticleModelType = {
  namespace: 'article',

  state: {
    articleList: [],
    articleDetail: undefined,
    detailSpinning: false,
  },

  effects: {
    *fetchAllArticle({ payload }, { call, put }) {
      const response = yield call(queryArticleList, payload);
      yield put({
        type: 'saveAllArticle',
        payload: response.data ? response.data.list : [],
      });
    },
    *fetchArticleDetail({ payload }, { call, put }) {
      const response = yield call(queryArticleDetail, payload);
      yield put({
        type: 'saveArticleDetail',
        payload: response.data,
      });
    },
    *updateArticle({ payload }, { call }) {
      const response = yield call(updateArticle, payload);
      if (response.resultCode !== 200) {
        message.error('更新失败');
        return;
      }
      notification.success({
        message: `${response.message}`,
        description: 'The article content is update success!',
      });
    },
  },

  reducers: {
    saveAllArticle(state, { payload }) {
      return {
        ...state,
        articleList: payload,
      };
    },
    saveArticleDetail(state, { payload }) {
      return {
        ...state,
        articleDetail: payload,
      };
    },
  },
};

export default ArticleModel;
