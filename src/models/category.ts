/**
 * @description category
 * @author ShiLin
 * @date 2020/5/16 5:46 下午
 */
import { Effect, Reducer } from '@@/plugin-dva/connect';
import { Category } from '@/interfaces/Category';
import { findCategoryAll, findCategoryList } from '@/services/category';

export interface CategoryStateType {
  allCategory: Category[];
  categoryList: Category[];
}

export interface CategoryModelType {
  namespace: 'category';
  state: CategoryStateType;
  effects: {
    fetchAllCategory: Effect;
    fetchCategoryList: Effect;
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
    *fetchAllCategory({ payload }, { call, put }) {
      const response = yield call(findCategoryAll, payload);
      yield put({
        type: 'saveAllCategory',
        payload: response.data,
      });
    },
    *fetchCategoryList({ payload }, { call, put }) {
      const response = yield call(findCategoryList, payload);
      yield put({
        type: 'saveCategoryList',
        payload: response.data.data,
      });
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
