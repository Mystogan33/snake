import Apple from './Apple.class';
import Snake from './Snake.class';
import Drawing from './Drawing.class';

 export default class Game {
  constructor
  (
    difficulty = 'normal',
    snakeParams = [],
    canvasStyles = {
      border: "20px solid deeppink",
      borderRadius: "20px",
      backgroundColor: "rgba(255,255,255,0.8)"
    },
    canvasDimensions = [900,600,30]
  ) {

    this.difficultySets = {
      "easy": [200, null, null, null, null],
      "normal": [100, 5, 0.95, null, null],
      "hard": [80, 5, 0.8, null, null],
      "hardcore": [70, 5, 0.7, 5, 5000]
    }

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    [this.canvasWidth, this.canvasHeight, this.blockSize] = canvasDimensions;
    this.canvasStyles = canvasStyles;

    [this.widthInBlocks, this.heightInBlocks] = [this.canvasWidth, this.canvasHeight].map(e => e / this.blockSize);
    [this.centreX, this.centreY] = [this.canvasWidth, this.canvasHeight].map(e => e / 2);

    [this.delay, this.scoreDivider, this.speedDivider, this.scoreToDecrease, this.decreaseDelay] = this.difficultySets[difficulty];
    this.runDelay = this.delay;
    this.snakee;
    this.snakeeParams = snakeParams;
    this.applee;
    this.score;
    this.decreaseTimeOut;
    this.bestScore;
    this.timeOut;
  }

  init() {
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.canvas.style.width = "100%";
    this.canvas.style.margin = "15px auto";
    this.canvas.style.display = "block";
    for(let cStyle in this.canvasStyles)
      this.canvas.style[cStyle] = this.canvasStyles[cStyle];

    document.getElementById("canvasSection").appendChild(this.canvas);
    this.initScore();
  };

  initScore() {
    const ls = localStorage.getItem('snake_bestScore');
    if(!ls) {
      this.bestScore = 0;
      localStorage.setItem('snake_bestScore', "0");
    } else this.bestScore = parseInt(ls);
  }

  launch() {
    this.snakee = new Snake(...this.snakeeParams);
    this.applee = new Apple();
    clearTimeout(this.timeOut);
    clearInterval(this.decreaseTimeOut);
    this.decreaseTimeOut = null;
    this.score = 0;
    this.runDelay = this.delay;
    this.refreshCanvas();
  };

  changeDifficulty(difficulty) {
    [this.delay, this.scoreDivider, this.speedDivider, this.scoreToDecrease, this.decreaseDelay] = this.difficultySets[difficulty];
  };

  refreshCanvas() {
    this.snakee.advance();
    if (this.snakee.checkCollision([this.widthInBlocks, this.heightInBlocks])){
      clearInterval(this.decreaseTimeOut);
      Drawing.gameOver(this.ctx, this.centreX, this.centreY, this.score, this.bestScore);
    } else {
      if (this.snakee.isEatingApple(this.applee)){
        this.score++;
        this.snakee.ateApple = true;

        do {
          this.applee.setNewPosition([this.widthInBlocks, this.heightInBlocks]);
        } while(this.applee.isOnSnake(this.snakee));

        if(this.scoreDivider && (this.score % this.scoreDivider == 0)) this.handleSpeed(true);

      }
      this.checkForScore();
      this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
      Drawing.drawScore(this.ctx, this.centreX, this.centreY, this.score);
      Drawing.drawSnake(this.ctx, this.snakee, this.blockSize);
      Drawing.drawApple(this.ctx, this.applee, this.blockSize);
      this.timeOut = setTimeout(this.refreshCanvas.bind(this), this.runDelay);
    }
  };

  handleSpeed(state) {
    if(state) this.runDelay *= this.speedDivider
    else this.runDelay /= this.speedDivider
  };

  checkForScore() {
    if(this.scoreToDecrease && (this.score > this.scoreToDecrease)) {
      if(this.decreaseTimeOut == null) {
        this.decreaseTimeOut = setInterval(this.looseScore.bind(this), this.decreaseDelay);
        this.snakee.randomColor = true;
      }
    } else {
      clearInterval(this.decreaseTimeOut);
      this.decreaseTimeOut = null;
      this.snakee.randomColor = false;
    }
  }

  looseScore() {

    if(this.score % this.scoreDivider == 0) {
      this.handleSpeed(false);
    }
    this.score--;
  }

}
