import React, {useEffect, useMemo, useState} from 'react';
import * as s from './styledSongItem';
import {icons} from '../../../assets';
import {useSearch} from '../../../contexts';
import {storage} from '../../../utils';
import {Modal, Toast} from '../../../components';

const SongItem = ({position, data, navigation, refresh}) => {
  const {registeredSongs, loadSongs} = useSearch();
  const closeModal = useMemo(() => {
    return {modal: false, song: {}};
  }, []);
  const [isOpen, setIsOpen] = useState(closeModal);
  const [successfullyDeleted, setSuccessfullyDeleted] = useState(false);
  const isPair = position % 2 === 0;

  useEffect(() => {
    if (successfullyDeleted) {
      setIsOpen(closeModal);
    }

    return () => setIsOpen(closeModal);
  }, [successfullyDeleted, closeModal]);

  function removeSong(songId) {
    const updatedSongs = registeredSongs.filter(song => song.id !== songId);

    storage.save({key: 'songs', data: updatedSongs, expires: null}).then(() => {
      loadSongs().then(() => {
        refresh();
        Toast.success('Música excluída');
        setSuccessfullyDeleted(true);
      });
    });
  }

  return (
    <s.Container isPair={isPair}>
      <Modal
        isOpen={isOpen.modal}
        song={isOpen.song}
        onPress={() => removeSong(data.id)}
        closeModal={() => setIsOpen({modal: false, song: {}})}
      />

      <s.Name>
        <s.Title numberOfLines={2}>
          {position + 1}. {data.songName} ({data.singer})
        </s.Title>
      </s.Name>
      <s.Column>
        <s.Content>
          <s.HeadText big fontBold>
            {data.tone}
          </s.HeadText>
        </s.Content>
      </s.Column>
      <s.Cipher>
        <s.Content>
          <s.HeadText big fontRegular>
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
