import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const {
      value,
      onChange,
      disable,
      onClick,
      id,
      texto,
      textoLabel,
      dataId1,
      dataIdButton } = this.props;
    return (
      <form className="login">
        <div className="inputValue">
          <label htmlFor={ id }>
            {textoLabel}
            {' '}
            <input
              name="nomeUsuario"
              value={ value }
              type="text"
              data-testid={ dataId1 }
              onChange={ onChange }
              id={ id }
            />
          </label>
        </div>
        <button
          type="button"
          data-testid={ dataIdButton }
          disabled={ disable }
          onClick={ onClick }
        >
          {texto}
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  value: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  texto: PropTypes.string.isRequired,
  textoLabel: PropTypes.string.isRequired,
  dataId1: PropTypes.string.isRequired,
  dataIdButton: PropTypes.string.isRequired,
};

export default Form;
