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
  } else if (props.transition === 'northExit') {
    return (
      <div>
        <style jsx>{`
          @keyframes move {
            from{
              margin-top: 30%;
            }

            to: {
              margin-top: 0;
            }
          }

          div#sprite{
            z-index: 100;
            position: absolute;
            animation-name: move;
            animation-duration: 1s;
            bottom: 15px;
            right -13px;
          }
        `}</style>
        <div id="sprite">{props.sprite}</div>
        <div id="tile">{props.tileImage}</div>
      </div>
    )
  } else if (props.transition === 'northEnter') {
    return (
      <div>
        <style jsx>{`
          @keyframes move {
            from{
              margin-bottom: 0px;
            }

            to: {
              margin-bottom: 30px;
            }
          }

          div#sprite{
            border: solid green 2 px;
            z-index: 100;
            position: absolute;
            animation-name: move;
            animation-duration: 1s;
            bottom: 15px;
            right -13px;
          }
        `}</style>
        <div id="sprite">{props.sprite}</div>
        <div id="tile">{props.tileImage}</div>
      </div>
    )
  } else if (props.transition === 'eastExit') {
      return (
        <div>
          <style jsx>{`
            @keyframes move {
              from{
                margin-right: 30%;
              }

              to: {
                margin-right: 0;
              }
            }
            div#sprite{
              bottom: 15px;
              right -13px;
              z-index: 100;
              position: absolute;
              animation-name: move;
              animation-duration: 1s;
              border: solid red 2px;
            }
          `}</style>
          <div id="sprite">{props.sprite}</div>
          <div id="tile">{props.tileImage}</div>
        </div>
      )
    } else if (props.transition === 'eastEnter') {
      return (
        <div>
          <style jsx>{`
            @keyframes move {
              from{
                margin-left: 0;
              }

              to: {
                margin-left: 30%;
              }
            }

            div#sprite{
              z-index: 2;
              position: absolute;
              animation-name: move;
              animation-duration: 1s;
              bottom: 15px;
              right -13px;
              border: solid green 2px;
            }
          `}</style>
          <div id="sprite">{props.sprite}</div>
          <div id="tile">{props.tileImage}</div>
        </div>
      )
    } else if (props.transition === 'southExit') {
      return (
        <div>
          <style jsx>{`
            @keyframes move {
              from{
                margin-top: 0;
              }

              to: {
                margin-bottom: 0;
              }
            }

            div#sprite{
              border: solid red 2px;
              z-index: 100;
              position: absolute;
              animation-name: move;
              animation-duration: 1s;
              bottom: 15px;
              right -13px;
            }
          `}</style>
          <div id="sprite">{props.sprite}</div>
          <div id="tile">{props.tileImage}</div>
        </div>
      )
    } else if (props.transition === 'southEnter') {
      return (
        <div>
          <style jsx>{`
            @keyframes move {
              from{
                margin-top: 0%;
              }

              to: {
                margin-top: 30%;
              }
            }

            div#sprite{
              border: solid green 2px;
              z-index: 100;
              position: absolute;
              animation-name: move;
              animation-duration: 1s;
              bottom: 15px;
              right -13px;
            }
          `}</style>
          <div id="sprite">{props.sprite}</div>
          <div id="tile">{props.tileImage}</div>
        </div>
      )
    } else if (props.transition === 'westEnter') {
      return (
        <div>
          <style jsx>{`
            @keyframes move {
              from{
                margin-right: 0;
              }

              to: {
                margin-right: 30%;
              }
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
    } else if (props.transition === 'westExit') {
      return (
        <div>
          <style jsx>{`
            @keyframes move {
              from{
                margin-left: 30%;
              }

              to: {
                margin-left: 0;
              }
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
