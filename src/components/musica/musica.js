import React, {useState} from 'react';
import * as s from './styled-musica';
import {icons} from '../../assets';
import {useSearch} from '../../context';
import {storage} from '../../utils';
import {Modal, Toast} from '../../components';

export default function Musica({posicao, par, dados, navigation, refresh}) {
  const {musicasCadastradas, buscarMusicas} = useSearch();
  const [open, setOpen] = useState({modal: false, musica: {}});

  function removerMusica(id) {
    let musicasAtualizadas = [];

    musicasCadastradas.map(musica => {
      if (musica.id !== id) musicasAtualizadas.push(musica);
    });
    storage.save({key: 'musicas', data: musicasAtualizadas, expires: null});
    buscarMusicas();
    setOpen(false);
    Toast.success('Música excluída');
  }

  return (
    <s.Container par={par}>
      <Modal
        open={open.modal}
        musica={open.musica}
        onPress={() => {
          removerMusica(dados.id);
          refresh();
        }}
        closeModal={() => setOpen({modal: false, musica: {}})}
      />

      <s.Nome>
        <s.Titulo numberOfLines={2} style={{fontFamily: 'Nunito-Black'}}>
          {posicao + 1}. {dados.nomeMusica} ({dados.quemCanta})
        </s.Titulo>
      </s.Nome>

      <s.Column>
        <s.Head>
          <s.HeadText style={{fontFamily: 'Nunito-SemiBold'}}>TOM</s.HeadText>
        </s.Head>
        <s.Content>
          <s.HeadText big style={{fontFamily: 'Nunito-Bold'}}>
            {dados.tom}
          </s.HeadText>
        </s.Content>
      </s.Column>

      <s.Cifra>
        <s.Head>
          <s.HeadText style={{fontFamily: 'Nunito-SemiBold'}}>CIFRA</s.HeadText>
        </s.Head>
        <s.Content>
          <s.HeadText big style={{fontFamily: 'Nunito-Regular'}}>
            {dados.precisaCifra ? 'Sim' : 'Não'}
          </s.HeadText>
        </s.Content>
      </s.Cifra>

      <s.Acoes>
        <s.Botao
          onPress={() =>
            navigation.navigate('Editar música', {idEditar: dados.id})
          }>
          <s.Icon source={icons.editar} />
        </s.Botao>
        <s.Botao onPress={() => setOpen({modal: true, musica: dados})}>
          <s.Icon source={icons.excluir} />
        </s.Botao>
      </s.Acoes>
    </s.Container>
  );
}
