/**
 * @description EditableTagGroup 弃用
 * @author ShiLin
 * @date 2020/5/6 12:41
 */
import { message, Tag, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import InputRef from './RefInput';
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

  const handleClose = (removedTag: string) => {
    const tagsC = tags.filter((tag) => tag !== removedTag);
    setTags(tagsC);
  };

  const showInput = () => {
    setInputVisible(true);
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
      setInputVisible(false);
      setInputValue('');
    } else {
      message.error('已存在此标签');
    }
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

  return (
    <div style={{ marginTop: -10 }}>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <InputRef
              key={tag}
              value={editInputValue}
              onChange={handleEditInputChange}
              onSelect={(value) => handleEditSelect(value, editInputIndex)}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const random = Math.floor(Math.random() * colors.length);

        const tagElem = (
          <Tag
            color={colors[random]}
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
              }}
            >
              #{isLongTag ? `${tag.slice(0, 20)}...` : tag}
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
          value={inputValue}
          onChange={handleInputChange}
          onSelect={handleCreateSelect}
          onBlur={handleCreateInputConfirm}
          onPressEnter={handleCreateInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> 新标签
        </Tag>
      )}
    </div>
  );
};

export default EditableTagGroup;
