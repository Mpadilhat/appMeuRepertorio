import React from 'react';
import * as s from './styledSelect';
import {Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';

const Select = ({name, control, placeholder, options}) => (
  <s.Select>
    <Controller
      name={name}
      control={control}
      render={({field: {value, onChange}}) => (
        <Picker
          style={s.styleSelect}
          prompt={placeholder}
          selectedValue={value}
          onValueChange={itemValue => onChange(itemValue)}>
          {options.map(t => (
            <Picker.Item key={t.value} label={t.label} value={t.value} />
          ))}
        </Picker>
      )}
    />
  </s.Select>
);

export default Select;
