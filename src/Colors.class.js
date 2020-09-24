export default class Colors {

  static getRandomColorSet(...arrayColorsSet) {
    let counter = arrayColorsSet.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = arrayColorsSet[counter];
        arrayColorsSet[counter] = arrayColorsSet[index];
        arrayColorsSet[index] = temp;
    }

    return arrayColorsSet;
  }

  static getRandomColor(arrayColors) {
    const randomNumber = Math.floor(Math.random() * Math.floor(arrayColors.length -1));
    return arrayColors[randomNumber];
  }

  static getFixedColor(arrayColors, index) {
    let isOutIndex = (index < arrayColors.length ?
      arrayColors[index] : arrayColors[index % arrayColors.length]);
    return isOutIndex;
  }
}
