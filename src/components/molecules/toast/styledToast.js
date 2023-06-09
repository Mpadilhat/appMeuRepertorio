import styled from 'styled-components';
import {colors} from '@src/assets';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 2.5px;
`;

export const Icon = styled.Image`
  height: 20px;
  width: 20px;
  background: white;
  margin-right: 10px;
  border-radius: 10px;
  border-color: ${({borderColor}) => colors[borderColor]};
  border-width: 1px;
`;

export const Text = styled.Text`
  font-size: 14px;
  font-family: 'Nunito-Bold';
  color: ${colors.light};
  font-size: 14px;
`;
