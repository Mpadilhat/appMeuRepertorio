import React from 'react';
import * as s from './styledButton';
import {shadow} from '@src/assets';

const Button = ({label, onPress, isDisabled}) => (
  <s.Button style={shadow} disabled={isDisabled} onPress={onPress}>
    <s.TextButton isDisabled={isDisabled}>{label}</s.TextButton>
  </s.Button>
);

export default Button;
