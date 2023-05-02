import styled from 'styled-components/native';
import {colors} from '@src/assets';

export const Input = styled.TextInput`
  font-size: 16px;
  width: 100%;
  color: ${colors.dark};
  height: 40px;
  border-radius: 5px;
  border: 1px solid
    ${({isFocused}) => (isFocused ? colors.secondary : colors.border)};
  padding: 5px 15px;
  font-family: 'Nunito-Light';
`;
