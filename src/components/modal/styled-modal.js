import styled from 'styled-components';
import {colors} from '../../assets';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Content = styled.View`
  background: ${colors.light};
  border-radius: 5px;
  padding: 25px;
`;

export const Text = styled.Text`
  color: ${colors.dark};
  font-size: 16px;
  text-align: center;
  margin-bottom: ${({ok}) => (ok ? '20px' : '5px')};
`;

export const Bold = styled.Text`
  color: ${colors.dark};
  font-size: 18px;
  text-align: center;
`;

export const ContainerButtons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: ${({center}) => (center ? 'center' : 'space-between')};
  margin-top: 30px;
`;

export const Botao = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100px;
  background: ${({red}) => (red ? colors.error : colors.success)};
  border-radius: 5px;
`;

export const TextButton = styled.Text`
  color: ${colors.light};
  font-size: 14px;
  text-align: center;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const View = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 5px;
`;
