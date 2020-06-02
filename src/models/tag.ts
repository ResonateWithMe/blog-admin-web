/**
 * @description tag
 * @author ShiLin
 * @date 2020/5/16 5:32 下午
 */
import { Effect, Reducer } from '@@/plugin-dva/connect';
import { Tag } from '@/interfaces/Tag';
import { findTagList, findAllTag, add, del, update } from '@/services/tag';
import { message } from 'antd';

export interface TagStateType {
  allTag: Tag[];
  tagList: Tag[];
}

export interface TagModelType {
  namespace: 'tag';
  state: TagStateType;
  effects: {
    fetchAll: Effect;
    fetchList: Effect;
    fetchAdd: Effect;
    fetchUpdate: Effect;
    fetchDel: Effect;
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
    *fetchAll({ payload }, { call, put }) {
      const response = yield call(findAllTag, payload);
      yield put({
        type: 'saveAllTag',
        payload: response.data,
      });
    },
    *fetchList({ payload }, { call, put }) {
      const response = yield call(findTagList, payload);
      yield put({
        type: 'saveTagList',
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
