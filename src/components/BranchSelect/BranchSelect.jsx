import React from 'react';
import PropTypes from 'prop-types';
import File from '../File/File';
import './BranchSelect.css';
import branch from '../../assets/images/menu/branch.png';
import branch1 from '../../assets/images/menu/branch1.png';
import branch2 from '../../assets/images/menu/branch2.png';
import branch3 from '../../assets/images/menu/branch3.png';
import branchExit from '../../assets/images/menu/branch-exit.png';
import branchExit1 from '../../assets/images/menu/branch-exit1.png';
import branchExit2 from '../../assets/images/menu/branch-exit2.png';
import branchExit3 from '../../assets/images/menu/branch-exit3.png';
import connect from '../../assets/images/menu/connect.png';

function BranchSelect(props){
    let fileOne;
    let fileTwo;
    let fileThree;
    if (props.game.file == 1) {
        fileOne = <File number={props.game.file} saves={props.saves} game={props.game} relation={'current'}/>;
        fileTwo = <File number={props.game.file} saves={props.saves} game={props.game} relation={'new'}/>;
        fileThree = <File number={props.game.file} saves={props.saves} game={props.game} relation={'null'}/>;
    } else if (props.game.file == 2) {
        fileOne = <File number={props.game.file} saves={props.saves} game={props.game} relation={'null'}/>;
        fileTwo = <File number={props.game.file} saves={props.saves} game={props.game} relation={'current'}/>;
        fileThree = <File number={props.game.file} saves={props.saves} game={props.game} relation={'new'}/>;
    } else {
        fileOne = <File number={props.game.file} saves={props.saves} game={props.game} relation={'null'}/>;
        fileTwo = <File number={props.game.file} saves={props.saves} game={props.game} relation={'new'}/>;
        fileThree = <File number={props.game.file} saves={props.saves} game={props.game} relation={'current'}/>;
    };

  function isSelected(option) {
    if (props.menu.selectedOption == option) {
      return "selectedFile";
    } 
  }

  let branchEnter;
  let branchEx;
  if (props.game.file == 1) {
    branchEnter = <img id="branch" src={branch1} width="500" height="300"/>;
    branchEx = <img id="branch-exit" src={branchExit2} width="500" height="300"/>;
  } else if(props.game.file == 2) {
    branchEnter = <img id="branch" src={branch2} width="500" height="300"/>;
    branchEx = <img id="branch-exit" src={branchExit1} width="500" height="300"/>;
  } else {
    branchEnter = <img id="branch" src={branch3} width="500" height="300"/>;
    branchEx = <img id="branch-exit" src={branchExit2} width="500" height="300"/>;
  };


  function isSelected(option) {
    if (props.menu.selectedOption == option) {
      return "selected"
    };
  }

  function getPosition() {
    if(props.game.file == 1 || props.game.file == 2) {
      return "branch-connect-top"
    } else {
      return "branch-connect-bottom"
    };
  }

  return (
    <div className="select-wrap">
      <div className="selectScreen">
        {branchEnter}
        <img id={getPosition()} src={connect} width="300" height="100"/>
        {branchEx}
        <h2>Select a File</h2>
        <div id={isSelected(1)+'File'} className="file">
          {fileOne}
        </div>
        <div id={isSelected(2)+'File'} className="file">
          {fileTwo}
        </div>
        <div id={isSelected(3)+'File'} className="file">
          {fileThree} 
        </div>
        <div id={isSelected(4)}>
          <h3>DELETE FILE</h3>
        </div>
        <div id={isSelected(5)}>
          <h3>COPY FILE</h3>
        </div>
        <div id={isSelected(6)}>
          <h3>RETURN TO TITLE</h3>
        </div>
        <div>
          <h4><span className="button-prompt">Enter</span> / <span className="button-prompt">Space</span> : Confirm Selection</h4>
        </div>
      </div>
    </div>
  );
}

BranchSelect.propTypes = {
  menu: PropTypes.object.isRequired,
  player: PropTypes.object,
  game: PropTypes.object,
  saves: PropTypes.object
}

export default BranchSelect;