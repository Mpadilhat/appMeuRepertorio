import React, {useState, useEffect} from 'react';
import * as s from './styled-song';
import {storage, removeAccents, randomString} from '../../utils';
import {useSearch} from '../../context';
import {Toast, InputWithLabel, SelectWithLabel, Button} from '../../components';
import {Controller, useForm} from 'react-hook-form';
import {toneOptions} from '../../constants';

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

  function verifiyIfSongExists() {
    return new Promise((resolve, reject) => {
      let songs = [...registeredSongs];
      let name = songName?.toLowerCase();
      let whoSings = singer?.toLowerCase();
      let songExists = false;

      for (let x = 0; x < songs.length; x++) {
        if (
          songs[x]?.songName.toLowerCase() === name &&
          songs[x]?.singer.toLowerCase() === whoSings &&
          editId &&
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

  function saveSong() {
    let songs = [];
    setIsLoadingSave(true);

    if (registeredSongs.length === 0) {
      songs = [
        {
          id: randomString(),
          songName,
          singer,
          tone,
          needsCipher,
        },
      ];

      console.log('songs :>> ', songs);

      storage.save({
        key: 'songs',
        data: songs,
        expires: null,
      });

      loadSongs();
      Toast.success('Música adicionada!');
      navigation.navigate('Home');
    } else {
      songs = [...registeredSongs];

      if (editId) {
        let songIndex;

        for (let pos = 0; pos < registeredSongs.length; pos++) {
          if (registeredSongs[pos].id === editId) {
            songIndex = pos;
            break;
          }
        }

        songs[songIndex] = {
          id: songs[songIndex].id,
          songName,
          singer,
          tone,
          needsCipher,
        };
      } else {
        songs.push({
          id: randomString(),
          songName,
          singer,
          tone,
          needsCipher,
        });
      }

      function sortAndSave() {
        songs.sort(function (a, b) {
          let songA = removeAccents(a.songName).toLowerCase();
          let songB = removeAccents(b.songName).toLowerCase();

          return songA.localeCompare(songB);
        });

        storage.save({
          key: 'songs',
          data: songs,
          expires: null,
        });

        loadSongs();
        Toast.success(editId ? 'Música editada!' : 'Música adicionada!');
        navigation.navigate('Home');
      }

      verifiyIfSongExists()
        .then(() => {
          Toast.success('Essa música já está cadastrada!');
          setIsLoadingSave(false);
        })
        .catch(() => sortAndSave());
    }
  }

  useEffect(() => {
    if (editId) {
      registeredSongs.map(song => {
        if (song.id === editId) {
          setValue('songName', song.songName);
          setValue('singer', song.singer);
          setValue('tone', song.tone);
          setValue('needsCipher', song.needsCipher);
        }
      });
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
        <SelectWithLabel
          label="Precisa de cifra?"
          name="needsCipher"
          control={control}
          placeholder="Precisa de cifra?"
          options={[
            {value: false, label: 'Não'},
            {value: true, label: 'Sim'},
          ]}
          width="50%"
        />
      </s.Row>
      <s.WrapperButton>
        <Button
          label={buttonLabel}
          isDisabled={buttonIsDisabled}
          onPress={saveSong}
        />
      </s.WrapperButton>
    </s.Content>
  );
};

export default Song;
