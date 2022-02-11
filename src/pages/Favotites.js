import React from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../Css/Favoritas.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayFavoritas: [],
      isLoading: false,
      favoriteMusic: {},
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const musicasFavoritas = await getFavoriteSongs();

    const objMusicasTrue = musicasFavoritas.reduce(
      (acc, elemento) => ({ ...acc, [elemento.trackName]: true }), {},
    );

    this.setState({
      arrayFavoritas: musicasFavoritas,
      isLoading: false,
      favoriteMusic: objMusicasTrue,
    });
  }

  removeMusica = ({ target }) => {
    const { name, checked } = target;

    this.setState((prevState) => (
      { favoriteMusic: { ...prevState.favoriteMusic, [name]: checked } }),
    () => this.atualizaLista(name));
  }

  async atualizaLista(name) {
    const { arrayFavoritas } = this.state;
    const musicaFalsa = arrayFavoritas.filter((musica) => musica.trackName === name);

    this.setState({ isLoading: true });

    await removeSong(musicaFalsa[0]);
    const musicasPosRemocao = await getFavoriteSongs();
    const objMusicasTrueNovo = musicasPosRemocao.reduce(
      (acc, elemento) => ({ ...acc, [elemento.trackName]: true }), {},
    );

    this.setState({ isLoading: false,
      arrayFavoritas: musicasPosRemocao,
      favoriteMusic: objMusicasTrueNovo });
  }

  render() {
    const { isLoading, arrayFavoritas, favoriteMusic } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="page">
          <h2 className="titulo-secao">Músicas Favoritadas</h2>
          {isLoading ? <Carregando /> : <MusicCard
            musicsAlbum={ arrayFavoritas }
            onChange={ this.removeMusica }
            isLoading={ isLoading }
            favoriteMusic={ favoriteMusic }
          />}
        </div>
      </div>
    );
  }
}

export default Favorites;
