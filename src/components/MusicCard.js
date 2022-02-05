import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import Card from './Card';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteMusic: {},
      isLoading: false,
    };
  }

  async componentDidMount() {
    // capta as músicas que estão no localstorage
    const musicasSalvas = await getFavoriteSongs();

    // transforma aquele objeto que veio com todos os dados do album em uma chave com o nome da música e valor true.
    // Ou seja, aquela já é uma música favoria e recarrega a página como marcado
    const objMusicasTrue = musicasSalvas.reduce(
      (acc, elemento) => ({ ...acc, [elemento.trackName]: true }), {},
    );
      // coloca o objeto criado em favorite music assim ao final do carregamento da página, depois q o html e todos os estados foram criados,
      // ele atualiza o estado do objeto com as músicas que já são favoritas.
    this.setState({ favoriteMusic: objMusicasTrue });
  }

  favoriteSong = ({ target }) => {
    // Pego o nome da música e se o check do checkbox é verdadeiro ou falso
    const { name, checked } = target;

    this.setState((prevState) => (
      // Cria um objeto com o nome da música e se o check foi verdadeiro (quando o check sai esse valor fica falso), é específico pra cada check realizado
      // como chamo ele no input checked, cada música em especifico fica com checkd ou não, de acordo com favorite music.
      { favoriteMusic: { ...prevState.favoriteMusic, [name]: checked } }),
    // função que após favorite music possuir algum valor.
    () => this.criandoObj());
  }

  criandoObj = () => {
    // musicsAlbum é um array de objetos do album
    const { musicsAlbum } = this.props;
    // é o objeto com as músicas que ja foram clicadas como favoritas
    const { favoriteMusic } = this.state;
    // pega todos os valores de favorite songs e coloca em um array
    const favSongs = Object.values(favoriteMusic);
    // pega todas as chaves de favorite songs e coloca em um array
    const musicaKeys = Object.keys(favoriteMusic);

    // transforma favorite songs em um arraay de objetos
    const criaArray = musicaKeys.map(
      (elemento, index) => ({ [elemento]: favSongs[index] }),
    );

    // pega todos os objetos que tem como valor true. Gerando um array de objetos.
    // Pq quando vc desmarca uma música favorita, ela passa a ter o valor false dentro do seu objeto favorite música, por consequencia no array criado com ele
    const saoTrue = criaArray.filter(
      (element, index) => element[musicaKeys[index]] === true,
    );

    // pega os nomes de todas as músicas gerando um array de arrays com os nomes das músicas
    const music = saoTrue.map((musica) => Object.keys(musica));

    // forma um array com os nomes das músicas verdadeiramente marcadas como favoritas
    const ultimaChance = music.map((atLast) => atLast[0]);

    const favorita = [];
    const todas = [];
    // Pega todas as músicas que estão no objeto favorite songs e cria um array de objetos com os dados vindos do album.
    for (let index = 0; index < musicaKeys.length; index += 1) {
      for (let i = 0; i < musicsAlbum.length; i += 1) {
        if (musicaKeys[index] === musicsAlbum[i].trackName) {
          todas.push(musicsAlbum[i]);
        }
      }
    }

    // pega as músicas verdadeiramente favoritas e cria um array com os dados delas presentes no album
    for (let index = 0; index < ultimaChance.length; index += 1) {
      for (let i = 0; i < musicsAlbum.length; i += 1) {
        if (ultimaChance[index] === musicsAlbum[i].trackName) {
          favorita.push(musicsAlbum[i]);
        }
      }
    }
    // remove todas as músicas que estão no local storage
    todas.forEach((obj) => this.removeMusica(obj));
    // adiciona no local storage somente as músicas verdadeiramente favoritas.
    // Se alguma música for removida de favoritas, a limpeza das músicas do localstorage não permite que essa música se mantenha após a atualização da página.
    favorita.forEach((song) => this.adicionaMusica(song));
  }

  removeMusica = async (musica) => {
    this.setState({ isLoading: true });
    await removeSong(musica);
    this.setState({ isLoading: false });
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
