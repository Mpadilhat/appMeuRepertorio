import styled from 'styled-components/native';
import {colors} from '@src/assets';

export const SearchContainer = styled.View`
  background: ${colors.lightSecondary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${colors.light};
  border-radius: 50px;
  height: 50px;
  border: 1px solid ${colors.secondary};
`;

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: colors.details,
  fontFamily: 'Nunito-Light',
})`
  flex: 1;
  padding: 5px 0 5px 20px;
  font-size: 16px;
`;

export const Icon = styled.Image`
  height: 20px;
  width: 20px;
  margin: 0 20px 0 10px;
`;
