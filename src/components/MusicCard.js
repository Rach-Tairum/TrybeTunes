import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import Card from './Card';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteMusic: {},
      isLoading: false,
    };
  }

  favoriteSong = ({ target }) => {
    const { name, checked } = target;

    this.setState((prevState) => (
      { favoriteMusic: { ...prevState.favoriteMusic, [name]: checked } }),
    () => this.criandoObj());
  }

  criandoObj = () => {
    const { musicsAlbum } = this.props;
    const { favoriteMusic } = this.state;
    const favSongs = Object.values(favoriteMusic);
    const musicaKeys = Object.keys(favoriteMusic);

    const criaArray = musicaKeys.map(
      (elemento, index) => ({ [elemento]: favSongs[index] }),
    );

    const saoTrue = criaArray.filter(
      (element, index) => element[musicaKeys[index]] === true,
    );

    const music = saoTrue.map((musica) => Object.keys(musica));

    const ultimaChance = music.map((atLast) => atLast[0]);

    const favorita = [];

    for (let index = 0; index < ultimaChance.length; index += 1) {
      for (let i = 0; i < musicsAlbum.length; i += 1) {
        if (ultimaChance[index] === musicsAlbum[i].trackName) {
          favorita.push(musicsAlbum[i]);
        }
      }
    }
    favorita.forEach((song) => this.adicionaMusica(song));
  }

  adicionaMusica = async (song) => {
    this.setState({ isLoading: true });
    await addSong(song);
    this.setState({ isLoading: false });
  }

  render() {
    const { musicsAlbum } = this.props;
    const { favoriteMusic, isLoading } = this.state;
    return (
      <div>
        {isLoading ? <Carregando /> : <Card
          musics={ musicsAlbum }
          checked={ favoriteMusic }
          onChange={ this.favoriteSong }
        />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicsAlbum: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default MusicCard;
