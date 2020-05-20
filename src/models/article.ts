/**
 * @description article
 * @author ShiLin
 * @date 2020/5/13 18:07
 */

import { Reducer, Effect } from 'umi';
import { Article } from '@/interfaces/article';
import {
  queryArticleList,
  queryArticleDetail,
  updateArticle,
  createArticle,
  deleteArticle,
} from '@/services/article';
import { message, notification } from 'antd';

export interface ArticleStateType {
  articleList?: Article[];
  articleDetail?: Article;
  detailSpinning?: boolean;
}

export interface ArticleModelType {
  namespace: 'article';
  state: ArticleStateType;
  effects: {
    fetchAllArticle: Effect;
    fetchArticleDetail: Effect;
    updateArticle: Effect;
    createArticle: Effect;
    deleteArticle: Effect;
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
      if (response.code !== 200) {
        message.error('更新文章失败');
        return;
      }
      notification.success({
        message: `${response.message}`,
        description: 'The article content is updated success!',
      });
    },
    *createArticle({ payload }, { call }) {
      const response = yield call(createArticle, payload);
      if (response.code !== 200) {
        message.error('新建文章失败');
        return;
      }
      notification.success({
        message: `${response.message}`,
        description: 'The article is created success!',
      });
    },
    *deleteArticle({ payload }, { call }) {
      const response = yield call(deleteArticle, payload);
      if (response.code !== 200) {
        message.error('删除文章失败');
        return;
      }
      notification.success({
        message: `${response.message}`,
        description: 'The article is deleted success!',
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
