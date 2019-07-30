import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function GameUIBottom(props) {
  return (
    <div>

    </div>
  );
}

GameUIBottom.propTypes = {
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default connect()(GameUIBottom);
