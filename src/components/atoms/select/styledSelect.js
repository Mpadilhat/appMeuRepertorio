import styled from 'styled-components/native';
import {colors} from '@src/assets';

export const Select = styled.View`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid ${colors.border};
`;

export const styleSelect = {
  fontSize: 14,
  width: '100%',
  color: colors.dark,
  fontFamily: 'Nunito-ExtraLight',
};
