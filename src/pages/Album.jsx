import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      artista: '',
      album: '',
      musicas: [],
      // favoriteSongs: [],
    };
  }

  async componentDidMount() {
    await this.renderMusicApi();
    // const favoriteSongs = await getFavoriteSongs();
    this.setState({
      // favoriteSongs,
    });
  }

  renderMusicApi = async () => {
    const { match: { params } } = this.props;
    const music = await getMusics(params.id);
    this.setState({
      artista: music[0].artistName,
      album: music[0].collectionName,
      musicas: music,
    });
  };

  adicionarMusica = async (musica) => {
    await addSong(musica);
  };

  render() {
    const { artista, album, musicas } = this.state;
    return (
      <>
        <div data-testid="page-album">
          <Header />
        </div>
        <p data-testid="artist-name">{artista}</p>
        <p data-testid="album-name">{album}</p>
        {
          musicas
            .filter((music) => music.trackName)
            .map((musica) => (
              <MusicCard
                musica={ musica }
                key={ musica.trackId }
                trackName={ musica.trackName }
                previewUrl={ musica.previewUrl }
                trackId={ musica.trackId }
                adicionarMusica={ this.adicionarMusica }
                // favoriteSongs={ favoriteSongs }
              />
            ))
        }
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
