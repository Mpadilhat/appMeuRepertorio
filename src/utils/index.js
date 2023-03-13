const toms = [
  {value: 'C', label: 'C'},
  {value: 'C#', label: 'C#'},
  {value: 'Cm', label: 'Cm'},
  {value: 'C#m', label: 'C#m'},
  {value: 'D', label: 'D'},
  {value: 'D#', label: 'D#'},
  {value: 'Dm', label: 'Dm'},
  {value: 'D#m', label: 'D#m'},
  {value: 'E', label: 'E'},
  {value: 'Em', label: 'Em'},
  {value: 'F', label: 'F'},
  {value: 'F#', label: 'F#'},
  {value: 'Fm', label: 'Fm'},
  {value: 'F#m', label: 'F#m'},
  {value: 'G', label: 'G'},
  {value: 'G#', label: 'G#'},
  {value: 'Gm', label: 'Gm'},
  {value: 'G#m', label: 'G#m'},
  {value: 'A', label: 'A'},
  {value: 'A#', label: 'A#'},
  {value: 'Am', label: 'Am'},
  {value: 'A#m', label: 'A#m'},
  {value: 'B', label: 'B'},
  {value: 'Bm', label: 'Bm'},
];

const removeAcentos = string => {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const stringAleatoria = (length = 20) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

import storage from './storage';
export {toms, storage, removeAcentos};
