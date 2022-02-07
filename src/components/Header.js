import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      greetings: '',
    };
  }

  async componentDidMount() {
    const usuario = await getUser();
    this.setState({ greetings: `Olá ${usuario.name}` });
  }

  render() {
    const { greetings } = this.state;
    return (
      <header data-testid="header-component" className="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search"> Search </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
          <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
        </nav>
        {greetings === '' ? <Carregando />
          : <h3 data-testid="header-user-name">{ greetings }</h3>}

      </header>
    );
  }
}

export default Header;
