import React, {useState, useEffect} from 'react';
import * as s from './styled-song';
import {storage} from '@src/utils';
import {useSearch} from '@src/contexts';
import {
  Toast,
  InputWithLabel,
  SelectWithLabel,
  Button,
  SwitchWithLabel,
} from '@src/components';
import {useForm} from 'react-hook-form';
import {toneOptions} from '@src/constants';

const Song = ({navigation, route}) => {
  const {editId} = route.params;
  const {registeredSongs, loadSongs} = useSearch();
  const {control, watch, setValue} = useForm();
  const songName = watch('songName', '');
  const singer = watch('singer', '');
  const tone = watch('tone', 'C');
  const needsCipher = watch('needsCipher', false);
  const [focus, setFocus] = useState('');
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const buttonIsDisabled = isLoadingSave || !singer || !songName;
  const buttonLabel = isLoadingSave
    ? 'SALVANDO...'
    : editId
    ? 'SALVAR ALTERAÇÕES'
    : 'CADASTRAR';

  function saveFirstSong() {
    const songs = [
      {
        id: 1,
        songName: songName.trim(),
        singer: singer.trim(),
        tone,
        needsCipher,
      },
    ];

    saveSong(songs);
  }

  function verifyIfSongExists() {
    return new Promise((resolve, reject) => {
      const songs = [...registeredSongs];
      const name = songName?.trim()?.toLowerCase();
      const whoSings = singer?.trim()?.toLowerCase();
      let songExists = false;

      for (let x = 0; x < songs.length; x++) {
        if (
          songs[x]?.songName.toLowerCase() === name &&
          songs[x]?.singer.toLowerCase() === whoSings &&
          songs[x]?.id !== editId
        ) {
          songExists = true;
          break;
        }
      }

      if (songExists) {
        resolve();
      } else {
        reject();
      }
    });
  }

  function updateSong(songs) {
    let songIndex;

    for (let pos = 0; pos < registeredSongs.length; pos++) {
      if (registeredSongs[pos].id === editId) {
        songIndex = pos;
        break;
      }
    }

    songs[songIndex] = {
      id: songs[songIndex].id,
      songName: songName.trim(),
      singer: singer.trim(),
      tone,
      needsCipher,
    };

    return songs;
  }

  function addNewSong(songs) {
    const lastId = registeredSongs[registeredSongs.length - 1].id;

    songs.push({
      id: lastId + 1,
      songName: songName.trim(),
      singer: singer.trim(),
      tone,
      needsCipher,
    });

    return songs;
  }

  function saveSong(songs) {
    storage
      .save({
        key: 'songs',
        data: songs,
        expires: null,
      })
      .then(() => {
        loadSongs().then(() => {
          Toast.success(editId ? 'Música editada!' : 'Música adicionada!');
          navigation.navigate('Home');
        });
      });
  }

  function saveChanges() {
    const noSongsRegistered = registeredSongs.length === 0;
    setIsLoadingSave(true);

    if (noSongsRegistered) {
      saveFirstSong();
    } else {
      verifyIfSongExists()
        .then(() => {
          Toast.error('Essa música já está cadastrada!');
          setIsLoadingSave(false);
        })
        .catch(() => {
          let songs = [...registeredSongs];
          const editSong = !!editId;
          songs = [...(editSong ? updateSong(songs) : addNewSong(songs))];
          saveSong(songs);
        });
    }
  }

  useEffect(() => {
    if (editId) {
      const songToEdit = registeredSongs.find(song => song.id === editId);

      if (songToEdit?.id) {
        setValue('songName', songToEdit.songName);
        setValue('singer', songToEdit.singer);
        setValue('tone', songToEdit.tone);
        setValue('needsCipher', songToEdit.needsCipher);
      }
    }
  }, []);

  return (
    <s.Content>
      <InputWithLabel
        label="Nome da música:"
        name="songName"
        control={control}
        focus={focus}
        setFocus={setFocus}
        marginBottom="20px"
      />
      <InputWithLabel
        label="Quem canta?"
        name="singer"
        control={control}
        focus={focus}
        setFocus={setFocus}
        marginBottom="20px"
      />

      <s.Row>
        <SelectWithLabel
          label="Tom:"
          name="tone"
          control={control}
          placeholder="Selecione o tom"
          options={toneOptions}
          width="40%"
        />
        <SwitchWithLabel
          label="Precisa de cifra?"
          name="needsCipher"
          control={control}
          width="50%"
          showOptions
        />
      </s.Row>
      <s.WrapperButton>
        <Button
          label={buttonLabel}
          isDisabled={buttonIsDisabled}
          onPress={saveChanges}
        />
      </s.WrapperButton>
    </s.Content>
  );
};

export default Song;
