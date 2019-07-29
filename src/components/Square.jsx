import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Square(props){
  if (props.transition !== '' && props.value == 'P' && !(props.player.status == 'dash' && props.content == 'player')) {
    return (
      <div>
        <style jsx>{`
          @keyframes fall {
            0%  {transform: rotate(20deg) scale(1.0);}
            25%  {transform: rotate(40deg) scale(0.7);}
            50%  {transform: rotate(60deg) scale(0.4);}
            75%  {transform: rotate(100deg) scale(0.1);}
          }
          div#spriteFall{
            right: 4px;
            bottom: 5px;
            z-index: 100;
            position: absolute;
            animation-name: fall;
            animation-duration: 1s;
          }
        `}</style>
        <div id="spriteFall">{props.sprite}</div>
        <div id="tile">{props.tileImage}</div>
      </div>
    )
  } else if (props.transition === 'north') {
    return (
      <div>
        <style jsx>{`
          @keyframes move {
            0%  {bottom: 20px;}
            25%  {bottom: 30px;}
            50%  {bottom: 40px;}
            75%  {bottom: 50px;}
          }
          div#spriteNorth{
            z-index: 100;
            position: absolute;
            animation-name: move;
            animation-duration: 1s;
            bottom: 15px;
            right -13px;
          }
        `}</style>
        <div id="spriteNorth">{props.sprite}</div>
        <div id="tile">{props.tileImage}</div>
      </div>
    )
  } else if (props.transition === 'east') {
      return (
        <div>
          <style jsx>{`
            @keyframes move {
              0%  {right: 20px;}
              25%  {right: 0px;}
              50%  {right: -10px;}
              75%  {right: -20px;}
            }
            div#spriteEast{
              bottom: 15px;
              right -13px;
              z-index: 100;
              position: absolute;
              animation-name: move;
              animation-duration: 1s;
            }
          `}</style>
          <div id="spriteEast">{props.sprite}</div>
          <div id="tile">{props.tileImage}</div>
        </div>
      )
    } else if (props.transition === 'south') {
      return (
        <div>
          <style jsx>{`
            @keyframes move {
              0%  {top: -80px;}
              25%  {top: -70px;}
              50%  {top: -60px;}
              75%  {top: -50px;}
            }
            div#spriteSouth{
              z-index: 100;
              position: absolute;
              animation-name: move;
              animation-duration: 1s;
              bottom: 15px;
              right -13px;
            }
          `}</style>
          <div id="spriteSouth">{props.sprite}</div>
          <div id="tile">{props.tileImage}</div>
        </div>
      )
    } else if (props.transition === 'west') {
      return (
        <div>
          <style jsx>{`
            @keyframes move {
              0%  {left: -80px;}
              25%  {left: -70px;}
              50%  {left: -60px;}
              75%  {left: -50px;}
            }
            div#spriteWest{
              bottom: 15px;
              right -13px;
              z-index: 100;
              position: absolute;
              animation-name: move;
              animation-duration: 1s;
            }
          `}</style>
          <div id="spriteWest">{props.sprite}</div>
          <div id="tile">{props.tileImage}</div>
        </div>
      )
  } else {
    return (
      <div>
        <style jsx>{`
          div#sprite{
            z-index: 100;
            position: absolute;
            bottom: 15px;
            right -13px;
          }
          `}</style>
          <div id="sprite">{props.sprite}</div>
          <div id="tile">{props.tileImage}</div>
        </div>
      )
    }
  }

Square.propTypes = {
  value: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
  squareId: PropTypes.number.isRequired,
  tileImage: PropTypes.object.isRequired,
  sprite: PropTypes.object,
  transition: PropTypes.string,
  player: PropTypes.object
};

export default connect()(Square);
