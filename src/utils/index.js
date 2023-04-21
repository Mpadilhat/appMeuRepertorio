const removeAccents = string => {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

import storage from './storage';
export {storage, removeAccents};
