import React, {createContext, useContext, useState, useEffect} from 'react';
import {storage} from '../utils';

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
  const [registeredSongs, setRegisteredSongs] = useState([]);
  const [isLoadingSongs, setIsLoadingSongs] = useState(false);

  function loadSongs() {
    setIsLoadingSongs(true);

    storage
      .load({key: 'songs'})
      .then(resp => setRegisteredSongs(resp))
      .catch(() => setRegisteredSongs([]))
      .finally(() => setIsLoadingSongs(false));
  }

  useEffect(() => {
    loadSongs();
  }, []);

  return (
    <SearchContext.Provider
      value={{
        registeredSongs,
        isLoadingSongs,
        loadSongs,
      }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
