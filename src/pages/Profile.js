import React from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import Perfil from '../components/Perfil';
import { getUser } from '../services/userAPI';
import '../Css/Perfil_css.css';

class Profile extends React.Component {
  state = {
    loading: false,
    nome: '',
    email: '',
    imagem: '',
    descricao: '',
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const perfil = await getUser();
    const { name, email, image, description } = perfil;
    this.setState({
      nome: name,
      email,
      imagem: image,
      descricao: description,
      loading: false,
    });
  }

  render() {
    const { loading, nome, email, imagem, descricao } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h2 className="title large">Profile</h2>
        {loading ? <Carregando /> : <Perfil
          nome={ nome }
          email={ email }
          imagem={ imagem }
          descricao={ descricao }
        />}
      </div>
    );
  }
}

export default Profile;
