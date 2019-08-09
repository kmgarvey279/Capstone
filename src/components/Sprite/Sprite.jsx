import React from 'react';
import PropTypes from 'prop-types';
import './Sprite.css';

function Sprite(props){
  if (props.transition == 'northEnter') {
    return (
      <div id="northEnter">
        <div id="sprite">{props.sprite}</div>
      </div>
    )
  } else if (props.transition == 'northExit') {
    return (
      <div id="northExit">
        <div id="sprite">{props.sprite}</div>
      </div>
    )
  } else if (props.transition == 'eastEnter') {
    return (
      <div id="eastEnter">
        <div id="sprite">{props.sprite}</div>
      </div>
    )
  } else if (props.transition == 'eastExit') {
    return (
      <div id="eastExit">
        <div id="sprite">{props.sprite}</div>
      </div>
    )
  } else if (props.transition == 'southEnter') {
    return (
      <div id="southEnter">
        <div id="sprite">{props.sprite}</div>
      </div>
    )
  } else if (props.transition == 'southExit') {
    return (
      <div id="southExit">
        <div id="sprite">{props.sprite}</div>
      </div>
    )
  } else if (props.transition == 'westEnter') {
    return (
      <div id="westEnter">
        <div id="sprite">{props.sprite}</div>
      </div>
    )
  } else if (props.transition == 'westExit') {
    return (
      <div id="westExit">
        <div id="sprite">{props.sprite}</div>
      </div>
    )
  } else if (props.transition == 'fall') {
    return (
      <div id="fall">
        <div id="sprite">{props.sprite}</div>
      </div>
    )
  } else {
    return (
      <div>
        <div id="sprite">{props.sprite}</div>
      </div>
    )
  }
}

Sprite.propTypes = {
  sprite: PropTypes.string.object,
  transition: PropTypes.string,
};

export default Sprite;
