import React from 'react';
import Header from '../components/Header';
import Form from '../components/Form';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      nomeArtista: '',
      disable: true,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ nomeArtista: value }, () => this.searchButtonAble());
  }

  searchButtonAble = () => {
    const { nomeArtista } = this.state;
    const minLength = 2;

    if (nomeArtista.length >= minLength) {
      return this.setState({ disable: false });
    }
    return this.setState({ disable: true });
  }

  render() {
    const { nomeArtista, disable } = this.state;
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
      </div>
    );
  }
}

export default Search;
