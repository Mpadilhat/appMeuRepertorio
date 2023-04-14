import React from 'react';
import * as s from './styledInput';
import {Controller} from 'react-hook-form';

const Input = ({name, control, focus, setFocus}) => (
  <Controller
    name={name}
    control={control}
    render={({field: {value, onChange}}) => (
      <s.Input
        isFocused={focus === name}
        onFocus={() => setFocus(name)}
        onBlur={() => setFocus('')}
        value={value}
        onChangeText={text => onChange(text)}
      />
    )}
  />
);

export default Input;
