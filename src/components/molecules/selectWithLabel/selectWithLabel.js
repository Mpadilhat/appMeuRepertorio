import React from 'react';
import {ColumnWithLabel, Select} from '../../../components';

const SelectWithLabel = ({
  label,
  name,
  control,
  placeholder,
  options,
  width,
}) => (
  <ColumnWithLabel label={label} width={width}>
    <Select
      name={name}
      control={control}
      placeholder={placeholder}
      options={options}
    />
  </ColumnWithLabel>
);

export default SelectWithLabel;
