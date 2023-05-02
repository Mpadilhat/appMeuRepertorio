import React from 'react';
import {ColumnWithLabel, Switch} from '@src/components';

const SwitchWithLabel = ({label, name, control, width, showOptions}) => (
  <ColumnWithLabel label={label} width={width}>
    <Switch name={name} control={control} showOptions={showOptions} />
  </ColumnWithLabel>
);

export default SwitchWithLabel;
