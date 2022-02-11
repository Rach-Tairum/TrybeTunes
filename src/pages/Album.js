import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import '../Css/Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtists: '',
      albumName: '',
      musics: [],
      favoriteMusic: {},
      isLoading: false,

    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const musicas = await getMusics(id);
    const { artistName, collectionName } = musicas[0];
    this.setState({
      nameArtists: artistName,
      albumName: collectionName,
    });
    const musicasTodas = musicas.slice(1);
    this.setState({ musics: musicasTodas });

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
    // musicsAlbum é um array de objetos do album é o objeto com as músicas que ja foram clicadas como favoritas
    const { musics, favoriteMusic } = this.state;

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
      for (let i = 0; i < musics.length; i += 1) {
        if (musicaKeys[index] === musics[i].trackName) {
          todas.push(musics[i]);
        }
      }
    }

    // pega as músicas verdadeiramente favoritas e cria um array com os dados delas presentes no album
    for (let index = 0; index < ultimaChance.length; index += 1) {
      for (let i = 0; i < musics.length; i += 1) {
        if (ultimaChance[index] === musics[i].trackName) {
          favorita.push(musics[i]);
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
    const { nameArtists, albumName, musics, isLoading, favoriteMusic } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="nome-musicas">
          <section className="artist">
            <h2 data-testid="artist-name">{ nameArtists }</h2>
            <h4 data-testid="album-name">{ albumName }</h4>
          </section>
          <section>
            <MusicCard
              musicsAlbum={ musics }
              onChange={ this.favoriteSong }
              isLoading={ isLoading }
              favoriteMusic={ favoriteMusic }
            />
          </section>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default Album;
