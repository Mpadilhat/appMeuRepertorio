import styled from 'styled-components/native';
import {colors} from '../../assets';

export const Container = styled.View`
  background: ${colors.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const BotaoRandom = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12.5px;
`;

export const IconRandom = styled.Image`
  height: 20px;
  width: 25px;
`;

export const Wrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const BotaoAdicionarMusica = styled.View`
  height: 25px;
  width: 25px;
  background: ${colors.light};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12.5px;
  margin-left: 10px;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: ${colors.light};
  text-shadow: 1px 2px 2px ${colors.dark};
`;

export const TextButton = styled.Text`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 25px;
  color: ${colors.primary};
  font-weight: 600;
  position: absolute;
  bottom: -2.5px;
`;
