class player {
  constructor() {
    // Create initial variables
    this.posX = 384;
    this.posY = 700;
    this.speed = speed;
    this.rotation = 0;
    this.health = health;
  }
  draw() {
    // We have to use push() then pop() here due to the way rotation works in p5.js
    // In p5.js, when you use rotate(), it rotates the entire canvas
    // So to get around this we use push() and pop()
    // push() saves the current state of the canvas and pop() restores the saved state
    // this means we can rotate the sprite without rotating any other assets
    push();
    // As we are rotating, we must set the center of the canvas to be the current position
    // of the player, this is because the rotate() will rotate the canvas around the current 
    // (0, 0) point of the canvsa.
    translate(this.posX, this.posY);

    imageMode(CENTER);

    rotate(this.rotation);

    // As the canvas (0, 0) has been translated to the player's X and Y coords, we don't
    // have to specify the player coords here and can just use (0,0) instead
    image(playerSprite, 0, 0, 100, 100);
    pop();
  }
  getPosX() {
    return this.posX;
  }
  getPosY() {
    return this.posY;
  }
  getScore() {
    return this.score;
  }
  getSpeed() {
    return this.speed;
  }
  getRotation() {
    return this.rotation;
  }
  setSpeed(givenSpeed) {
    this.speed = givenSpeed;
  }
  setRotation(givenRotation) {
    this.rotation = givenRotation;
  }
  getHealth() {
    return this.health;
  }
  loseHealth() {
    this.health--;
    hearts.splice(-1, 1);
  }
  gainHealth() {
    this.health++;
    hearts[hearts.length] = new heart(hearts.length);
  }
  // Move the player in the given direction if they are not going to go out of bounds
  // Then if going horizontally, rotate the player
  move(direction) {
    if (direction == "a" && this.posX > 60) {
      this.posX -= this.speed;
      this.rotation = -45;
    }
    if (direction == "d" && this.posX < 708) {
      this.posX += this.speed;
      this.rotation = 45;
    }
    if (direction == "w" && this.posY > 60) {
      this.posY -= this.speed;
      this.rotation = 0;
    }
    if (direction == "s" && this.posY < 708) {
      this.posY += this.speed;
      this.rotation = 0;
    }
  }
}