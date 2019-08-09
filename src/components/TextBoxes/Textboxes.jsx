import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Textboxes.css'

function TextBoxes(props) {
  return (
    <div id='wrap'>
      <div id='content'>
        {props.game.activeText}
      </div>
      <div id='content'>
        <p>Another Voice: What if I was also the voice?</p>
      </div>
      <div id='options'>
        <h5>[SPACE/RETURN]: Next [UP]: Log [SHIFT]: Skip</h5>
      </div>
    </div>
  );
}

TextBoxes.propTypes = {
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default connect()(TextBoxes);
