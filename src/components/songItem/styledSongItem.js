import styled from 'styled-components/native';
import {colors} from '../../assets';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;

  background: ${({isPair}) => (isPair ? colors.lightGray : colors.background)};
`;

export const Name = styled.View`
  display: flex;
  justify-content: center;
  width: 60%;
  padding: 10px;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: ${colors.dark};
`;

export const Cipher = styled.View`
  width: 15%;
  margin-left: -1px;
`;

export const Column = styled.View`
  width: 12.5%;
`;

export const Head = styled.View.attrs({
  borderTopWidth: 0,
  borderBottomWidth: 0.5,
  borderBottomColor: colors.gray,
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25px;
  border: 1px solid ${colors.gray};
`;

export const HeadText = styled.Text`
  color: ${colors.primary};
  font-size: ${({big}) => (big ? '13px' : '10px')};
`;

export const Content = styled.View.attrs({borderBottomWidth: 0})`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  border: 1px solid ${colors.gray};
`;

export const ContentText = styled.Text`
  color: ${colors.dark};
  font-size: 14px;
`;

export const Actions = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 12.5%;
  padding: 5px 0;
`;

export const Icon = styled.Image``;

export const Button = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
`;
