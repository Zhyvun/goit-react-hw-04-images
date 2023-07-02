// import React, { Component } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { toastConfig } from 'components/UI/toastify';
import {
  Header,
  SearchForm,
  SerarchBtn,
  SearchBtnLabel,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSearchSubmit }) => {
  const [searchValue, setValue] = useState('');

  // зміна пошуку
  const handleQueryChange = event =>
    setValue(
      event.currentTarget.value.toLowerCase(),
    );

  // функція пошуку
  const handleSubmit = event => {
    event.preventDefault();

    if (searchValue.trim() === '') {
      toast.error('ШО? ПРОБІЛ ЗАЛІП ? ....Почисть клаву 😜', toastConfig);
      return;
    }
    onSearchSubmit(searchValue);
    setValue('');
  };

  return (
    <Header onSubmit={handleSubmit}>
      <SearchForm>
        <SerarchBtn type='submit'>
          <FcSearch style={{ width: 30, height: 30 }} />
          <SearchBtnLabel>Search</SearchBtnLabel>
        </SerarchBtn>

        <SearchInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleQueryChange}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};

//CLASS

/*
export class Searchbar extends Component {
  static propTypes = {
    onSearchSubmit: PropTypes.func.isRequired,
  };

  state = { searchValue: '' };

  // зміна пошуку
  handleQueryChange = event => {
    setState({
      searchValue: event.currentTarget.value.toLowerCase(),
    });
  };
  // функція пошуку
  handleSubmit = event => {
    event.preventDefault();
    props.onSearchSubmit(state.searchValue);
    setState({ searchValue: '' });
  };

  render() {
    return (
      <Header onSubmit={handleSubmit}>
        <SearchForm>
          <SerarchBtn>
            <FcSearch style={{ width: 30, height: 30 }} />
            <SearchBtnLabel>Search</SearchBtnLabel>
          </SerarchBtn>

          <SearchInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={state.searchValue}
            onChange={handleQueryChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
*/
