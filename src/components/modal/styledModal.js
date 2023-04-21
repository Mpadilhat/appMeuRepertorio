import styled, {css} from 'styled-components';
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
  font-size: ${({title, big}) => (title ? '18px' : big ? '20px' : '16px')};
  text-align: center;
  margin-bottom: ${({marginBottom}) => (marginBottom ? '20px' : '4px')};
  font-family: ${({fontBlack, fontBold, fontRegular, fontSemiBold}) => {
    let fontFamily = 'Nunito-';

    switch (true) {
      case fontBlack:
        fontFamily += 'Bold';
        break;
      case fontBold:
        fontFamily += 'Bold';
        break;
      case fontRegular:
        fontFamily += 'Regular';
        break;
      case fontSemiBold:
        fontFamily += 'SemiBold';
        break;
      default:
        break;
    }

    return fontFamily;
  }};

  ${({big, greyBackground, marginRight}) =>
    big
      ? css`
          background: ${colors.gray};
          border-radius: 4px;
          padding: 8px 4px;
        `
      : greyBackground &&
        css`
          background: ${colors.gray};
          padding: 4px;
          border-radius: 4px;
          flex: 1;
          margin-right: ${marginRight ? '8px' : 0};
          border-radius: 50px;
        `};
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

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100px;
  background: ${({isRed}) => (isRed ? colors.error : colors.success)};
  border-radius: 5px;
`;

export const TextButton = styled.Text`
  color: ${colors.light};
  font-size: 14px;
  font-family: 'Nunito-Black';
  text-align: center;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const View = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${({singer}) => (singer ? '4px' : '24px')};
  border-radius: 4px;

  ${({singer}) =>
    singer &&
    css`
      background: ${colors.background};
      padding: 2px 2px 0 2px;
    `};
`;
