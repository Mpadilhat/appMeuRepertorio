import React from 'react';
import * as s from './styledToast';
import Toast from 'react-native-root-toast';
import {icons, colors} from '../../assets';

const configs = {
  duration: 1500,
  position: Toast.positions.CENTER,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 250,
  backgroundColor: colors.primary,
  opacity: 0.9,
};

const MyToast = (type, message) => (
  <s.Container>
    <s.Icon source={icons[type]} borderColor={type} />
    <s.Text>{message}</s.Text>
  </s.Container>
);

const customToast = (type, message) =>
  Toast.show(MyToast(type, message), configs);

export const CustomToast = {
  success: message => customToast('success', message),
  error: message => customToast('error', message),
};
