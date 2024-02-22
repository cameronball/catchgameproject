class bullet {
  constructor(givenSpeed) {
    // These specific X and Y coords set the bullet to appear to come from the ship's gun
    this.posX = player1.getPosX() - 5;
    this.posY = player1.getPosY() - 100;
    this.speed = givenSpeed;
  }
  destroy() {
    const index = bullets.indexOf(this);
    bullets.splice(index, 1);
  }
  getIndex() {
    return bullets.indexOf(this);
  }
  getX() {
    return this.posX;
  }
  getY() {
    return this.posY;
  }
  draw() {
    image(redLaserSprite, this.posX, this.posY, 9, 54);

    this.posY -= this.speed;
    // If the bullet is offscreen, get the bullet's index in the array of all bullets
    // and then remove it from that array.
    if (this.posY < -50) {
      this.destroy();
    }
  }
}