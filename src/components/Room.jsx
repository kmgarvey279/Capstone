import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Room(props){
  if (props.roomId < 0) {
    return (
      <div>
        <style jsx>{`
          margin: 5px;
          background-color: black;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          max-width: 105px;
          min-width: 105px;
          max-height: 105px;
          min-height: 105px;
          vertical-align: top;
          display: inline-block;
          z-index 2000;
          color: white;
        `}</style>
        {props.roomId}
      </div>
    )
  } else if (props.current == props.roomId) {
    return (
      <div>
        <style jsx>{`
          margin: 5px;
          background-color: lightblue;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          max-width: 105px;
          min-width: 105px;
          max-height: 105px;
          min-height: 105px;
          vertical-align: top;
          display: inline-block;
          z-index 2000;
        `}</style>
        {props.roomId}
      </div>
    )
  } else {
    return (
      <div>
        <style jsx>{`
          margin: 5px;
          background-color: blue;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          max-width: 105px;
          min-width: 105px;
          max-height: 105px;
          min-height: 105px;
          vertical-align: top;
          display: inline-block;
          z-index 2000;
        `}</style>
        {props.roomId}
      </div>
    )
  }
}

Room.propTypes = {
  roomId: PropTypes.number.isRequired,
  visited: PropTypes.bool.isRequired,
  current: PropTypes.number.isRequired
};

export default Room;
