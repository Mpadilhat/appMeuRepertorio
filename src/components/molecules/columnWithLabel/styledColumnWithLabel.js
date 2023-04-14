import styled from 'styled-components/native';
import {colors} from '../../../assets';

export const Column = styled.View`
  width: ${({width}) => width || '100%'};
  margin-bottom: ${({marginBottom}) => marginBottom || 0};
`;

export const TextLabel = styled.Text`
  font-size: 20px;
  color: ${colors.dark};
  margin-bottom: 10px;
  font-family: 'Nunito-Regular';
`;
