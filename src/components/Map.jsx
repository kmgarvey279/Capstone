import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Map(props) {
  return (
    <div>
      <style jsx>{`
        div {
          background-color : blue;
          position: absolute;
          width: 400px;
          height: 400px;
          text-align: center;
          z-index: 10;
        }
      `}</style>
        THE MAP
    </div>
  );
}

Map.propTypes = {
  game: PropTypes.object.isRequired
};

export default connect()(Map);
