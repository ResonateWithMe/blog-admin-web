/**
 * @description article
 * @author ShiLin
 * @date 2020/5/13 18:07
 */

import { Reducer, Effect } from 'umi';
import { Article } from '@/interfaces/article';
import { queryArticleList, queryArticleDetail, updateArticle } from '@/services/article';
import { Category } from '@/interfaces/category';
import { message, notification } from 'antd';

export interface ArticleStateType {
  articleList?: Article[];
  articleDetail?: Article;
  detailSpinning?: boolean;
  allCategories?: Category[];
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
    allCategories: [],
  },

  effects: {
    *fetchAllArticle({ payload }, { call, put }) {
      const response = yield call(queryArticleList, payload);
      if (response.resultCode !== 200) return;
      yield put({
        type: 'saveAllArticle',
        payload: response.data ? response.data.list : [],
      });
    },
    *fetchArticleDetail({ payload }, { call, put }) {
      const response = yield call(queryArticleDetail, payload);
      if (response.resultCode !== 200) return;
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
        articleDetail: payload.article,
        allCategories: payload.allCategories,
      };
    },
  },
};

export default ArticleModel;
