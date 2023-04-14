import React from 'react';
import {ColumnWithLabel, Input} from '../../../components';

const InputWithLabel = ({
  label,
  name,
  control,
  focus,
  setFocus,
  marginBottom,
}) => (
  <ColumnWithLabel label={label} marginBottom={marginBottom}>
    <Input name={name} control={control} focus={focus} setFocus={setFocus} />
  </ColumnWithLabel>
);

export default InputWithLabel;
