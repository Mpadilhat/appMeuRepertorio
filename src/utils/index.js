const removeAccents = string => {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const randomString = (length = 20) => {
  var result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

import storage from './storage';
export {storage, removeAccents};
