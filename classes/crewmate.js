class crewMate {
  constructor() {
    this.posX = getRandomNumber(60, 700);
    this.posY = -50;
    this.speed = 2;
    this.health = 1;
    this.rotation = 0;
    this.rotationSpeed = 0.5;
  }
  draw() {
    if (this.posY > 780) {
      var index = crewMates.indexOf(this);
      score--;
      crewMates.splice(index, 1);
    }
    if (hasMagnet) {
      this.posX += (player1.getPosX() - this.posX) * 0.001
      this.posY += (player1.getPosY() - this.posY) * 0.0005
    }
    push();
    translate(this.posX, this.posY);
    imageMode(CENTER);
    rotate(this.rotation);
    image(crewSprite, 0, 0, 60, 60);
    pop();
    this.posY += this.speed;
    this.rotation += this.rotationSpeed;
    this.checkCollision();
  }
  checkCollision() {
    let playerX = player1.getPosX() - 50;
    let playerY = player1.getPosY() - 50;
    if ((this.posY + 30 > playerY && this.posY < playerY + 100) && (this.posX > playerX && this.posX + 30 < playerX + 100)) {
      score ++;
      var index = crewMates.indexOf(this);
      crewMates.splice(index, 1);
    }
    this.checkLaserCollision();
  }
  checkLaserCollision() {
    let collidingBullets = -1
    let crewmateX = this.posX;
    let crewmateY = this.posY;
    let results = new Array();
    // For each bullet, check if it is colliding with the meteor
    bullets.forEach(function(item) {
      let bulletX = item.getX();
      let bulletY = item.getY();
      if ((bulletY < crewmateY + 60 && bulletY + 54 > crewmateY) && (bulletX > crewmateX && bulletX + 9 < crewmateX + 60)) {
        results.push(item.getIndex());
        item.destroy();
      }
    });
    if (results.length != 0) {
      collidingBullets = results;
    }
    if (collidingBullets != -1) {
      var index = crewMates.indexOf(this);
      crewMates.splice(index, 1);
      score--;
    }
  }
}