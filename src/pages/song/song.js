import React, {useState, useEffect} from 'react';
import * as s from './styled-song';
import {shadow} from '../../assets';
import {tones, storage, removeAccents, randomString} from '../../utils';
import {Picker} from '@react-native-picker/picker';
import {useSearch} from '../../context';
import {Toast} from '../../components';

const Song = ({navigation, route}) => {
  const {editId} = route.params;
  const {registeredSongs, loadSongs} = useSearch();
  const [songName, setSongName] = useState();
  const [whoSings, setWhoSings] = useState();
  const [tone, setTone] = useState('C');
  const [needsCipher, setNeedsCipher] = useState(false);
  const [focus, setFocus] = useState('');
  const [isLoadingSave, setIsLoadingSave] = useState(false);

  function verifiyIfSongExists() {
    return new Promise((resolve, reject) => {
      let songs = registeredSongs;
      let name = songName?.toLowerCase();
      let singer = whoSings?.toLowerCase();
      let exists = false;

      for (let x = 0; x < songs.length; x++) {
        if (
          songs[x]?.songName.toLowerCase() === name &&
          songs[x]?.whoSings.toLowerCase() === singer &&
          editId &&
          songs[x]?.id !== editId
        ) {
          exists = true;
          break;
        }
      }

      if (exists) {
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
          whoSings,
          tone,
          needsCipher,
        },
      ];

      storage.save({
        key: 'songs',
        data: songs,
        expires: null,
      });

      loadSongs();
      Toast.success('Música adicionada!');
      navigation.navigate('Home');
    } else {
      songs = registeredSongs;

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
          whoSings,
          tone,
          needsCipher,
        };
      } else {
        songs.push({
          id: randomString(),
          songName,
          whoSings,
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
          setSongName(song.songName);
          setWhoSings(song.whoSings);
          setTone(song.tone);
          setNeedsCipher(song.needsCipher);
        }
      });
    }
  }, []);

  return (
    <s.Content>
      <s.Column>
        <s.TextLabel style={{fontFamily: 'Nunito-Regular'}}>
          Nome da música:
        </s.TextLabel>
        <s.Input
          foco={focus === 'name'}
          onFocus={() => setFocus('name')}
          onBlur={() => setFocus('')}
          style={{fontFamily: 'Nunito-Light'}}
          value={songName}
          onChangeText={text => setSongName(text)}
        />
      </s.Column>

      <s.Column>
        <s.TextLabel style={{fontFamily: 'Nunito-Regular'}}>
          Quem canta?
        </s.TextLabel>
        <s.Input
          foco={focus === 'singer'}
          onFocus={() => setFocus('singer')}
          onBlur={() => setFocus('')}
          style={{fontFamily: 'Nunito-Light'}}
          value={whoSings}
          onChangeText={text => setWhoSings(text)}
        />
      </s.Column>

      <s.Row>
        <s.Column width="40%" noSpace>
          <s.TextLabel style={{fontFamily: 'Nunito-Regular'}}>Tom:</s.TextLabel>
          <s.Select>
            <Picker
              style={s.styleSelect}
              prompt="Selecione o tom"
              selectedValue={tone}
              onValueChange={itemValue => setTone(itemValue)}>
              {tones.map(tone => (
                <Picker.Item
                  key={tone.value}
                  label={tone.label}
                  value={tone.value}
                />
              ))}
            </Picker>
          </s.Select>
        </s.Column>
        <s.Column width="50%" noSpace>
          <s.TextLabel style={{fontFamily: 'Nunito-Regular'}}>
            Precisa de cifra?
          </s.TextLabel>
          <s.Select>
            <Picker
              style={s.styleSelect}
              prompt="Precisa de cifra?"
              selectedValue={needsCipher}
              onValueChange={itemValue => setNeedsCipher(itemValue)}>
              {[
                {value: false, label: 'Não'},
                {value: true, label: 'Sim'},
              ].map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </s.Select>
        </s.Column>
      </s.Row>
      <s.WrapperButton>
        <s.Button
          style={shadow}
          disabled={
            isLoadingSave ||
            needsCipher === null ||
            !tone ||
            !whoSings ||
            !songName
          }
          onPress={() => saveSong()}>
          <s.TextButton style={{fontFamily: 'Nunito-Black'}}>
            {editId ? 'Salvar mudanças' : '+ Adicionar música'}
          </s.TextButton>
        </s.Button>
      </s.WrapperButton>
    </s.Content>
  );
};

export default Song;
