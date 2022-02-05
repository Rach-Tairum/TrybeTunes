import React from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Form from '../components/Form';
import { createUser } from '../services/userAPI';
import '../Css/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      nomeUsuario: '',
      buttonDisable: true,
      informacao: false,
      clicked: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      nomeUsuario: value,
    }, () => { this.ableButton(); });
  }

  ableButton = () => {
    const { nomeUsuario } = this.state;
    const minLength = 3;

    if (nomeUsuario.length >= minLength) {
      return this.setState({ buttonDisable: false });
    }
    return this.setState({ buttonDisable: true });
  }

  handleClick = async () => {
    const { nomeUsuario } = this.state;
    const obj = { name: nomeUsuario };
    this.setState({ clicked: true });
    await createUser(obj);
    this.setState({ clicked: false, informacao: true });
  }

  render() {
    const { nomeUsuario, buttonDisable, informacao, clicked } = this.state;

    return (
      <div data-testid="page-login">
        {informacao && <Redirect to="/search" /> }
        { clicked ? <Carregando /> : <Form
          value={ nomeUsuario }
          onChange={ this.handleChange }
          disable={ buttonDisable }
          onClick={ this.handleClick }
          id="usuario"
          texto="Entrar"
          dataId1="login-name-input"
          dataIdButton="login-submit-button"
        />}
      </div>
    );
  }
}

export default Login;
