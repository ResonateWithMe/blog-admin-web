/**
 * @description category
 * @author ShiLin
 * @date 2020/5/16 5:46 下午
 */
import { Effect, Reducer } from '@@/plugin-dva/connect';
import { Category } from '@/interfaces/Category';
import { add, findCategoryAll, findCategoryList, update, del } from '@/services/category';
import { message } from 'antd';

export interface CategoryStateType {
  allCategory: Category[];
  categoryList: Category[];
}

export interface CategoryModelType {
  namespace: 'category';
  state: CategoryStateType;
  effects: {
    fetchAll: Effect;
    fetchList: Effect;
    fetchAdd: Effect;
    fetchUpdate: Effect;
    fetchDel: Effect;
  };
  reducers: {
    saveAllCategory: Reducer<CategoryStateType>;
    saveCategoryList: Reducer<CategoryStateType>;
  };
}

const CategoryModel: CategoryModelType = {
  namespace: 'category',
  state: {
    allCategory: [],
    categoryList: [],
  },
  effects: {
    *fetchAll({ payload }, { call, put }) {
      const response = yield call(findCategoryAll, payload);
      yield put({
        type: 'saveAllCategory',
        payload: response.data,
      });
    },
    *fetchList({ payload }, { call, put }) {
      const response = yield call(findCategoryList, payload);
      yield put({
        type: 'saveCategoryList',
        payload: response.data.data,
      });
    },
    *fetchAdd({ payload }, { call }) {
      const response = yield call(add, payload);
      if (response.code !== 200) {
        message.error(`${response.message}`);
        return;
      }
      message.success(`${response.message}`);
    },
    *fetchUpdate({ payload }, { call }) {
      const response = yield call(update, payload);
      if (response.code !== 200) {
        message.error(`${response.message}`);
        return;
      }
      message.success(`${response.message}`);
    },
    *fetchDel({ payload }, { call }) {
      const response = yield call(del, payload);
      if (response.code !== 200) {
        message.error(`${response.message}`);
        return;
      }
      message.success(`${response.message}`);
    },
  },
  reducers: {
    saveAllCategory(state, { payload }) {
      return {
        categoryList: [],
        ...state,
        allCategory: payload,
      };
    },
    saveCategoryList(state, { payload }) {
      return {
        allCategory: [],
        ...state,
        categoryList: payload,
      };
    },
  },
};

export default CategoryModel;
