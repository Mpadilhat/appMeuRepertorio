import React from 'react';
import * as s from './styledSwitch';
import {Controller} from 'react-hook-form';

const Switch = ({name, control, showOptions}) => (
  <Controller
    name={name}
    control={control}
    render={({field: {value = false, onChange}}) => (
      <s.Row>
        {showOptions && <s.Option>NÃO</s.Option>}
        <s.Switch
          onValueChange={onChange}
          value={value}
          showOptions={showOptions}
        />
        {showOptions && <s.Option>SIM</s.Option>}
      </s.Row>
    )}
  />
);

export default Switch;
