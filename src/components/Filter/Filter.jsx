import React from 'react';
import PropTypes from 'prop-types';
import './Filter.css';

function Filter(props){
    return (
      <div id="fire">
        <div id="fireAnimate">
        </div>
      </div>
    )
  }


Filter.propTypes = {
  filter: PropTypes.string
};

export default Filter;