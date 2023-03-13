import React, {createContext, useContext, useState, useEffect} from 'react';
import {storage} from '../utils';

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
  const [musicasCadastradas, setMusicasCadastradas] = useState([]);
  const [loading, setLoading] = useState(true);

  function buscarMusicas(init) {
    storage.load({key: 'musicas'}).then(resp => {
      setMusicasCadastradas(resp);
      if (init) setLoading(false);
    });
  }

  useEffect(() => {
    buscarMusicas(true);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        musicasCadastradas,
        loading,
        buscarMusicas,
      }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
