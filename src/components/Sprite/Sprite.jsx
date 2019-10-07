import React from 'react';
import PropTypes from 'prop-types';
import './Sprite.css';

function Sprite(props){
  let spriteClass;
  if (props.squareValue == 'boss') {
    spriteClass = 'boss-sprite';
  } else {
    spriteClass = 'sprite';
  };

  return (
      <div className={spriteClass} id={props.transition}>{props.sprite}</div>
  )
}

Sprite.propTypes = {
  sprite: PropTypes.string.object,
  transition: PropTypes.string,
  squareValue: PropTypes.string
};

export default Sprite;
