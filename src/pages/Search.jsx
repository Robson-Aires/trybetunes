import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      ArtistName: '',
    };
  }

  handleChangeOfName = (event) => {
    this.setState({
      ArtistName: event.target.value,
    }, () => {
      const { ArtistName } = this.state;
      const lenghtArtistName = ArtistName.length;
      const NUMBER_OF_CHARACTERS = 2;
      if (lenghtArtistName >= NUMBER_OF_CHARACTERS) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ (event) => this.handleChangeOfName(event) }
          />
          <button type="button" disabled={ isDisabled }>Pesquisar</button>
        </form>
      </div>
    );
  }
}
