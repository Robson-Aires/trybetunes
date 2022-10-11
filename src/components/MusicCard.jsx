import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      // loading: false,
    };
  }

  som = async () => {
    await addSong();
  };

  render() {
    // const { loading } = this.state;
    const { previewUrl, trackName, trackId } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <form action="">
          <label htmlFor="Favorita" data-testid={ `checkbox-music-${trackId}` }>
            Favorita
            <input type="checkbox" name="" onClick={ console.log(this.som) } />
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
};
