import React from 'react';
import Header from '../components/Header';
import Form from '../components/Form';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      nomeArtista: '',
      resgataArtista: '',
      disable: true,
      clicked: false,
      showArtists: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      nomeArtista: value,
    }, () => this.searchButtonAble());
  }

  searchButtonAble = () => {
    const { nomeArtista } = this.state;
    const minLength = 2;

    if (nomeArtista.length >= minLength) {
      return this.setState({ disable: false });
    }
    return this.setState({ disable: true });
  }

  handleClick = async () => {
    const { nomeArtista } = this.state;
    this.setState({ clicked: true, resgataArtista: nomeArtista });
    const albuns = await searchAlbumsAPI(nomeArtista);
    this.setState({ nomeArtista: '', clicked: false, disable: true, showArtists: true });
    // if (albuns === []) {
    //   return <p>Nenhum álbum foi encontrado</p>;
    // }
    console.log(albuns);
  }

  render() {
    const { nomeArtista, disable, clicked, showArtists, resgataArtista } = this.state;
    const texto = (
      <p>
        Resultado de álbuns de:
        { resgataArtista }
      </p>);

    return (
      <div data-testid="page-search">
        <Header />
        {clicked && <Carregando /> }
        <Form
          value={ nomeArtista }
          onChange={ this.handleChange }
          disable={ disable }
          onClick={ this.handleClick }
          id="usuario"
          texto="Pesquisar"
          dataId1="search-artist-input"
          dataIdButton="search-artist-button"
        />
        {showArtists && texto }
      </div>
    );
  }
}

export default Search;
