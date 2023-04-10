import React from 'react';
import * as s from './styledSearchBar';
import {shadow, icons} from '../../assets';

const SearchBar = ({value, setValue}) => {
  return (
    <s.SearchContainer>
      <s.Wrapper style={shadow}>
        <s.SearchInput
          value={value}
          placeholder="Procurar música"
          onChangeText={text => setValue(text.replace(/\s+/g, ' '))}
        />
        <s.Icon source={icons.bloom} />
      </s.Wrapper>
    </s.SearchContainer>
  );
};

export default SearchBar;
