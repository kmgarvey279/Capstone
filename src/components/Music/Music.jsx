import React from 'react';
import Sound from 'react-sound';
import PropTypes from 'prop-types';
import bmg1 from '../../assets/sound/music/AnttisInstrumentals.mp3';
import bmg2 from '../../assets/sound/music/dearDiary.mp3';

function Music(props){

  if (props.sounds.music == 'title'){
    return (
      <div>
       <Sound

        playStatus={Sound.status.PLAYING}/>
      </div>
    );
  } else {
    return (
      <div>

      </div>
    );
  }
}

Music.propTypes = {
  sounds: PropTypes.object,
}

export default Music;
