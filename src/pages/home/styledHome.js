import styled from 'styled-components/native';
import {colors} from '../../assets';

export const SafeAreaView = styled.SafeAreaView`
  background: ${colors.light};
  flex: 1;
`;

export const Header = styled.View.attrs({
  borderTopWidth: 0,
})`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid ${colors.gray};
`;

export const Head = styled.View.attrs(({empty, cipher}) => ({
  borderTopWidth: 0,
  borderBottomWidth: 0,
  borderLeftWidth: empty && 0,
  borderRightWidth: cipher ? 1 : 0,
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  border: 1px solid ${colors.gray};
  width: ${({empty, cipher, last}) =>
    empty && !last ? '60%' : cipher ? '15%' : '12.5%'};
  margin-left: ${({cipher}) => (cipher ? '-1px' : '0')};
`;

export const HeadText = styled.Text`
  color: ${colors.primary};
  font-size: 14px;
  font-family: 'Nunito-SemiBold';
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
