class meteor {
  constructor() {
    this.posX = getRandomNumber(60, 700);
    this.posY = -50;
    this.healthBarWidth = 0;
    if (getRandomNumber(0, 20) == 10) {
      this.megaMeteor = true;
      this.health = 3;
      this.speed = 2 + (level-1)*0.5;
    }
    else {
      this.health = 1;
      this.speed = 2.5 + (level-1)*0.5;
    }
  }
  draw() {
    if (this.health == 1) {
      this.healthBarWidth = 80;
    }
    if (this.health == 2) {
      this.healthBarWidth = 40;
    }
    if (this.health == 3) {
      this.healthBarWidth = 0;
    }
    if(!this.megaMeteor) {
      image(meteorOne, this.posX, this.posY, 89, 82);
    }
    else {
      tint(255, 50, 50, 200);
      image(meteorThree, this.posX, this.posY, 120, 98);
      tint(255, 255, 255, 255);
      fill(0,255,0);
      rect(this.posX, this.posY-70, 120, 10)
      fill(255,0,0);
      rect(this.posX, this.posY-70, this.healthBarWidth, 10)
      fill(255);
    }

    this.posY += this.speed;

    if (this.posY > 818 || this.health <= 0) {
      var index = meteors.indexOf(this);
      if (this.megaMeteor && this.health <=0) {
        score += 5;
      }
      meteors.splice(index, 1);
    }
    let collidingBullets = -1
    let meteorX = this.posX;
    let meteorY = this.posY;
    let results = new Array();
    // For each bullet, check if it is colliding with the meteor
    bullets.forEach(function(item) {
      let bulletX = item.getX();
      let bulletY = item.getY();
      if ((bulletY < meteorY + 82 && bulletY + 54 > meteorY) && (bulletX > meteorX && bulletX + 9 < meteorX + 89)) {
        results.push(item.getIndex());
        item.destroy();
      }
    });
    if (results.length != 0) {
      collidingBullets = results;
    }
    if (collidingBullets != -1) {
      this.health-=1;
    }
  }
  checkCollision() {
    let playerX = player1.getPosX() - 50;
    let playerY = player1.getPosY() - 50;
    let meteorX = this.posX - 44.5;
    let meteorY = this.posY - 41;
    if ((meteorX+80 > playerX && meteorX < playerX + 90) && (meteorY + 75 > playerY && meteorY < playerY + 90)) {
      player1.loseHealth();
      var index = meteors.indexOf(this);
      meteors.splice(index, 1);
    }
  }
}