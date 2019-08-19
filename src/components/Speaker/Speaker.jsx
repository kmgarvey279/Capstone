import React from 'react';
import PropTypes from 'prop-types';
import './Speaker.css';

function Speaker(props){
  return (
    <div id="speaker">
      {props.speaker}
    </div>
  )
}

Speaker.propTypes = {
  speaker: PropTypes.string
};

export default Speaker;
