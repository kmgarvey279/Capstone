import React from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';
import * as soundsModule from '../../redux/modules/sounds';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import doorLocked from '../../assets/sound/sfx/Error or failed.mp3';
import select from '../../assets/sound/sfx/menuClick.wav';
import doorOpen from '../../assets/sound/sfx/generic_sounds/doorOpen.wav';

class SFX extends React.Component {
  constructor(props) {
    super(props);
    this.handleClearSFX = this.handleClearSFX.bind(this);
  }

  handleClearSFX(){
    this.props.dispatch(soundsModule.changeEffect(''));
  }
  render() {
    if (this.props.sounds.effect == 'select') {
      return (
        <div>
         <Sound
          url={select}
          onFinishedPlaying={this.handleClearSFX}
          playStatus={Sound.status.PLAYING}/>
        </div>
      );
    } else if (this.props.sounds.effect == 'doorOpen') {
      return (
        <div>
         <Sound
          url={doorOpen}
          onFinishedPlaying={this.handleClearSFX}
          playStatus={Sound.status.PLAYING}/>
        </div>
      );
    } else if (this.props.sounds.effect == 'doorLocked') {
      return (
        <div>
         <Sound
          url={doorLocked}
          onFinishedPlaying={this.handleClearSFX}
          playStatus={Sound.status.PLAYING}/>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

SFX.propTypes = {
  sounds: PropTypes.object,
}

function mapDispatchToProps(dispatch) {
  return {
    soundsModule : bindActionCreators(soundsModule, dispatch)
  }
};

export default (connect(mapDispatchToProps)(SFX));
