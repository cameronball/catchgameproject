function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let speed = 3.5;
let health = 3;
let score = 0;

const player1 = new player();
// Create the array that will hold instances of the bullet class
// This allows us to create new instances of the bullet class programatically
// without having to predefine many bullet instances
let bullets = new Array();
let meteors = new Array();
let crewMates = new Array();
let hearts = new Array()
for (i=0;i<3;i++) {
  hearts[hearts.length] = new heart(i);
}
// This variable tracks the time since the player last fired a bullet, we set it
// to 31 as the player can (at the beginning) fire a bullet every 30 frames,
// So this ensure that they don't have to wait 30 frames to fire their first bullet
let bulletDelay = 31;
let meteorDelay = 61;
let crewDelay = 121;
// Initialise global variables
var timer = 0;
var level = 1;
// Initial powerup prices
var boosthealth = 5;
var increasespeed = 7;
var bulletspeedprice = 5

// Initial powerup values
var bulletSpeed = 7.5;
var fireRate = 20;
var hasMagnet = false;

// Game states
let started = false;
let roundOver = false;
let gameOver = false;
function preload() {
  playerSprite = loadImage("/assets/sprite.png");
  crewSprite = loadImage("/assets/crewSprite.png")
  backgroundImage = loadImage("/assets/background.png");
  redLaserSprite = loadImage("/assets/redLaser.png");
  meteorOne = loadImage("/assets/meteor1.png");
  meteorThree = loadImage("/assets/meteor3.png");
  heartSprite = loadImage("/assets/heart.png");
}
function setup() {
  // 768x768 is used here as it was previously 1024x768 (a common resolution)
  // Should probably change to a more common or round number soon like 800x800
  createCanvas(768, 768);
  angleMode(DEGREES);
  frameRate(60);
}
function draw() {
  clear()
  background(0, 0, 40);
  image(backgroundImage, 0, 0, 768, 768);
  let health = player1.getHealth();
  if (hearts.length == 0) {
      //alert("Do you want to increase your health? If so, press the 'h' key");
      gameOver=true;
  }
  if (score < 0) {
    score = 0;
    player1.loseHealth();
  }
  // Main Menu Screen
  if (started == false) {
    stroke(255);
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text("You are the pilot of a spaceship", 384, 234);
    text("but your crewmates have all been ejected!", 384, 284);
    text("Catch your crewmates,", 384, 334);
    text("and destroy or avoid asteroids to save the ship.", 384, 384);
    text("Move the spaceship using the WASD keys",384, 434);
    text("Press space to start", 384, 484);
    if (keyIsDown(32)) {
      started = true;
    }
  }
  else if (roundOver == false && gameOver == false) {
    // Main game loop
    //print score in corner of screen
    text(score, 50, 50);
    text("Level: " + str(level), 384, 50)
    //timer starts counting
    timer ++;
    crewDelay++;
    meteorDelay++;
    if(timer == 1000) {
        roundOver = true;
    }
    if (crewDelay > 120) {
      crewDelay = 0;
      crewMates[crewMates.length] = new crewMate();
    }
    if (meteorDelay > 60) {
      meteorDelay = 0;
      meteors[meteors.length] = new meteor();
    }
    bulletDelay += 1;
    if (keyIsDown(65)) {
      player1.move("a");
    }
    if (keyIsDown(68)) {
      player1.move("d");
    }
    if (keyIsDown(87)) {
      player1.move("w");
    }
    if (keyIsDown(83)) {
      player1.move("s");
    }
    if (keyIsDown(32) && bulletDelay > fireRate) {
      bulletDelay = 0;
      bullets[bullets.length] = new bullet(bulletSpeed);
    }
    if (!keyIsPressed) {
      player1.setRotation(0);
    }
    player1.draw();
    hearts.forEach(function(item, index) {
      item.draw()
    })
    bullets.forEach(function(item, index) {
      item.draw();
    })
    meteors.forEach(function(item, index) {
      item.checkCollision();
      item.draw();
    })
    crewMates.forEach(function(item, index) {
      item.draw()
    })
  }
  else if (roundOver == true) {
    fill('white');
    text(score, 50, 50);

    textSize(25);
    strokeWeight(0);
    text("Upgrade your ship!", 384, 100);
    
    //boost health powerup
    strokeWeight(2);
    fill('yellow');
    rect(50, 150, 200, 100);
    fill('black');
    textSize(16);
    textStyle(BOLD);
    text("Boost Health", 150, 175);
    text("Price:" + boosthealth, 150, 200);
    text("Press 1 to buy", 150, 225);
    //increase speed powerup
    fill('red'); 
    rect(50, 300, 200, 100);
    fill('black');
    textSize(16);
    textStyle(BOLD);
    text("Boost speed by 0.5", 150, 325);
    text("Price:" + increasespeed, 150, 350);
    text("Press 2 to buy", 150, 375);
    fill('white');
    // increase bullet speed powerup
    fill(50, 50, 150); 
    rect(300, 150, 200, 100);
    fill('black');
    textSize(16);
    textStyle(BOLD);
    text("Increase bullet speed", 400, 175);
    text("Price: 5", 400, 200);
    text("Press 3 to buy", 400, 225);
    fill('white');

    // increase fire rate powerup
    fill(255); 
    rect(300, 300, 200, 100);
    fill('black');
    textSize(16);
    textStyle(BOLD);
    text("Increase fire rate", 400, 325);
    text("Price: 7", 400, 350);
    text("Press 4 to buy", 400, 375);
    fill('white');

    // magnet powerup
    fill(100, 255, 100); 
    rect(550, 150, 200, 100);
    fill('black');
    textSize(16);
    textStyle(BOLD);
    text("Buy magnet", 650, 175);
    text("Price: 14", 650, 200);
    text("Press 5 to buy", 650, 225);
    fill('white');
    
    textSize(25);
    strokeWeight(0);
    text("Press n to start a new round.", 384, 600);
    }
    else if (gameOver == true) {
      text("Game Over", 384, 284);
      text("You have " + str(score) + " points, if you have over 5,", 384, 334);
      text("you can buy another life.", 384, 384);
      text("Press h to buy a life", 384, 434);
      text("Press space to go back to the start", 384, 484);
    }
  }
function keyPressed() {
  if (key == "g") {
    meteors[meteors.length] = new meteor();
  }
  if (key == "b") {
    crewMates[crewMates.length] = new crewMate();
  }
  if (key == "c") {
    speed+=1;
    player1.setSpeed(speed)
  }
  if(key == "1" && roundOver == true) {
    if (player1.getHealth() < 3) {
      if(score >= boosthealth) {
        score -= boosthealth;
        player1.gainHealth();
      }
      else {
        alert("You don't have enough points to buy this upgrade!");
      }
    }
    else {
      alert("Sorry, you're on full health!");
    }
  }
  if (key == "2" && roundOver == true) {
    if (score >= increasespeed) {
      score -= increasespeed;
      speed+=1;
      player1.setSpeed(speed)
    }
    else {
      alert("You don't have enough points to buy this upgrade!");
    }
  }
  if (key == "3" && roundOver == true) {
    if (score >= 5) {
      score -= 5;
      bulletSpeed+=2.5;
    }
    else {
      alert("You don't have enough points to buy this upgrade!");
    }
  }
  if (key == "4" && roundOver == true) {
    if (score >= 7) {
      score -= 7;
      fireRate -= 4;
      if (fireRate < 0) {
        fireRate = 0;
      }
    }
    else {
      alert("You don't have enough points to buy this upgrade!");
    }
  }
  if (key == "5" && roundOver == true) {
    if (score >= 14) {
      score -= 14;
      hasMagnet = true;
    }
    else {
      alert("You don't have enough points to buy this upgrade!");
    }
  }
  if (key == "n" && roundOver == true) {
    crewMates.splice(0, crewMates.length);
    meteors.splice(0, meteors.length);
    level++;
    roundOver = false;
    timer = 0;
  }
  if (key == "h" && gameOver) {
    if (score >= 5) {
      score -= 5;
      hearts=[];
      player1.gainHealth();
      gameOver = false;
      meteors.splice(0, meteors.length);
    } else {
      alert("You don't have enough points to buy this upgrade!");
    }
  }
  if (keyCode == 32 && gameOver == true) {
      location.reload();
  }
}