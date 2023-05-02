import React from 'react';
import * as s from './styledSearchBar';
import {shadow, icons} from '../../../assets';
import {Controller} from 'react-hook-form';

const SearchBar = ({control}) => {
  return (
    <s.SearchContainer>
      <s.Wrapper style={shadow}>
        <Controller
          name="search"
          control={control}
          render={({field: {value, onChange}}) => (
            <s.SearchInput
              value={value}
              placeholder="Procurar música"
              onChangeText={text => onChange(text.replace(/\s+/g, ' '))}
            />
          )}
        />
        <s.Icon source={icons.bloom} />
      </s.Wrapper>
    </s.SearchContainer>
  );
};

export default SearchBar;
