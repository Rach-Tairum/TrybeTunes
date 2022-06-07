import React from 'react';
import PropTypes from 'prop-types';
import '../Css/PerfilEdit.css';

class PerfilPessoal extends React.Component {
  render() {
    const { nome, email, imagem, descricao, onChange, onClick, disable } = this.props;
    return (
      <div>
        <form className="formsPerfil">
          <label htmlFor="nome" className="title subtitle distance">
            Nome:
            <input
              id="nome"
              type="text"
              data-testid="edit-input-name"
              value={ nome }
              name="nome"
              onChange={ onChange }
            />
          </label>

          <label htmlFor="email" className="title subtitle distance">
            E-mail:
            <input
              type="email"
              id="email"
              data-testid="edit-input-email"
              value={ email }
              name="email"
              onChange={ onChange }
            />
          </label>
          <label htmlFor="descricao" className="title subtitle distance">
            Descrição:
            <textarea
              data-testid="edit-input-description"
              id="descricao"
              value={ descricao }
              name="descricao"
              onChange={ onChange }
            />
          </label>
          <label htmlFor="imagem" className="title subtitle distance">
            Imagem de Perfil:
            <input
              type="text"
              id="imagem"
              data-testid="edit-input-image"
              value={ imagem }
              name="imagem"
              onChange={ onChange }
            />
          </label>
          <button
            type="button"
            data-testid="edit-button-save"
            onClick={ onClick }
            disabled={ disable }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

PerfilPessoal.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  imagem: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
};

export default PerfilPessoal;
