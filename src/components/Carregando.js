import React from 'react';
import '../Css/Carregando.css';

class Carregando extends React.Component {
  render() {
    return (
      <div className="loading">
        <p>Carregando...</p>
        <img className="carrega" src="https://static.wixstatic.com/media/7e40c7_19f6afee5f6f416b911df607c91aed86~mv2.gif" alt="gif de carregamento" />
      </div>
    );
  }
}

export default Carregando;
