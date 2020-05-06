/**
 * @description InputRef
 * @author ShiLin
 * @date 2020/5/6 16:22
 */
import React, { useEffect, useRef } from 'react';
import { Input } from 'antd';

interface InputValue {
  value: string;
}

interface InputEvent {
  target: InputValue;
}

interface InputRefProps {
  value: string;
  isFocus: boolean;
  onChange: (e: InputEvent) => void;
  onBlur: () => void;
  onPressEnter: () => void;
}

const InputRef: React.FC<InputRefProps> = (props) => {
  const { value, isFocus, onChange, onBlur, onPressEnter } = props;
  const input = useRef<Input>(null);

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [isFocus]);

  return (
    <Input
      ref={input}
      size="small"
      className="tag-input"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onPressEnter={onPressEnter}
    />
  );
};

export default InputRef;
