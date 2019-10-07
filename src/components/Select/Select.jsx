import React from 'react';
import PropTypes from 'prop-types';
import File from '../File/File';
import './Select.css';
import branch from '../../assets/images/menu/branch.png';
import branch1 from '../../assets/images/menu/branch1.png';
import branch2 from '../../assets/images/menu/branch2.png';
import branch3 from '../../assets/images/menu/branch3.png';
import branchExit1 from '../../assets/images/menu/branch-exit1.png';
import branchExit2 from '../../assets/images/menu/branch-exit2.png';
import branchExit3 from '../../assets/images/menu/branch-exit3.png';
import branchExit from '../../assets/images/menu/branch-exit.png';
import branchDelete1 from '../../assets/images/menu/branch-delete1.png';
import branchDelete2 from '../../assets/images/menu/branch-delete2.png';
import branchDelete3 from '../../assets/images/menu/branch-delete3.png';


function Select(props){
  let fileOne = <File number={1} saves={props.saves} game={props.game} relation={'normal'}/>;
  let fileTwo = <File number={2} saves={props.saves} game={props.game} relation={'normal'}/>;
  let fileThree = <File number={3} saves={props.saves} game={props.game} relation={'normal'}/>;
  let deleteFile = "DELETE FILE";
  let copyFile = "COPY FILE";

  let heading;
  if (props.menu.selectedMenu == 'select'){
    heading = "Select a File";
  } else if (props.menu.selectedMenu == 'delete'){
    heading = "Select a File to Delete";
    deleteFile = "RETURN TO FILE SELECT";
  } else if (props.menu.selectedMenu == 'copy'){
    heading = "Select a File to Copy";
    copyFile = "RETURN TO FILE SELECT";
  } else if (props.menu.selectedMenu == 'copySelected'){
    heading = "Select a File to Copy To";
    copyFile = "RETURN TO FILE SELECT";
  };

  let branchEnter;
  let branchEx;
  if (props.menu.selectedOption == 1) {
    branchEnter = <img id="branch" src={branch1} width="500" height="300"/>;
    if(props.menu.selectedMenu == 'delete') {
      branchEx = <img id="branch-exit" src={branchDelete1} width="500" height="300"/>;
    } else {
      branchEx = <img id="branch-exit" src={branchExit1} width="500" height="300"/>;
    };
  } else if (props.menu.selectedOption == 2) {
    branchEnter = <img id="branch" src={branch2} width="500" height="300"/>;
    if(props.menu.selectedMenu == 'delete') {
      branchEx = <img id="branch-exit" src={branchDelete2} width="500" height="300"/>;
    } else {
      branchEx = <img id="branch-exit" src={branchExit2} width="500" height="300"/>;
    };
  } else if (props.menu.selectedOption == 3){
    branchEnter = <img id="branch" src={branch3} width="500" height="300"/>;
    if(props.menu.selectedMenu == 'delete') {
      branchEx = <img id="branch-exit" src={branchDelete3} width="500" height="300"/>;
    } else {
      branchEx = <img id="branch-exit" src={branchExit3} width="500" height="300"/>;
    };
  } else {
    branchEnter = <img id="branch" src={branch} width="500" height="300"/>;
    branchEx = <img id="branch-exit" src={branchExit2} width="500" height="300"/>;
  };

  function isSelected(option) {
    if (props.menu.selectedOption == option) {
      return "selected";
    } 
  }

  return (
    <div className="select-wrap">
      <div className="selectScreen">
        {branchEnter}
        {branchEx}
        <h2>{heading}</h2>
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
          <h4>{deleteFile}</h4>
        </div>
        <div id={isSelected(5)}>
          <h4>{copyFile}</h4>
        </div>
        <div id={isSelected(6)}>
          <h4>RETURN TO TITLE</h4>
        </div>
        <div>
          <h4><span className="button-prompt">Enter</span> / <span className="button-prompt">Space</span> : Confirm Selection</h4>
        </div>
      </div>
    </div>
  );
};

Select.propTypes = {
  menu: PropTypes.object.isRequired,
  player: PropTypes.object,
  game: PropTypes.object,
  saves: PropTypes.object
}

export default Select;
