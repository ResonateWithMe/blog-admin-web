/**
 * @description tag
 * @author ShiLin
 * @date 2020/5/16 5:32 下午
 */
import { Effect, Reducer } from '@@/plugin-dva/connect';
import { Tag } from '@/interfaces/Tag';
import { findTagList, findAllTag } from '@/services/tag';

export interface TagStateType {
  allTag: Tag[];
  tagList: Tag[];
}

export interface TagModelType {
  namespace: 'tag';
  state: TagStateType;
  effects: {
    fetchAllTag: Effect;
    fetchTagList: Effect;
  };
  reducers: {
    saveAllTag: Reducer<TagStateType>;
    saveTagList: Reducer<TagStateType>;
  };
}

const TagModel: TagModelType = {
  namespace: 'tag',
  state: {
    allTag: [],
    tagList: [],
  },
  effects: {
    *fetchAllTag({ payload }, { call, put }) {
      const response = yield call(findAllTag, payload);
      yield put({
        type: 'saveTagList',
        payload: response.data,
      });
    },
    *fetchTagList({ payload }, { call, put }) {
      const response = yield call(findTagList, payload);
      yield put({
        type: 'saveTagList',
        payload: response.data.data,
      });
    },
  },
  reducers: {
    saveAllTag(state, { payload }) {
      return {
        tagList: [],
        ...state,
        allTag: payload,
      };
    },
    saveTagList(state, { payload }) {
      return {
        allTag: [],
        ...state,
        tagList: payload,
      };
    },
  },
};

export default TagModel;
