/**
 * @description EditableTagGroup
 * @author ShiLin
 * @date 2020/5/6 12:41
 */
import { Tag, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import InputRef from './InputRef';
import './styles/EditableTagGroup.less';

interface EditableTagGroupProps {
  tags: string[];
  setTags: (data: string[]) => void;
}

const colors = [
  '#f50',
  '#2db7f5',
  '#87d068',
  '#108ee9',
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

const EditableTagGroup: React.FC<EditableTagGroupProps> = (props) => {
  const { tags, setTags } = props;
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [editInputFocus, setEditInputFocus] = useState<boolean>(false);

  const handleClose = (removedTag: string) => {
    const tagsC = tags.filter((tag) => tag !== removedTag);
    // console.log(tagsC);
    setTags(tagsC);
  };

  const showInput = () => {
    setInputVisible(true);
    setInputFocus(true);
    // input.current.focus();
  };

  const handleInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setInputValue(e.target.value);
  };

  const handleEditInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setEditInputValue(e.target.value);
  };

  const handleCreateInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    const target = newTags[editInputIndex];
    if (target) {
      newTags[editInputIndex] = editInputValue;
      setTags(newTags);
    }
    setEditInputIndex(-1);
    setInputValue('');
  };

  const handleCreateSelect = (value: string) => {
    setInputValue(value);
    if (value && tags.indexOf(value) === -1) {
      setTags([...tags, value]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditSelect = (value: string, index: number) => {
    setEditInputValue(value);
    const newTags = [...tags];
    const target = newTags[editInputIndex];
    if (target) {
      newTags[index] = value;
      setTags(newTags);
    }
    setEditInputIndex(-1);
    setInputValue('');
  };

  useEffect(() => {}, []);

  return (
    <>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <InputRef
              key={tag}
              isFocus={editInputFocus}
              value={editInputValue}
              onChange={handleEditInputChange}
              onSelect={(value) => handleEditSelect(value, editInputIndex)}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            color={colors[index]}
            className="edit-tag"
            key={tag}
            closable
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                e.preventDefault();
                setEditInputIndex(index);
                setEditInputValue(tag);
                // hack: 引用，动态关联不生效
                setEditInputFocus(true);
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}

      {inputVisible && (
        <InputRef
          isFocus={inputFocus}
          value={inputValue}
          onChange={handleInputChange}
          onSelect={handleCreateSelect}
          onBlur={handleCreateInputConfirm}
          onPressEnter={handleCreateInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export default EditableTagGroup;
