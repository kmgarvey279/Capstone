import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function GameUIBottom(props) {
  return (
    <div id='wrap'>
      <style jsx>{`
        div#wrap {
          position: fixed;
          z-index: 2000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          padding-top: 10%;
          overflow: auto;
          background-color: rgb(0,0,0);
          background-color: rgba(0,0,0,0.4);
        }
        div#content {
          background-color: #fefefe;
          margin: 10% auto;
          padding: 20px;
          border: 3px solid #888;
          width: 50%;
        }
        div#options {
          width: 50%;
          color: white;
          padding-top: 20%;
        }
      `}</style>
      <div id='content'>
        <p>Voice: I am the voice. I say the things.</p>
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

GameUIBottom.propTypes = {
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default connect()(GameUIBottom);
