import React from 'react';
import Modal from 'react-native-modal';
import * as s from './styled-modal';
import {shadow} from '../../assets';

const CustomModal = ({open, musica, onPress, closeModal, modalOk}) => {
  return (
    <Modal isVisible={open} backdropOpacity={0.5}>
      <s.Container>
        <s.Content>
          <s.Text ok={modalOk} style={{fontFamily: 'Nunito-SemiBold'}}>
            {modalOk ? 'Toca ai a música' : 'Deseja mesmo excluir a música'}
          </s.Text>
          <s.Text style={{fontFamily: 'Nunito-Black'}}>
            "{musica?.nomeMusica || 'Nome da música'} (
            {musica?.quemCanta || 'Quem canta'})"
            {!modalOk && '?'}
          </s.Text>

          {modalOk && (
            <s.View>
              <s.Text style={{fontFamily: 'Nunito-Regular'}}>
                Tom:{' '}
                <s.Text style={{fontFamily: 'Nunito-Bold'}}>
                  {musica?.tom || 'Tom'}
                </s.Text>
              </s.Text>
              <s.Text style={{fontFamily: 'Nunito-Regular'}}>
                Cifra:{' '}
                <s.Text style={{fontFamily: 'Nunito-Bold'}}>
                  {musica?.precisaCifra === false ? 'Não' : 'Sim' || 'Cifra'}
                </s.Text>
              </s.Text>
            </s.View>
          )}

          <s.ContainerButtons center={modalOk}>
            <s.Botao
              red={modalOk ? false : true}
              onPress={closeModal}
              style={shadow}>
              <s.TextButton style={{fontFamily: 'Nunito-Black'}}>
                {modalOk ? 'OK' : 'NÃO'}
              </s.TextButton>
            </s.Botao>
            {!modalOk && (
              <s.Botao onPress={onPress} style={shadow}>
                <s.TextButton style={{fontFamily: 'Nunito-Black'}}>
                  SIM
                </s.TextButton>
              </s.Botao>
            )}
          </s.ContainerButtons>
        </s.Content>
      </s.Container>
    </Modal>
  );
};

export default CustomModal;
