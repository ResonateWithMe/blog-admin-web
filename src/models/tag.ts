/**
 * @description tag
 * @author ShiLin
 * @date 2020/5/16 5:32 下午
 */
import { Effect, Reducer } from '@@/plugin-dva/connect';
import { Tag } from '@/interfaces/Tag';
import { findTagList } from '@/services/tag';

export interface TagStateType {
  tagList: Tag[];
}

export interface TagModelType {
  namespace: 'tag';
  state: TagStateType;
  effects: {
    fetchAllTag: Effect;
  };
  reducers: {
    saveTagList: Reducer<TagStateType>;
  };
}

const TagModel: TagModelType = {
  namespace: 'tag',
  state: {
    tagList: [],
  },
  effects: {
    *fetchAllTag({ payload }, { call, put }) {
      const response = yield call(findTagList, payload);
      yield put({
        type: 'saveTagList',
        payload: response.data.data,
      });
    },
  },
  reducers: {
    saveTagList(state, { payload }) {
      return {
        ...state,
        tagList: payload,
      };
    },
  },
};

export default TagModel;
