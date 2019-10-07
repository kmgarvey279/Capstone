import React from 'react';
import PropTypes from 'prop-types';
import './PopUp.css';

function PopUp(props){
    let message;
    if (props.popUp === 1) {
        message = <span>Press <span className="button-prompt">Space</span> to examine</span>
    } else if (props.popUp === 2) {
        message = <span> Press <span className="button-prompt">Space</span> to shoot</span>
    } else if (props.popUp === 3) {
        message = <span> Press <span className="button-prompt">Shift</span> to switch weapons</span>
    };
    if (props.popUp !== null){
        return (
            <div id="popup-wrap">
            <div id="popup-content">{message}</div>
            </div>
        );
    } else {
        return null
    };
}

PopUp.propTypes = {
  popUp: PropTypes.number
};

export default PopUp;