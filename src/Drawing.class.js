import Colors from './Colors.class';

 export default class Drawing {

  static gameOver(ctx, centreX, centreY, score, bestScore) {

    if(score > bestScore) {
      bestScore = score;
      localStorage.setItem('snake_bestScore', bestScore);
    }

    ctx.save();
    ctx.font = "bold 3em cursive";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    let mGameOver = centreY - centreY/1.5;
    let mBestScore = centreY - centreY/2;
    let mReplay = centreY * 1.5;
    ctx.strokeText("Game Over", centreX, mGameOver);
    ctx.fillText("Game Over", centreX, mGameOver);
    ctx.font = "bold 1em cursive";
    ctx.fillText("Meilleur score: "+ bestScore, centreX, mBestScore);
    ctx.font = "bold 1.2em cursive";
    ctx.strokeText("Appuyez sur la touche espace pour rejouer", centreX, mReplay);
    ctx.fillText("Appuyez sur la touche espace pour rejouer", centreX, mReplay);
    ctx.restore();
  };

  static drawScore(ctx, centreX, centreY, score) {
    ctx.save();
    ctx.font = "bold 10em sans-serif";
    ctx.fillStyle = "deeppink";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(score.toString(), centreX, centreY);
    ctx.restore();
  };

  static drawBlock(ctx, position, blockSize, snakeDirection = false) {
    if(!snakeDirection) {
      const [x,y] = position.map((e) => e * blockSize);
      ctx.fillRect(x,y,blockSize,blockSize);
    }
  };

  static drawSnake(ctx, snake, blockSize) {
    ctx.save();
    ctx.fillStyle="#ff0000";
    for(let [index, block] of snake.body.entries()) {
      if(snake.randomColor == true) {
        ctx.fillStyle = Colors.getRandomColor(snake.colors);
      }
      else {
        ctx.fillStyle = Colors.getFixedColor(snake.colors, index);
      }
      this.drawBlock(ctx, block, blockSize);
    }
    ctx.restore();
  }

  static drawApple(ctx, apple, blockSize) {
    const radius = blockSize/2;
    const [x,y] = apple.position.map((e) => e * blockSize + radius);
    ctx.save();
    ctx.fillStyle = "#33cc33";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.restore();
  }

}
