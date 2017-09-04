import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Player = (props) => {
  if (props.player) {
    return <div>Sorry, but the player was not found</div>;
  }
  return (
    <div>
      player
      <Link to="/roster">Back</Link>
    </div>
  );
};

Player.propTypes = {
  player: PropTypes.object,
};

Player.defaultProps = {
  player: {
    fuck: true,
  },
};

export default Player;
