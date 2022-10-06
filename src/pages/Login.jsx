import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
// import Search from './Search';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      ArtistName: '',
      loading: false,
    };
  }

  handleChangeOfName = (event) => {
    this.setState({
      ArtistName: event.target.value,
    }, () => {
      const { ArtistName } = this.state;
      const lenghtArtistName = ArtistName.length;
      const NUMBER_OF_CHARACTERS = 3;
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

  xablau = async () => {
    const { ArtistName } = this.state;
    this.setState({ loading: true });
    const { history } = this.props;
    await createUser({ name: ArtistName });
    history.push('/search');
  };

  render() {
    const { isDisabled, ArtistName, loading } = this.state;
    return (
      <div>
        {loading ? (<p>Carregando...</p>) : (
          <div data-testid="page-login">
            <input
              value={ ArtistName }
              type="text"
              name="ArtistName"
              data-testid="login-name-input"
              onChange={ (event) => this.handleChangeOfName(event) }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isDisabled }
              onClick={ this.xablau }
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Login;
