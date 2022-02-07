import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import Card from './Card';

class MusicCard extends React.Component {
  render() {
    const { musicsAlbum, onChange, favoriteMusic, isLoading } = this.props;
    return (
      <div>
        {isLoading ? <Carregando /> : <Card
          musics={ musicsAlbum }
          checked={ favoriteMusic }
          onChange={ onChange }
        />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicsAlbum: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onChange: PropTypes.func.isRequired,
  favoriteMusic: PropTypes.objectOf(PropTypes.bool).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default MusicCard;
