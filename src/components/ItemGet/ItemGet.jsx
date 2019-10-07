import * as itemConsts from '../../redux/modules/rooms/itemConstants';
import React from 'react';
import PropTypes from 'prop-types';
import './ItemGet.css';
import * as text from '../../redux/modules/text/textConstants';
import * as items from '../../redux/modules/rooms/itemConstants';

function ItemGet(props){
  let description = text.flavorText[props.newItem]
  return (
    <div id="wrap">
      <div id="content">
        <div id="header">{description[0]}</div>
        <div id="item-icon">{items.sprites[props.newItem]}</div>
        <span id="item-text">{description[1]}</span>
      </div>
    </div>
  )
}

ItemGet.propTypes = {
  newItem: PropTypes.string
};

export default ItemGet;
