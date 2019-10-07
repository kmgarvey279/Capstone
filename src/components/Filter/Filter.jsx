import React from 'react';
import PropTypes from 'prop-types';
import './Filter.css';

function Filter(props){
if (props.branch == 3) {
    return (
      <div id="spooky">
        <div id="spookyAnimate">
        </div>
      </div>
    )
  } else {
    return null;
  }
}


Filter.propTypes = {
  branch: PropTypes.number
};

export default Filter;