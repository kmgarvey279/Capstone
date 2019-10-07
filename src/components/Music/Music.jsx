import React from 'react';
import Sound from 'react-sound';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as soundsModule from '../../redux/modules/sounds';
import {bindActionCreators} from 'redux';
import tracks from '../../assets/sound/music';

class Music extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let track = tracks[this.props.sounds.music];
    return (
      <div>
       <Sound
        url={track}
        loop={true}
        playStatus={Sound.status.PLAYING}/>
      </div>
    );
  }
}

Music.propTypes = {
  sounds: PropTypes.object,
}

function mapDispatchToProps(dispatch) {
  return {
    soundsModule : bindActionCreators(soundsModule, dispatch)
  }
};

export default (connect(mapDispatchToProps)(Music));
