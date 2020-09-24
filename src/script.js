'use strict'
import "core-js/stable";
import "regenerator-runtime/runtime";
import Game from './Game.class';

$(() => {

  const myGame = new Game();
  myGame.init();
  myGame.launch();

  $('#btnUpdateGame').click(() => {
    let snakeColor = $('#snakeSelect').val();
    let difficulty = $('#difficultySelect').val();

    switch (snakeColor) {
      case 'randomSnake':
        const mSet = myGame.snakee.colorsSet;
        const keys = Object.keys(mSet);
        let randomSnake = mSet[keys[keys.length * Math.random() << 0]];
        myGame.snakeeParams[0] = randomSnake;
        break;
      default:
        myGame.snakeeParams[0] = snakeColor;
    }

    switch (difficulty) {
      case 'random':
      const mSet = this.difficultySets;
      const keys = Object.keys(mSet);
      const randomDifficulty = mSet[keys[keys.length * Math.random() << 0]];
      myGame.changeDifficulty(randomDifficulty);
        break;
      default:
        myGame.changeDifficulty(difficulty);
    }

    myGame.launch();

  })

  document.onkeydown = (e) => {
    const key = e.keyCode;
    let newDirection;
    switch(key){
      case 37:
      newDirection = "left";
      break;
      case 38:
      newDirection = "up";
      break;
      case 39:
      newDirection = "right";
      break;
      case 40:
      newDirection = "down";
      break;
      case 32:
      myGame.launch();
      return;
      default:
      return;
    }
    myGame.snakee.setDirection(newDirection);
  };

});
