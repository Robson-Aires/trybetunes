import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const { collectionId, collectionName } = this.props;
    console.log(collectionId);
    console.log(collectionName);
    return (
      <div>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          { collectionName }
        </Link>
      </div>
    );
  }
}
Card.propTypes = {
  collectionId: PropTypes.string.isRequired,
  collectionName: PropTypes.number.isRequired,
};
