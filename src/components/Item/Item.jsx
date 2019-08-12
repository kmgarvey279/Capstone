import * as itemConsts from '../../redux/modules/rooms/itemConstants';
import React from 'react';
import PropTypes from 'prop-types';
import './Item.css';

function Item(props){
  let itemArr = props.content.find(function(content) {
    return content[0] == 'item' || content[0] == 'weapon';
  });
  return (
    <div id="item">
      {itemConsts.sprites[itemArr[1]]}
    </div>
  )
}

Item.propTypes = {
  content: PropTypes.array
};

export default Item;
