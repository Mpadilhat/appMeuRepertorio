import styled from 'styled-components/native';
import {colors} from '@src/assets';

export const Column = styled.View`
  width: ${({width}) => width || '100%'};
  margin-bottom: ${({marginBottom}) => marginBottom || 0};
  display: flex;
  flex-direction: column;
`;

export const TextLabel = styled.Text`
  font-size: 20px;
  color: ${colors.dark};
  margin-bottom: 10px;
  font-family: 'Nunito-Regular';
`;
