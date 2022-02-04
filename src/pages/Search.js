import React from 'react';
import { Link } from 'react-router-dom';
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
      arrayAlbuns: [],
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
    this.setState({
      nomeArtista: '',
      clicked: false,
      disable: true,
      showArtists: true,
      arrayAlbuns: albuns });
  }

  render() {
    const {
      nomeArtista,
      disable,
      clicked,
      showArtists,
      resgataArtista,
      arrayAlbuns } = this.state;

    const texto = (
      <p>
        Resultado de álbuns de:
        {' '}
        { resgataArtista }
      </p>);

    return (
      <div data-testid="page-search">
        <Header />
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
        {clicked && <Carregando /> }
        {showArtists && texto}
        {showArtists && arrayAlbuns.length !== 0 && arrayAlbuns.map(
          ({ artistName, collectionName, artworkUrl100, trackCount, collectionId }) => (
            <section key={ collectionId }>
              <img
                src={ artworkUrl100 }
                alt={ `Capa do album ${collectionName} de ${artistName}` }
              />
              <p>{ collectionName }</p>
              <p>{ artistName }</p>
              <p>{ trackCount }</p>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                Veja o Album
              </Link>
            </section>),
        )}

        { showArtists && arrayAlbuns.length === 0
        && <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

export default Search;
