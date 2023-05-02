import styled from 'styled-components/native';
import {colors} from '@src/assets';

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Option = styled.Text`
  font-size: 12px;
  color: ${colors.dark};
  font-family: 'Nunito-Regular';
`;

export const Switch = styled.Switch.attrs(({value: isChecked}) => ({
  trackColor: {false: colors.details, true: colors.lightSecondaryTrackSwitch},
  thumbColor: isChecked ? colors.lightSecondary : colors.lightGray,
}))`
  transform: scaleX(1.34) scaleY(1.34);
  height: 35px;
  margin: ${({showOptions}) => (showOptions ? '0 20px' : 0)};
`;
