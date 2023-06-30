import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import {
  Header,
  SearchForm,
  SerarchBtn,
  SearchBtnLabel,
  SearchInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSearchSubmit: PropTypes.func.isRequired,
  };

  state = { searchValue: '' };

  // зміна пошуку
  handleQueryChange = event => {
    this.setState({
      searchValue: event.currentTarget.value.toLowerCase(),
    });
  };
  // функція пошуку
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSearchSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <Header onSubmit={this.handleSubmit}>
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
            value={this.state.searchValue}
            onChange={this.handleQueryChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
