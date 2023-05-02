import React, {useMemo} from 'react';
import * as s from './styledHome';
import {SearchBar, SongItem, FooterButtons} from '../../components';
import {icons} from '../../assets';
import {useSearch} from '../../contexts';
import {useForm} from 'react-hook-form';
import {removeAccents} from '../../utils';

const Home = ({navigation}) => {
  const {isLoadingSongs, registeredSongs} = useSearch();
  const {control, watch, setValue} = useForm();
  const search = watch('search', '');
  const orderedSongs = useMemo(() => {
    return [...registeredSongs].sort(function (a, b) {
      const songA = removeAccents(a?.songName).toLowerCase();
      const songB = removeAccents(b?.songName).toLowerCase();

      return songA?.localeCompare(songB);
    });
  }, [registeredSongs]);
  const searchedSongs =
    orderedSongs.filter(song =>
      song.songName.toLowerCase().includes(search.toLowerCase()),
    ) || [];
  const songList = search ? searchedSongs : orderedSongs;

  return (
    <s.SafeAreaView>
      <SearchBar control={control} />

      {songList.length > 0 && (
        <s.Header>
          <s.Head empty />
          <s.Head>
            <s.HeadText>TOM</s.HeadText>
          </s.Head>
          <s.Head cipher>
            <s.HeadText>CIFRA</s.HeadText>
          </s.Head>
          <s.Head empty last />
        </s.Header>
      )}

      <s.ScrollView style={{marginBottom: songList.length ? 65 : 0}}>
        {isLoadingSongs ? (
          <s.Container>
            <s.Text>Carregando músicas...</s.Text>
            <s.Icon source={icons.searching} />
          </s.Container>
        ) : songList.length ? (
          songList.map((song, index) => (
            <SongItem
              key={song.id}
              position={index}
              data={song}
              navigation={navigation}
              refresh={() => {
                setValue('search', searchedSongs.length ? search : '');
              }}
            />
          ))
        ) : (
          <s.Container>
            <s.Text
              style={{
                marginRight: search ? 60 : 25,
                marginLeft: search ? 60 : 25,
                marginBottom: 75,
              }}>
              {search
                ? `Música não encontrada. ${'\n'} Para cadastrá-la, clique no botão abaixo`
                : 'Você ainda não adicionou nenhuma música'}
            </s.Text>

            <s.Icon source={icons.noSongs} />
          </s.Container>
        )}
      </s.ScrollView>

      <FooterButtons
        navigation={navigation}
        clearSearch={() => setValue('search', '')}
      />
    </s.SafeAreaView>
  );
};

export default Home;
