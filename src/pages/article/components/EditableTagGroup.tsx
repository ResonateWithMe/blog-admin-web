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

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

  useEffect(() => {
    // console.log(input);
    // console.log(editInput);
  }, []);

  return (
    <div>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <InputRef
              key={tag}
              isFocus={editInputFocus}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable={index !== 0}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  // hack 引用，动态关联不生效
                  setEditInputFocus(true);
                  // console.log(editInput)
                  // editInput.current.focus();
                  e.preventDefault();
                }
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
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </div>
  );
};

export default EditableTagGroup;
