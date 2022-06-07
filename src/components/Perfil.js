import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Css/Perfil_css.css';

class Perfil extends React.Component {
  render() {
    const { nome, email, imagem, descricao } = this.props;
    return (
      <div>
        <img
          className="profilePicture"
          data-testid="profile-image"
          src={ imagem }
          alt="Sua foto de perfil"
        />
        <span>
          <h3 className="title subtitle">Nome:</h3>
          <p>{nome}</p>
        </span>
        <span>
          <h3 className="title subtitle">E-mail:</h3>
          <p>{email}</p>
        </span>
        <span>
          <h3 className="title subtitle">Descrição:</h3>
          <article>{descricao}</article>
        </span>
        <Link className="link" to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

Perfil.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  imagem: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
};

export default Perfil;
