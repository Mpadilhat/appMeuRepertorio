import styled from 'styled-components/native';
import {colors} from '../../assets';

export const SafeAreaView = styled.SafeAreaView`
  background: ${colors.light};
  flex: 1;
`;

export const ScrollView = styled.ScrollView``;

export const Container = styled.View`
  height: 493px;
  display: flex;
  padding-top: 40px;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${colors.dark};
  font-size: 20px;
  font-family: 'Nunito-Regular';
  margin-bottom: 50px;
  text-align: center;
`;

export const Icon = styled.Image``;
