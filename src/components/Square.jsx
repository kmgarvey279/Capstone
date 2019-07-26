import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Square(props){
  if (props.spriteOut === 'north') {
    return (
      <div>
        <style jsx>{`
          @keyframes move {
            0%  {bottom: 10px;}
            25%  {bottom: 20px;}
            50%  {bottom: 30px;}
            75%  {bottom: 40px;}
          }
          div#sprite{
            right: 4px;
            bottom: 5px;
            z-index: 100;
            position: absolute;
            animation-name: move;
            animation-duration: 1s;
          }
        `}</style>
        <div id="sprite">{props.sprite}</div>
        <div id="tile">{props.tileImage}</div>
      </div>
    )
  } else if (props.spriteOut === 'east') {
      return (
        <div>
          <style jsx>{`
            @keyframes move {
              0%  {left: 10px;}
              25%  {left: 20px;}
              50%  {left: 30px;}
              75%  {left: 40px;}
            }
            div#sprite{
              bottom: 5px;
              z-index: 100;
              position: absolute;
              animation-name: move;
              animation-duration: 1s;
            }
          `}</style>
          <div id="sprite">{props.sprite}</div>
          <div id="tile">{props.tileImage}</div>
        </div>
      )
    } else if (props.spriteOut === 'south') {
      return (
        <div>
          <style jsx>{`
            @keyframes move {
              0%  {top: 10px;}
              25%  {top: 20px;}
              50%  {top: 30px;}
              75%  {top: 40px;}
            }
            div#sprite{
              bottom: 5px;
              z-index: 100;
              position: absolute;
              animation-name: move;
              animation-duration: 1s;
            }
          `}</style>
          <div id="sprite">{props.sprite}</div>
          <div id="tile">{props.tileImage}</div>
        </div>
      )
    } else if (props.spriteOut === 'west') {
      return (
        <div>
          <style jsx>{`
            @keyframes move {
              0%  {right: 10px;}
              25%  {right: 20px;}
              50%  {right: 30px;}
              75%  {right: 40px;}
            }
            div#sprite{
              bottom: 5px;
              z-index: 100;
              position: absolute;
              animation-name: move;
              animation-duration: 1s;
            }
          `}</style>
          <div id="sprite">{props.sprite}</div>
          <div id="tile">{props.tileImage}</div>
        </div>
      )
  // } else if (props.spriteIn === 'north') {
  //   return (
  //     <div>
  //       <style jsx>{`
  //         @keyframes move {
  //           0%  {bottom: 0px;}
  //           25%  {bottom: 5px;}
  //           50%  {bottom: 10px;}
  //           75%  {bottom: 15px;}
  //         }
  //         div#sprite{
  //           bottom: 15px;
  //           z-index: 100;
  //           position: absolute;
  //           animation-name: move;
  //           animation-duration: .5s;
  //         }
  //       `}</style>
  //       <div id="sprite">{props.sprite}</div>
  //       <div id="tile">{props.tileImage}</div>
  //     </div>
  //   )
  // } else if (props.spriteIn === 'east') {
  //     return (
  //       <div>
  //         <style jsx>{`
  //           @keyframes move {
  //             0%  {left: -15px;}
  //             25%  {left: -10px;}
  //             50%  {left: -5px;}
  //             75%  {left: 0px;}
  //           }
  //           div#sprite{
  //             bottom: 15px;
  //             z-index: 100;
  //             position: absolute;
  //             animation-name: move;
  //             animation-duration: .5s;
  //           }
  //         `}</style>
  //         <div id="sprite">{props.sprite}</div>
  //         <div id="tile">{props.tileImage}</div>
  //       </div>
  //     )
  //   } else if (props.spriteIn === 'south') {
  //     return (
  //       <div>
  //         <style jsx>{`
  //           @keyframes move {
  //             0%  {bottom: 30px;}
  //             25%  {bottom: 25px;}
  //             50%  {bottom: 20px;}
  //             75%  {bottom: 15px;}
  //           }
  //           div#sprite{
  //             bottom: 15px;
  //             z-index: 100;
  //             position: absolute;
  //             animation-name: move;
  //             animation-duration: .5s;
  //           }
  //         `}</style>
  //         <div id="sprite">{props.sprite}</div>
  //         <div id="tile">{props.tileImage}</div>
  //       </div>
  //     )
  //   } else if (props.spriteIn === 'west') {
  //     return (
  //       <div>
  //         <style jsx>{`
  //           @keyframes move {
  //             0%  {left: 15px;}
  //             25%  {left: 10px;}
  //             50%  {left: 5px;}
  //             75%  {left: 0px;}
  //           }
  //           div#sprite{
  //             bottom: 15px;
  //             z-index: 100;
  //             position: absolute;
  //             animation-name: move;
  //             animation-duration: .5s;
  //           }
  //         `}</style>
  //         <div id="sprite">{props.sprite}</div>
  //         <div id="tile">{props.tileImage}</div>
  //       </div>
  //     )
  } else {
    return (
      <div>
        <style jsx>{`
          div#sprite{
            z-index: 100;
            position: absolute;
            bottom: 5px;
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
  isYou: PropTypes.bool.isRequired,
  isEnemy: PropTypes.string.isRequired,
  isProjectile: PropTypes.bool.isRequired,
  squareId: PropTypes.number.isRequired,
  tileImage: PropTypes.object.isRequired,
  sprite: PropTypes.object,
  spriteIn: PropTypes.string,
  spriteOut: PropTypes.string
};

export default connect()(Square);
