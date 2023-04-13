import styled from 'styled-components/native';
import {colors} from '../../assets';

export const Content = styled.ScrollView`
  height: 691px;
  padding: 40px 20px;
`;

export const Row = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Column = styled.View`
  width: ${({width}) => (width ? width : '100%')};
  margin-bottom: ${({noSpace}) => (noSpace ? '0' : '20px')};
`;

export const TextLabel = styled.Text`
  font-size: 20px;
  color: ${colors.dark};
  margin-bottom: 10px;
`;

export const Input = styled.TextInput`
  font-size: 16px;
  width: 100%;
  color: ${colors.dark};
  height: 40px;
  border-radius: 5px;
  border: 1px solid
    ${({isFocused}) => (isFocused ? colors.secondary : colors.border)};
  padding: 5px 15px;
`;

export const TextButton = styled.Text`
  font-size: 15px;
  color: ${colors.light};
`;

export const WrapperButton = styled.ScrollView`
  height: 210px;
  margin-top: 30px;
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${colors.secondary};
  height: 40px;
  border-radius: 5px;
  margin-top: 120px;

  ${({disabled}) => disabled && 'opacity: 0.75'};
`;

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
