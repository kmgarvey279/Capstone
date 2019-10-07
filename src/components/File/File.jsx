import React from 'react';
import PropTypes from 'prop-types';
import './File.css';

function File(props){
  let fileInfo;
  if(props.relation == 'normal') {
    if(props.saves[props.number].status === 'empty') {
      fileInfo = <div>File {props.number} - New Game - Time: 0:00</div>;
    } else {
      fileInfo = <div>File {props.number} {props.saves[props.number].player.name} - Time: 5:24 <div>Branch: 19374219<span id="branch-difference">42</span></div></div>;
    };
  } else if (props.relation == 'current') {
    fileInfo = <div>File {props.number} - Abandoned Game - Time: 5:29 <div>Branch: 19374219<span id="branch-difference">42</span></div></div>
  } else if (props.relation == 'new') {
    fileInfo = <div>File {props.number} {props.saves[props.number].player.name} - Time: 0:00 <div>Branch: 19374219<span id="branch-difference">23</span></div></div>;
  };

    if (props.saves[props.number].status == 'active' || props.relation == 'next') {
      return (
        <div className='activeFile'>
            {fileInfo}
        </div>
      );
    } else if (props.relation == 'current') {
      return (
        <div className='previousFile'>
            {fileInfo}
        </div>
      );
    } else if (props.saves[props.number].status == 'empty' || props.relation == 'null') {
        return (
            <div className='undefinedFile'>
                {fileInfo}
            </div>
        );
    } else {
      return (
        <div>
            {fileInfo}
        </div>
    );
    }
  };
  
  File.propTypes = {
    saves: PropTypes.object,
    number: PropTypes.string,
    game: PropTypes.string,
    relation: PropTypes.string
  }
  
  export default File;
  