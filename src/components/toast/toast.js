import React from 'react';
import * as s from './styledToast';
import Toast from 'react-native-root-toast';
import {icons, colors} from '../../assets';

const MyToast = message => (
  <s.Container>
    <s.Icon source={icons.success} />
    <s.Text>{message}</s.Text>
  </s.Container>
);

export const CustomToast = {
  success: message =>
    Toast.show(MyToast(message), {
      duration: 1500,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 250,
      backgroundColor: colors.primary,
      opacity: 0.9,
    }),
};
