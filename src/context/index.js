import React, {createContext, useContext, useState, useEffect} from 'react';
import {storage} from '../utils';

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
  const [registeredSongs, setRegisteredSongs] = useState([]);
  const [isLoadingSongs, setIsLoadingSongs] = useState(false);

  async function loadSongs() {
    setIsLoadingSongs(true);

    return new Promise((resolve, reject) => {
      storage
        .load({key: 'songs'})
        .then(resp => {
          setRegisteredSongs(resp);
          resolve();
        })
        .catch(() => {
          setRegisteredSongs([]);
          reject();
        })
        .finally(() => setIsLoadingSongs(false));
    });
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
