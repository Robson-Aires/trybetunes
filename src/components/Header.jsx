import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    console.log(user);
    this.setState({
      userName: user.name,
      loading: true,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        { !loading ? (<p>Carregando...</p>)
          : (
            <>
              <nav>
                <Link to="/search" data-testid="link-to-search">Search </Link>
                <Link to="/favorites" data-testid="link-to-favorites"> Favorites</Link>
                <Link to="/profile" data-testid="link-to-profile"> Profile</Link>
                {/* <Link to="/Search" data-testid="link-to-search">pesquisa</Link> */}
              </nav>
              <p data-testid="header-user-name">{ userName }</p>
            </>
          )}
      </header>
    );
  }
}
