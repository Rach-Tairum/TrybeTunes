import React from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import PerfilPessoal from '../components/PerfilPessoal';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      finalizouPerfil: false,
      nome: '',
      email: '',
      imagem: '',
      descricao: '',
      disable: true,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const nomePerfil = await getUser();
    this.setState({
      nome: nomePerfil.name,
      email: nomePerfil.email,
      imagem: nomePerfil.image,
      descricao: nomePerfil.description,
      loading: false });
    this.saveAble(); // Verificação necessária porque o teste recarrega a página e espera q o botão com as informações vindas do storage esteja habilitado!
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.saveAble(); });
  }

  saveAble = () => {
    const { nome, email, imagem, descricao } = this.state;
    const emailArroba = email.split('');
    if (!emailArroba.includes('@')
    || nome === ''
    || email === ''
    || imagem === ''
    || descricao === '') {
      this.setState({ disable: true });
    } else {
      this.setState({ disable: false });
    }
  }

  handleClick = async () => {
    const { nome, email, imagem, descricao } = this.state;
    const objPerfil = { name: nome, email, image: imagem, description: descricao };
    this.setState({ loading: true });
    await updateUser(objPerfil);
    this.setState({ loading: false, finalizouPerfil: true });
  }

  render() {
    const {
      loading,
      nome,
      email,
      imagem,
      descricao,
      disable,
      finalizouPerfil } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <p>Profile Edit</p>
        {finalizouPerfil && <Redirect exact to="/profile" /> }
        {loading ? <Carregando /> : <PerfilPessoal
          nome={ nome }
          email={ email }
          imagem={ imagem }
          descricao={ descricao }
          onChange={ this.handleChange }
          onClick={ this.handleClick }
          disable={ disable }
        />}
      </div>
    );
  }
}

export default ProfileEdit;
