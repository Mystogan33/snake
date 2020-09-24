import Colors from './Colors.class';

 export default class Snake {

  constructor(colors = 'default', direction = "right", body = [[6,4],[5,4]]) {
    this.body = body;
    this.colorsSet = {
      "default": ['#f44336'],
      "rainbow": ['#f44336','#E91E63','#9c27b0','#2196F3','#00bcd4','#009688','#cddc39','#ffc107','#ff9800','#ff5722'],
      "angel": ['#42a5f5','#90caf9','#e3f2fd'],
      "demon": ['#f44336','#c62828','#212121']
    }
    this.colors = this.setColors(colors);
    this.direction = direction;
    this.ateApple = false;
  }

  advance() {
    const nextPosition = this.body[0].slice();
    switch(this.direction){
      case "left":
      nextPosition[0] -= 1;
      break;
      case "right":
      nextPosition[0] += 1;
      break;
      case "down":
      nextPosition[1] += 1;
      break;
      case "up":
      nextPosition[1] -= 1;
      break;
      default:
      throw("invalid direction");
    }
    this.body.unshift(nextPosition);
    if (!this.ateApple)
    this.body.pop();
    else
    this.ateApple = false;
  }

  setColors(colors) {
    if(Array.isArray(colors)) {
      return colors;
    }
    else {
      if(this.colorsSet.hasOwnProperty(colors)) {
        return this.colorsSet[colors];
      }
      else if(colors == "random") {
          return Colors.getRandomColorSet(...this.colorsSet.rainbow, ...this.colorsSet.angel, ...this.colorsSet.demon);
      }
      else {
        throw new Error('Colors for snake are invalid');
      }
    }
  }

  setDirection(newDirection) {
    let allowedDirections;
    switch(this.direction){
      case "left":
      case "right":
      allowedDirections=["up","down"];
      break;
      case "down":
      case "up":
      allowedDirections=["left","right"];
      break;
      default:
      throw("invalid direction");
    }
    if (allowedDirections.includes(newDirection)){
      this.direction = newDirection;
    }
  }

  checkCollision(canvasDimensions) {
    let wallCollision = false;
    let snakeCollision = false;
    const [head,...rest] = this.body;
    const [snakeX, snakeY] = head;
    const minX = 0;
    const minY = 0;
    const [maxX, maxY] = canvasDimensions.map(e => e - 1);
    const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
    const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

    if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
    wallCollision = true;

    for(let block of rest) {
      if(snakeX == block[0] && snakeY == block[1]) snakeCollision = true;
    }

    return wallCollision || snakeCollision;
  }

  isEatingApple(appleToEat) {
    const head = this.body[0];
    if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
    return true;
    else
    return false;
  }

}
