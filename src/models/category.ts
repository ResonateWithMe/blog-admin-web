/**
 * @description category
 * @author ShiLin
 * @date 2020/5/16 5:46 下午
 */
import { Effect, Reducer } from '@@/plugin-dva/connect';
import { Category } from '@/interfaces/category';
import { findCategoryList } from '@/services/category';

export interface CategoryStateType {
  categoryList: Category[];
}

export interface CategoryModelType {
  namespace: 'category';
  state: CategoryStateType;
  effects: {
    fetchAllCategory: Effect;
  };
  reducers: {
    saveCategoryList: Reducer<CategoryStateType>;
  };
}

const CategoryModel: CategoryModelType = {
  namespace: 'category',
  state: {
    categoryList: [],
  },
  effects: {
    *fetchAllCategory({ payload }, { call, put }) {
      const response = yield call(findCategoryList, payload);
      yield put({
        type: 'saveCategoryList',
        payload: response.data,
      });
    },
  },
  reducers: {
    saveCategoryList(state, { payload }) {
      return {
        ...state,
        categoryList: payload,
      };
    },
  },
};

export default CategoryModel;
