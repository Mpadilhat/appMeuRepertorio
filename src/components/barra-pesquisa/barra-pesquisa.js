import React from 'react';
import * as s from './styled-barra-pesquisa';
import {shadow, icons} from '../../assets';

export default function BarraPesquisa({value, setValue}) {
  return (
    <s.ContainerPesquisa>
      <s.Wrapper style={shadow}>
        <s.InputPesquisa
          value={value}
          placeholder="Procurar música"
          onChangeText={text => {
            let texto = text;
            if (texto.includes('  ')) texto.replace('  ', ' ');
            setValue(texto);
          }}
        />
        <s.Icon source={icons.lupa} />
      </s.Wrapper>
    </s.ContainerPesquisa>
  );
}
