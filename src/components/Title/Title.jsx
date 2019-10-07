import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import './Title.css';
import * as soundsModule from '../../redux/modules/sounds';

class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(soundsModule.changeEffect('title'));
  }
  
  render() {
    return (
      <div className="title">
          <h1>CRYOSTAT</h1>
          <h5>Press <span className="button-prompt">Space</span> / <span className="button-prompt">Enter</span> to Start</h5>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    soundsModule : bindActionCreators(soundsModule, dispatch)
  }
};

export default connect(mapDispatchToProps)(Title);
