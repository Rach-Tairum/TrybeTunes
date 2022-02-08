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
      <fieldset>
        <div data-testid="page-login" className="loginPage">
          <h1>TrybeTunes</h1>
          <h3>Bem vindo a sua melhor forma de ouvir música!</h3>
          {informacao && <Redirect to="/search" /> }
          { clicked ? <Carregando /> : <Form
            value={ nomeUsuario }
            onChange={ this.handleChange }
            disable={ buttonDisable }
            onClick={ this.handleClick }
            id="usuario"
            texto="Entrar"
            textoLabel="Digite seu nome para login:"
            dataId1="login-name-input"
            dataIdButton="login-submit-button"
          />}
        </div>
      </fieldset>
    );
  }
}

export default Login;
