import styled from 'styled-components/native';
import {colors} from '../../../assets';

export const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${colors.secondary};
  height: 40px;
  border-radius: 5px;
  margin-top: 120px;

  ${({disabled}) => disabled && 'opacity: 0.4'};
`;

export const TextButton = styled.Text`
  font-size: 15px;
  color: ${({isDisabled}) => (isDisabled ? colors.primary : colors.light)};
  font-family: 'Nunito-Black';
`;
