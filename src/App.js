import React from 'react';
import Login from './pages/login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <>
        <Login />
        <Search />
        <Album />
        <Favorites />
        <Profile />
        <ProfileEdit />
        <NotFound />
      </>
    );
  }
}

export default App;
