import React from 'react';
import Modal from 'react-native-modal';
import * as s from './styledModal';
import {shadow} from '../../assets';

const CustomModal = ({isOpen, song, onPress, closeModal, modalOk}) => {
  return (
    <Modal isVisible={isOpen} backdropOpacity={0.5}>
      <s.Container>
        <s.Content>
          <s.Text ok={modalOk} style={{fontFamily: 'Nunito-SemiBold'}}>
            {modalOk ? 'Toca ai a música' : 'Deseja mesmo excluir a música'}
          </s.Text>
          <s.Text style={{fontFamily: 'Nunito-Black'}}>
            "{song?.songName || 'Nome da música'} (
            {song?.whoSings || 'Quem canta'})"
            {!modalOk && '?'}
          </s.Text>

          {modalOk && (
            <s.View>
              <s.Text style={{fontFamily: 'Nunito-Regular'}}>
                Tom:{' '}
                <s.Text style={{fontFamily: 'Nunito-Bold'}}>
                  {song?.tone || 'Tom'}
                </s.Text>
              </s.Text>
              <s.Text style={{fontFamily: 'Nunito-Regular'}}>
                Cifra:{' '}
                <s.Text style={{fontFamily: 'Nunito-Bold'}}>
                  {song?.needsCipher === false ? 'Não' : 'Sim' || 'Cifra'}
                </s.Text>
              </s.Text>
            </s.View>
          )}

          <s.ContainerButtons center={modalOk}>
            <s.Button
              isRed={modalOk ? false : true}
              onPress={closeModal}
              style={shadow}>
              <s.TextButton style={{fontFamily: 'Nunito-Black'}}>
                {modalOk ? 'OK' : 'NÃO'}
              </s.TextButton>
            </s.Button>
            {!modalOk && (
              <s.Button onPress={onPress} style={shadow}>
                <s.TextButton style={{fontFamily: 'Nunito-Black'}}>
                  SIM
                </s.TextButton>
              </s.Button>
            )}
          </s.ContainerButtons>
        </s.Content>
      </s.Container>
    </Modal>
  );
};

export default CustomModal;
