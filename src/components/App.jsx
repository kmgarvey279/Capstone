import React from "react";
import Title from "./Title";
import End from "./End";
import Game from "./Game";
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
// import * as types from './../constants/ActionTypes';
// import * as actions from './../actions';

import * as blocksModule from './../redux/modules/blocks';
import * as doorsModule from './../redux/modules/doors';
import * as enemiesModule from './../redux/modules/enemies';
import * as gameModule from './../redux/modules/game';
import * as levelModule from './../redux/modules/level';
import * as playerModule from './../redux/modules/player';
import * as projectilesModule from './../redux/modules/projectiles';



import lava from '../assets/images/lava.gif';
import stairs from '../assets/images/stairs.png';
import wall from '../assets/images/wall.jpeg';
import empty from '../assets/images/tile.png';
import wallCorner1 from '../assets/images/level/wall-corner1.png';
import wallCorner2 from '../assets/images/level/wall-corner2.png';
import wallCorner3 from '../assets/images/level/wall-corner3.png';
import wallCorner4 from '../assets/images/level/wall-corner4.png';
import wallTop from '../assets/images/level/wall-top.png';
import wallBottom from '../assets/images/level/wall-bottom.png';
import wallLeft from '../assets/images/level/wall-left.png';
import wallRight from '../assets/images/level/wall-right.png';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
//Handle Input
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  handleKeyPress(event){
    //move up
    if(event.keyCode === 38 && this.props.game.coolDown === false){
      const { dispatch } = this.props;
      dispatch(gameModule.coolDown(true));
      this.move("north")
      let moveTimer = setTimeout(() =>
        dispatch(gameModule.coolDown(false)),
        200
      );
    //move down
  } else if(event.keyCode === 40 && this.props.game.coolDown === false){
      const { dispatch } = this.props;
      dispatch(gameModule.coolDown(true));
      this.move("south")
      let moveTimer = setTimeout(() =>
        dispatch(gameModule.coolDown(false)),
        200
      );
    //move right
  } else if (event.keyCode === 39 && this.props.game.coolDown === false){
      const { dispatch } = this.props;
      dispatch(gameModule.coolDown(true));
      this.move("east")
      let moveTimer = setTimeout(() =>
        dispatch(gameModule.coolDown(false)),
        200
      );
    //move left
  } else if (event.keyCode === 37 && this.props.game.coolDown === false){
      const { dispatch } = this.props;
      dispatch(gameModule.coolDown(true));
      this.move("west")
      let moveTimer = setTimeout(() =>
        dispatch(gameModule.coolDown(false)),
        200
      );
    //attack!
    } else if (event.keyCode === 32) {
      if(this.props.game.gameState == 'title') {
        this.startGame();
        this.props.history.push("/game");
      } else if (this.props.game.gameState == 'active') {
        this.attack();
      }
    //pause/unpause
    } else if (event.keyCode === 13) {
      if(this.props.game.gameState == 'title') {
        this.startGame();
      } else if (this.props.game.gameState == 'active' || this.props.game.gameState == 'paused') {
        this.pauseGame();
      }
    }
  }

//Change Level State
  startGame(){
    this.handleChangeGameState('active')
    this.generateLevelFromTemplate();
    this.props.history.push("/game");
  }

  pauseGame(){
    if (this.props.game.gameState == 'active') {
      this.handleChangeGameState('paused');
    } else if (this.props.game.gameState == 'paused') {
      this.handleChangeGameState('active');
    }
  }

  handleChangeGameState(newGameState){
    const { dispatch } = this.props;
    dispatch(gameModule.changeGameState(newGameState));
  }

//Create Levels
  generateLevelFromTemplate(){
    const { dispatch } = this.props;
    dispatch(levelModule.nullLevel());
    let levelTemplate = this.props.game.levelById[this.props.game.levelId];
    for(let i = 0; i < levelTemplate.length; i++){
      this.handleAddingSquareToLevel(i+1, levelTemplate[i]);
    }
  }

  handleAddingSquareToLevel(thisSquareId, squareValue) {
    const { dispatch } = this.props;
    let squareImage;
    let squareIsYou = false;
    let squareIsEnemy = '';
    let squareIsProjectile = false;
    let sprite = null;
    //Set tile image
    if (squareValue == 'F') {
      squareImage = <img id="tile" src={stairs} weight="50" height="50" />;
    } else if (squareValue == 'L') {
      squareImage = <img id="tile" src={lava} weight="50" height="50" />;
    } else if (squareValue == 'P') {
      squareImage = '';
    } else if (squareValue == 'W') {
      if (thisSquareId == 1) {
        squareImage = <img id="tile" src={wallCorner1} weight="50" height="50" />;
      } else if (thisSquareId === 12) {
        squareImage = <img id="tile" src={wallCorner3} weight="50" height="50" />;
      } else if (thisSquareId === 133) {
        squareImage = <img id="tile" src={wallCorner2} weight="50" height="50" />;
      } else if (thisSquareId === 144) {
        squareImage = <img id="tile" src={wallCorner4} weight="50" height="50" />;
      } else if (thisSquareId %12 === 0) {
        squareImage = <img id="tile" src={wallBottom} weight="50" height="50" />;
      } else if (thisSquareId < 12) {
        squareImage = <img id="tile" src={wallLeft} weight="50" height="50" />;
      } else if (thisSquareId >= 131) {
        squareImage = <img id="tile" src={wallRight} weight="50" height="50" />;
      } else if ((thisSquareId - 1) %12 === 0) {
        squareImage = <img id="tile" src={wallTop} weight="50" height="50" />;
      } else {
        squareImage = <img id="tile" src={wall} weight="50" height="50" />;
      }
    } else {
      squareImage = <img id="tile" src={empty} weight="50" height="50" />;
    }
    if (squareValue == 'S') {
      alert(thisSquareId)
      dispatch(gameModule.setRespawnPoint(thisSquareId));
      alert(this.props.game.respawnPoint)
      sprite = this.props.player.sprites.stand[this.props.player.direction];
      squareIsYou = true;
      dispatch(playerModule.updatePlayerLocation(thisSquareId));
    }
    if (parseInt(squareValue) > 0) {
      let newEnemyId = this.handleCreateNewEnemy(thisSquareId, parseInt(squareValue));
      sprite = this.props.enemies[newEnemyId].sprites.move['south'];
      squareIsEnemy = newEnemyId;
    }
    if (squareValue == 'B') {
      sprite = this.props.game.miscSprites['block'];
    }
    let spriteIn = '';
    let spriteOut = '';
    dispatch(levelModule.addSquare(thisSquareId, squareValue, squareIsYou, squareIsEnemy, squareIsProjectile, squareImage, sprite, spriteIn, spriteOut));
  }

//Handle Movement
  move(direction){
    if (this.props.game.gameState === 'active') {
      let originalLocation = this.props.player.location;
      const { dispatch } = this.props;
      //update direction & switch to walking sprite & trigger movement transition
      dispatch(playerModule.updatePlayerDirection(direction));
      let newSprite = this.props.player.sprites.walk[direction];
      dispatch(levelModule.updateSprite(originalLocation, newSprite));
      dispatch(levelModule.updateSpriteOut(originalLocation, direction));
      //check if move is legal, if not return original location
      let canMove = this.attemptMove(direction, originalLocation);
      //if move is legal...
      if (canMove !== originalLocation){
        //null previous location
        let spriteClearTimer = setTimeout(() =>
          this.clearPlayerSprite(originalLocation),
          100
        );
        let spriteAddTimer = setTimeout(() =>
          this.handleUpdatePlayerLocation(canMove, direction),
          150
        );
      }
    }
  }

  clearPlayerSprite(originalLocation) {
    const { dispatch } = this.props;
    dispatch(levelModule.updateIsYou(originalLocation, false));
    dispatch(levelModule.updateSpriteOut(originalLocation, ''));
    dispatch(levelModule.updateSprite(originalLocation, ''));
  }

  attemptMove(direction, originalLocation) {
    let newLocation;
    if(direction == "north") {
      newLocation = originalLocation - 1;
      if(this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    } else if (direction == "east") {
      newLocation = originalLocation + 12;
      if(this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    } else if (direction == "south") {
      newLocation = originalLocation + 1;
      if(this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    } else if (direction == "west") {
      newLocation = originalLocation - 12;
      if(this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    }
  }

  handleUpdatePlayerLocation(location, direction) {
    const { dispatch } = this.props;
    //check props of new square
    let result = this.squareCheck(location);
    if (result == 'moved') {
      //update new square
      dispatch(levelModule.updateIsYou(location, true));
      let newSprite = this.props.player.sprites.stand[direction];
      dispatch(levelModule.updateSprite(location, newSprite));
      //update player location to match
      dispatch(playerModule.updatePlayerLocation(location));
    }
  }

  squareCheck(squareId) {
    let location = this.props.currentLevel[squareId];
    let direction = this.props.player.direction;
    const { dispatch } = this.props;
    if (location.isEnemy !== '' || location.isProjectile || location.value == 'L') {
      //take damage + knockback
      let knockBackDirection = this.reverseDirection(direction);
      this.knockBack(knockBackDirection);
      //switch levels
    } else if (location.value == 'F') {
      let newLevel = this.props.game.levelId++
      dispatch(gameModule.levelIdUp(newLevel));
      this.generateLevelFromTemplate();
      //fall to your doom and respawn
    } else if (location.value == 'P'){
      this.fall(squareId);
    } else {
      //move to next square
      return 'moved';
    }
  }

  reverseDirection(direction) {
    if (direction == 'north') {
      return 'south';
    } else if (direction == 'south') {
      return 'north';
    } else if (direction == 'east') {
      return 'west';
    } else {
      return 'east';
    }
  }

  knockBack(knockBackDirection) {
    const { dispatch } = this.props;
    //take damage
    let newHealth = this.props.player.health -= 10;
    dispatch(playerModule.updatePlayerHealth(newHealth));
    //handle knockback
    for (let i = 0; i < 2; i++) {
      let location = this.props.player.location;
      let direction = this.props.player.direction;
      let newSprite = this.props.player.sprites.knockback[direction];
      dispatch(levelModule.updateSprite(location, newSprite));
      let canMove = this.attemptMove(knockBackDirection, location)
      if (canMove !== location) {
        //null previous location
        dispatch(levelModule.updateSprite(location, ''));
        dispatch(levelModule.updateIsYou(location, false));
        //update location
        alert(canMove + direction)
        this.handleUpdatePlayerLocation(canMove, direction);
      } else {
        newSprite = this.props.player.sprites.stand[direction];
        dispatch(levelModule.updateSprite(location, newSprite));
      }
    }
  }

  fall(location) {
    const { dispatch } = this.props;
    let newHealth = this.props.player.health -= 10;
    dispatch(playerModule.updatePlayerHealth(newHealth));
    let newSprite = this.props.player.sprites.fall;
    dispatch(levelModule.updateSprite(location, newSprite));
    dispatch(levelModule.updateSpriteOut(location, this.props.player.direction));
    let spriteClearTimer = setTimeout(() =>
      this.clearPlayerSprite(location),
      400
    );
    let spriteAddTimer = setTimeout(() =>
      this.handleUpdatePlayerLocation(this.props.game.respawnPoint, this.props.player.direction),
      400
    );
  }

//Handle Enemies
  handleCreateNewEnemy(locationId, enemyListId) {
    let thisEnemy = this.props.game.enemyById[enemyListId];
    let enemyId = v4();
    const { dispatch } = this.props;
    dispatch(enemiesModule.createEnemy(enemyId, thisEnemy.kind, thisEnemy.sprites, thisEnemy.health, locationId));
    let enemyTimer = setInterval(() =>
      this.enemyMove(enemyId),
      2000
    );
    return enemyId;
  }

  handleUpdateEnemyLocation(enemyId, location, direction) {
    const { dispatch} = this.props;
    //update new square
    dispatch(levelModule.updateIsEnemy(location, enemyId));
    let newSprite = this.props.enemies[enemyId].sprites.move[direction];
    dispatch(levelModule.updateSprite(location, newSprite))
    //update enemy location property to match
    dispatch(enemiesModule.updateEnemyLocation(enemyId, location));
  }

  handleUpdateEnemyDirection(enemyId, newDirection) {
    const { dispatch} = this.props;
    dispatch(enemiesModule.updateEnemyDirection(enemyId, newDirection));
  }

  handleUpdateEnemyHealth(enemyId, newHealth) {
    const { dispatch} = this.props;
    dispatch(enemiesModule.updateEnemyLocation(enemyId, newHealth));
  }

  enemyMove(enemyId) {
    if (this.props.game.gameState === 'active') {
      let enemy = this.props.enemies[enemyId];
      if (enemy.kind === 'Slime') {
        this.moveRandom(enemyId);
      } else if (enemy.kind === 'Robot') {
        this.moveVertical(enemyId);
      } else if (enemy.kind === 'Alien') {
        this.movePursue(enemyId);
      }
    }
  }

  moveRandom(enemyId) {
    let location = this.props.enemies[enemyId].location;
    let direction;
    //check if player is on neighboring square
    let playerNear = this.checkForPlayer(location)
    //otherwise, move at random
    if (playerNear !== false) {
      direction = playerNear;
    } else {
      let rng = Math.floor(Math.random() * 4);
      if (rng == 0) {
        direction = 'north';
      } else if (rng == 1) {
        direction = 'south';
      } else if (rng == 2) {
        direction = 'east';
      } else if (rng == 3) {
        direction = 'west'
      }
    }
    let canMove = this.attemptMove(direction, location);
    if (canMove !== location && this.props.currentLevel[canMove].isEnemy == '' && this.props.currentLevel[canMove].value !== 'L') {
      //damage player
      if (this.props.currentLevel[canMove].isYou) {
        this.knockBack(direction);
      }
      const { dispatch} = this.props;
      dispatch(levelModule.updateSpriteOut(location, direction));
      let spriteClearTimer = setTimeout(() =>
        this.clearEnemySprite(location),
        110
      );
      let spriteAddTimer = setTimeout(() =>
        this.handleUpdateEnemyLocation(enemyId, canMove, direction),
        100
      );
    }
  }

  clearEnemySprite(originalLocation) {
    const { dispatch } = this.props;
    dispatch(levelModule.updateIsEnemy(originalLocation, ''));
    dispatch(levelModule.updateSpriteOut(originalLocation, ''));
    dispatch(levelModule.updateSprite(originalLocation, ''));
  }


  enemyKnockBack(knockBackDirection, enemyId) {
    alert("hit!")
    const { dispatch } = this.props;
    let location = this.props.enemies[enemyId].location
    //take damage
    let newHealth = this.props.enemies[enemyId].health -= 10;
    dispatch(enemiesModule.updateEnemyHealth(enemyId, newHealth));
    //handle knockback
    for (let i = 0; i < 2; i++) {
      let direction = this.props.enemies[enemyId].direction;
      let newSprite = this.props.enemies[enemyId].sprites.knockback[direction];
      dispatch(levelModule.updateSprite(location, newSprite));
      let canMove = this.attemptMove(knockBackDirection, location)
      if (canMove !== location) {
        //null previous location + update location
        dispatch(levelModule.updateSprite(location, ''));
        dispatch(levelModule.updateIsEnemy(location, ''));
        this.handleUpdateEnemyLocation(enemyId, canMove, direction);
      } else {
        newSprite = this.props.enemies[enemyId].sprites.move[direction];
        dispatch(levelModule.updateSprite(location, newSprite));
      }
    }
  }
  // moveVertical()
  //
  // movePursue()

  checkForPlayer(location) {
    //check if player is on neighboring square
    let playerLocation = this.props.player.location
    if (location - 1 === playerLocation) {
      return 'north'
    } else if (location + 12 == playerLocation) {
      return 'east';
    } else if (location + 1 == playerLocation) {
      return 'south';
    } else if (location -12 == playerLocation) {
      return 'west';
    } else {
      return false;
    }
  }

//Handle Projectiles
  attack() {
    if (this.props.game.gameState === 'active') {
      const { dispatch } = this.props;
      let newSprite = this.props.player.sprites.attack[this.props.player.direction];
      dispatch(levelModule.updateSprite(this.props.player.location, newSprite));
      let projectileId = v4();
      this.handleCreateProjectile(projectileId);
    }
  }

  handleCreateProjectile(projectileId) {
    let direction = this.props.player.direction;
    let location = this.props.player.location;
    let range = this.props.player.weapon.range;
    let target;
    if (direction == 'north') {
      location -= 1;
      target = location - (1 * range);
    } else if (direction == 'east') {
      location += 12;
      target = location + (12 * range);
    } else if (direction == 'south') {
      location += 1;
      target = location + (1 * range);
    } else if (direction == 'west') {
      location -= 12;
      target = location - (12 * range);
    }
    const { dispatch } = this.props;
    dispatch(projectilesModule.createProjectile(projectileId, direction, location, target));
    this.projectileTimer = setInterval(() =>
      this.handleProjectile(projectileId),
      200
    );
    dispatch(projectilesModule.updateIsProjectile(location, projectileId));
    let newSprite = this.props.player.weapon.sprites[direction];
    dispatch(projectilesModule.updateSprite(location, newSprite));
    let enemyCheck = this.props.currentLevel[location].isEnemy
      if (enemyCheck !== '') {
        this.enemyKnockBack(direction, enemyCheck);
        this.destroyProjectile(projectileId);
      }
  }

  handleProjectile(projectileId) {
    if (this.props.game.gameState === 'active') {
      const { dispatch } = this.props;
      let location = this.props.projectiles[projectileId].location;
      //void projectile if @ max range
      if (location === this.props.projectiles[projectileId].target) {
        this.destroyProjectile(projectileId);
      } else {
        let direction = this.props.projectiles[projectileId].direction;
        let newLocation = this.attemptMove(direction, location);
        let enemyCheck = this.props.currentLevel[newLocation].isEnemy;
        //void projectile if it cannot continue
        if (location === newLocation) {
          this.destroyProjectile(projectileId);
        //damage enemy and void projectile if it hits
        } else if (enemyCheck !=='') {
          this.enemyKnockBack(direction, enemyCheck);
          this.destroyProjectile(projectileId);
        //otherwise move the projectile
        } else {
          alert(newLocation)
          this.moveProjectile(projectileId, newLocation);
        }
      }
    }
  }

  moveProjectile(projectileId, newLocation) {
    const { dispatch } = this.props;
    let location = this.props.projectiles[projectileId].location;
    dispatch(levelModule.updateIsProjectile(location, ''));
    dispatch(levelModule.updateSprite(location, ''));
    dispatch(levelModule.updateIsProjectile(newLocation, projectileId));
    let newSprite = this.props.player.weapon.sprites[this.props.projectiles[projectileId].direction];
    dispatch(levelModule.updateSprite(newLocation, newSprite));
    dispatch(projectilesModule.updateProjectileLocation(projectileId, newLocation));
  }

  destroyProjectile(projectileId) {
    const { dispatch } = this.props;
    let location = this.props.projectiles[projectileId].location;
    dispatch(levelModule.updateSprite(location, ''));
    dispatch(levelModule.updateIsProjectile(location, ''));
    dispatch(projectilesModule.nullProjectile(projectileId));
    clearInterval(this.projectileTimer);
  }

  render(){
    return (
      <div>
          <Route exact path='/' render={()=><Title onStartClick={() => this.handleStartButtonClick()}/>} />
          <Route exact path='/end' render={()=><End />} />
          <Route exact path='/game' render={()=><Game
            currentLevel={this.props.currentLevel}
            player={this.props.player}
            projectiles={this.props.projectiles}
            game={this.props.game} />} />
      </div>
    );
  }
}

App.propTypes = {
  currentLevel: PropTypes.object,
  game: PropTypes.object,
  player: PropTypes.object,
  projectiles: PropTypes.object,
  enemies: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentLevel: state.currentLevel,
    game: state.game,
    player: state.player,
    projectiles: state.projectiles,
    enemies: state.enemies
  }
};

export default withRouter(connect(mapStateToProps)(App));
