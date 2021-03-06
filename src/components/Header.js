import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../Css/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      greetings: '',
    };
  }

  async componentDidMount() {
    const usuario = await getUser();
    this.setState({ greetings: usuario.name });
  }

  render() {
    const { greetings } = this.state;
    return (
      <header data-testid="header-component" className="header-component">
        <h1>TrybeTunes</h1>
        <div className="nomeNavegação">
          <nav>
            <Link
              to="/search"
              data-testid="link-to-search"
              className="link"
            >
              Search
            </Link>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
              className="link"
            >
              Favorites
            </Link>
            <Link
              to="/profile"
              data-testid="link-to-profile"
              className="link"
            >
              Profile

            </Link>
          </nav>
          {greetings === '' ? <Carregando />
            : <span><h3 data-testid="header-user-name">{ greetings }</h3></span>}
        </div>
      </header>
    );
  }
}

export default Header;
