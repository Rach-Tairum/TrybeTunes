import React from 'react';
import PropTypes from 'prop-types';

class PerfilPessoal extends React.Component {
  render() {
    const { nome, email, imagem, descricao, onChange, onClick, disable } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="nome">
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

          <label htmlFor="email">
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
          <label htmlFor="descricao">
            Descrição:
            <textarea
              data-testid="edit-input-description"
              id="descricao"
              value={ descricao }
              name="descricao"
              onChange={ onChange }
            />
          </label>
          <label htmlFor="imagem">
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
