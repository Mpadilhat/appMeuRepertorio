import React, {useState, useEffect, useCallback} from 'react';
import * as s from './styledHome';
import {SearchBar, SongItem, FooterButtons} from '../../components';
import {icons} from '../../assets';
import {useSearch} from '../../context';

const Home = ({navigation}) => {
  const {isLoadingSongs, registeredSongs} = useSearch();
  const [search, setSearch] = useState('');
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [searchedSongs, setSearchedSongs] = useState([]);

  console.log('AAAAA :>> ', isLoadingSongs);

  const searchSong = useCallback(async () => {
    setIsLoadingSearch(true);

    const filter = registeredSongs.filter(song =>
      song.songName.toLowerCase().includes(search.toLowerCase()),
    );

    setSearchedSongs(filter);
    setTimeout(() => {
      setIsLoadingSearch(false);
    }, 100);
  }, [registeredSongs, search]);

  useEffect(() => {
    if (search) {
      searchSong();
    }
  }, [search, searchSong]);

  return (
    <s.SafeAreaView>
      <SearchBar value={search} setValue={setSearch} />
      <s.ScrollView style={{marginBottom: registeredSongs.length > 0 ? 65 : 0}}>
        {isLoadingSongs || isLoadingSearch ? (
          <s.Container>
            <s.Text style={{fontFamily: 'Nunito-Regular'}}>
              {search ? 'Procurando música(s)...' : 'Carregando músicas...'}
            </s.Text>
            <s.Icon source={icons.searching} />
          </s.Container>
        ) : search && searchedSongs.length > 0 ? (
          searchedSongs.map((song, index) => (
            <SongItem
              key={song.id}
              position={index}
              data={song}
              isPair={index % 2 === 0}
              navigation={navigation}
              refresh={() => setSearch(prev => prev)}
            />
          ))
        ) : !search && registeredSongs.length > 0 ? (
          registeredSongs.map((song, index) => (
            <SongItem
              key={song.id}
              position={index}
              data={song}
              isPair={index % 2 === 0}
              navigation={navigation}
              refresh={() => setSearch('')}
            />
          ))
        ) : (
          <s.Container>
            <s.Text
              style={{
                fontFamily: 'Nunito-Regular',
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
        clearSearch={() => setSearch('')}
      />
    </s.SafeAreaView>
  );
};

export default Home;
