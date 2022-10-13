import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from '../components/Card';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      ArtistName: '',
      data: [],
      query: '',
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

  searchAlbums = async () => {
    const { ArtistName } = this.state;

    const pesquisaArtista = await searchAlbumsAPI(ArtistName);
    console.log(pesquisaArtista);
    this.setState({
      data: pesquisaArtista,
      query: ArtistName,
      ArtistName: '',
    });
  };

  render() {
    const { isDisabled, ArtistName, data, query } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="ArtistName"
            value={ ArtistName }
            data-testid="search-artist-input"
            onChange={ (event) => this.handleChangeOfName(event) }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            onClick={ this.searchAlbums }
          >
            Pesquisar
          </button>
        </form>
        {
          data.length > 0 && <p>{`Resultado de álbuns de: ${query}`}</p>
        }
        {
          data.length > 0
            ? (data.map((album) => (
              <Card
                key={ album.collectionId }
                collectionName={ album.collectionName }
                collectionId={ album.collectionId }
              />
            ))
            )
            : (<p>Nenhum álbum foi encontrado</p>)
        }
      </div>
    );
  }
}
