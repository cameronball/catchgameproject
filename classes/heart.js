class heart {
  constructor(givenHeartNumber) {
    this.heartNumber = givenHeartNumber;
    this.posX = 15 + (this.heartNumber * (38+15))
    this.posY = 700
  }
  draw() {
    image(heartSprite, this.posX, this.posY, 57, 45);
  }
}