import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      isLoading: false,
      // favoriteSongs: [],
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    // this.setState({
    //   favoriteSongs,
    // });
    console.log(favoriteSongs);
    if (favoriteSongs.map((song) => Number(song.trackId)).includes(Number(trackId))) {
      this.setState({
        isChecked: true,
      });
    } else {
      this.setState({
        isChecked: false,
      });
    }
    // console.log(Number(trackId));
    // console.log(favoriteSongs.map((song) => song.trackId));
    // console.log(favoriteSongs);
  }

  handleChange = async ({ target: { name, checked } }, musica) => {
    this.setState({
      [name]: checked,
      isLoading: true,
    });

    await addSong(musica);
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { isChecked, isLoading } = this.state;

    const {
      previewUrl,
      trackName,
      trackId,
      // adicionarMusica,
      musica,
      // favoriteSongs,
    } = this.props;
    return (
      <div>
        { isLoading && <div>Carregando...</div> }
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <form>
          <label htmlFor="Favorita">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              onChange={ (event) => this.handleChange(event, musica) }
              value={ isChecked }
              name="isChecked"
            />
          </label>
        </form>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musica: PropTypes.shape({
    musica: PropTypes.func,
  }).isRequired,
};
