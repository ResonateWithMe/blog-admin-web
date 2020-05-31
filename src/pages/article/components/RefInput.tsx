/**
 * @description RefInput 弃用
 * @author ShiLin
 * @date 2020/5/6 16:22
 */
import React, { useEffect, useRef, useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import { Tag } from '@/interfaces/Tag';
import { Dispatch } from '@@/plugin-dva/connect';

interface InputValue {
  value: string;
}

interface InputEvent {
  target: InputValue;
}

interface InputRefProps {
  value: string;
  tagList: Tag[];
  loading: boolean;
  dispatch: Dispatch;
  onChange: (e: InputEvent) => void;
  onSelect: (value: string) => void;
  onBlur: () => void;
  onPressEnter: () => void;
}

const RefInput: React.FC<InputRefProps> = (props) => {
  const { value, onChange, onSelect, onBlur, onPressEnter, tagList, dispatch } = props;
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const input = useRef<Input>(null);

  const handleSearch = (searchText: string) => {
    const original = tagList.map((item) => ({ value: item.tagName }));
    const newValue = original.filter((item) => item.value.indexOf(searchText) !== -1);
    setOptions(newValue);
  };

  useEffect(() => {
    dispatch({
      type: 'tag/fetchAllTag',
    });
  }, []);

  useEffect(() => {
    setOptions(tagList.map((item) => ({ value: item.tagName })));
  }, [tagList]);

  return (
    <AutoComplete
      style={{ width: 200, marginTop: 10 }}
      onSelect={onSelect}
      onSearch={handleSearch}
      value={value}
      defaultOpen
      autoFocus
      backfill
      options={options}
    >
      <Input
        allowClear
        ref={input}
        size="small"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="可以搜索"
        onPressEnter={onPressEnter}
      />
    </AutoComplete>
  );
};

export default connect(({ tag, loading }: ConnectState) => ({
  tagList: tag.tagList || [],
  loading: loading.effects['tag/fetchAllTag'] || false,
}))(RefInput);
