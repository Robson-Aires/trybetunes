import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      artista: '',
      album: '',
      musicas: [],
    };
  }

  async componentDidMount() {
    await this.renderMusicApi();
  }

  renderMusicApi = async () => {
    const { match: { params } } = this.props;
    const music = await getMusics(params.id);
    this.setState({
      artista: music[0].artistName,
      album: music[0].collectionName,
      musicas: music,
    });
    console.log(music);
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
                key={ musica.trackId }
                trackName={ musica.trackName }
                previewUrl={ musica.previewUrl }
                trackId={ musica.trackId }
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
