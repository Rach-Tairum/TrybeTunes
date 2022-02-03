import React from 'react';

class Carregando extends React.Component {
  render() {
    return (
      <div className="loading">
        <p>Carregando...</p>
        <img className="carrega" src="https://acegif.com/wp-content/uploads/loading-46.gif" alt="gif de carregamento" />
      </div>
    );
  }
}

export default Carregando;
