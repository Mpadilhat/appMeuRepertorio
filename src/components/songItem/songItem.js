import React, {useState} from 'react';
import * as s from './styledSongItem';
import {icons} from '../../assets';
import {useSearch} from '../../context';
import {storage} from '../../utils';
import {Modal, Toast} from '../../components';

const SongItem = ({position, isPair, data, navigation, refresh}) => {
  const {registeredSongs, loadSongs} = useSearch();
  const [isOpen, setIsOpen] = useState({modal: false, song: {}});

  const removeSong = songId => {
    const updatedSongs = registeredSongs.filter(song => song.id !== songId);
    storage.save({key: 'songs', data: updatedSongs, expires: null});
    loadSongs();
    setIsOpen(false);
    Toast.success('Música excluída');
  };

  return (
    <s.Container isPair={isPair}>
      <Modal
        isOpen={isOpen.modal}
        song={isOpen.song}
        onPress={() => {
          removeSong(data.id);
          refresh();
        }}
        closeModal={() => setIsOpen({modal: false, song: {}})}
      />

      <s.Name>
        <s.Title numberOfLines={2} style={{fontFamily: 'Nunito-Black'}}>
          {position + 1}. {data.songName} ({data.whoSings})
        </s.Title>
      </s.Name>

      <s.Column>
        <s.Head>
          <s.HeadText style={{fontFamily: 'Nunito-SemiBold'}}>TOM</s.HeadText>
        </s.Head>
        <s.Content>
          <s.HeadText big style={{fontFamily: 'Nunito-Bold'}}>
            {data.tone}
          </s.HeadText>
        </s.Content>
      </s.Column>

      <s.Cipher>
        <s.Head>
          <s.HeadText style={{fontFamily: 'Nunito-SemiBold'}}>CIFRA</s.HeadText>
        </s.Head>
        <s.Content>
          <s.HeadText big style={{fontFamily: 'Nunito-Regular'}}>
            {data.needsCipher ? 'Sim' : 'Não'}
          </s.HeadText>
        </s.Content>
      </s.Cipher>

      <s.Actions>
        <s.Button
          onPress={() =>
            navigation.navigate('Editar música', {editId: data.id})
          }>
          <s.Icon source={icons.edit} />
        </s.Button>
        <s.Button onPress={() => setIsOpen({modal: true, song: data})}>
          <s.Icon source={icons.dump} />
        </s.Button>
      </s.Actions>
    </s.Container>
  );
};

export default SongItem;
