import React from 'react';
import { Input, Form } from 'antd';
import type { InputProps } from 'antd/es/input';

interface CustomInputProps extends InputProps {}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const { status, errors } = Form.Item.useStatus();

  // Определение класса по статусу
  const className = status === 'error' ? 'custom-input-error' : 
                    status === 'success' ? 'custom-input-success' : 
                    status === 'validating' ? 'custom-input-validating' : 
                    'custom-input-default';

  // Преобразование ошибок в строку
  const errorMessage = errors.length ? (errors[0] as string) : '';

  return (
    <Input
      {...props}
      className={className}
      placeholder={errorMessage || props.placeholder}
    />
  );
};

export default CustomInput;
