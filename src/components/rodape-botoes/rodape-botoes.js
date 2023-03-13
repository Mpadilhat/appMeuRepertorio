import React, {useState} from 'react';
import * as s from './styled-rodape-botoes';
import {shadow, icons} from '../../assets';
import {useSearch} from '../../context';
import {Modal} from '../../components';

export default function RodapeBotoes({navigation, limparPesquisa}) {
  const {musicasCadastradas} = useSearch();
  const [open, setOpen] = useState({modal: false, musica: {}});

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function recomendarMusica() {
    setOpen({
      modal: true,
      musica:
        musicasCadastradas[
          getRandomIntInclusive(0, musicasCadastradas.length - 1)
        ],
    });
  }

  return (
    <s.Container style={shadow}>
      <Modal
        modalOk
        open={open.modal}
        musica={open.musica}
        onPress={() => removerMusica(dados.id)}
        closeModal={() => setOpen({modal: false, musica: {}})}
      />

      <s.BotaoRandom onPress={() => recomendarMusica()}>
        <s.IconRandom source={icons.random} />
      </s.BotaoRandom>
      <s.Wrapper
        onPress={() => {
          limparPesquisa();
          navigation.navigate('Cadastrar música', {idEditar: null});
        }}>
        <s.Text style={{fontFamily: 'Nunito-Black'}}>Adicionar música</s.Text>
        <s.BotaoAdicionarMusica style={shadow}>
          <s.TextButton style={{fontFamily: 'Nunito-Bold'}}>+</s.TextButton>
        </s.BotaoAdicionarMusica>
      </s.Wrapper>
    </s.Container>
  );
}
