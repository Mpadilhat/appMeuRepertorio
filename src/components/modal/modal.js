import React from 'react';
import Modal from 'react-native-modal';
import * as s from './styledModal';
import {shadow} from '../../assets';

const CustomModal = ({isOpen, song, onPress, closeModal, suggestSong}) => {
  return (
    <Modal isVisible={isOpen} backdropOpacity={0.5}>
      <s.Container>
        <s.Content>
          <s.Text fontSemiBold marginBottom title>
            {suggestSong
              ? 'Toca aí a música'
              : 'Deseja mesmo excluir a música?'}
          </s.Text>
          <s.Text fontBlack big>
            {song?.songName || 'Nome da música'}
          </s.Text>
          <s.View singer>
            <s.Text fontRegular>{song?.singer || 'Quem canta'}</s.Text>
          </s.View>

          {suggestSong && (
            <s.View>
              <s.Text fontRegular greyBackground marginRight>
                Tom: <s.Text fontBold>{song?.tone || 'Tom'}</s.Text>
              </s.Text>
              <s.Text fontRegular greyBackground>
                Cifra:{' '}
                <s.Text fontBold>
                  {song?.needsCipher === false ? 'Não' : 'Sim' || 'Cifra'}
                </s.Text>
              </s.Text>
            </s.View>
          )}

          <s.ContainerButtons center={suggestSong}>
            <s.Button isRed={!suggestSong} onPress={closeModal} style={shadow}>
              <s.TextButton>{suggestSong ? 'OK' : 'NÃO'}</s.TextButton>
            </s.Button>
            {!suggestSong && (
              <s.Button onPress={onPress} style={shadow}>
                <s.TextButton>SIM</s.TextButton>
              </s.Button>
            )}
          </s.ContainerButtons>
        </s.Content>
      </s.Container>
    </Modal>
  );
};

export default CustomModal;
