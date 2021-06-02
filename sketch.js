var bg, bgImg;
var ground;
var player, playerImg;
var corona, coronaImg;
var start, startImg;
var heart;
var playButton, playImg;
var immune, imGroup;
var obstacle, obstacleImg ,obGroup;
var mask1, mask1Img, mask2, mask2Img;
var sanitizer, sanitizerImg;
var vaccine, vaccineImg;

var life = 3;
var score = 0;

var gameState = "start";

function preload(){
  bgImg = loadImage("road4.jpg");
  coronaImg = loadImage("corona.png");
  startImg = loadImage("bg1.png");
  heart = loadImage("heart.png");
  playImg = loadImage("playButon.png");
  playerImg = loadAnimation("man1.png","man2.png","man3.png","man4.png","man5.png","man6.png","man7.png","man8.png");
  obstacleImg = loadImage("crowd1.png");
  mask1Img = loadImage("mask1.png");
  mask2Img = loadImage("mask2.png");
  sanitizerImg = loadImage("sanitizer.png");
  vaccineImg = loadImage("vaccine.png");
}

function setup(){
  createCanvas(1400,700);

  imGroup = new Group();
  obGroup = new Group();

  bg = createSprite(700,350,1400,700);
  bg.addImage("back",bgImg);
  bg.scale = 2;
  bg.velocityX = -7;
  bg.visible = false;
 
  start = createSprite(700,350,1400,700);
  start.addImage("starting",startImg);
  start.scale = 0.8;

  corona= createSprite(120,335,1400,700);
  corona.addImage("Covid-19",coronaImg);
  corona.scale = 0.4;
  corona.visible = false;

  playButton = createSprite(700,350,200,100);
  playButton.addImage("play",playImg);
  playButton.scale = 0.6;

  ground = createSprite(700,370,1400,25);
  ground.visible = false;

  player = createSprite(250,335,30,80);
  player.addAnimation("Insaan",playerImg);
  player.scale = 0.3;
  player.visible = false;
}

function draw(){
  background(0);

  drawSprites();

  fill("black");
  textSize(40);
  text("SCORE : "+score,1000,50);


  if(gameState === "start"){
    if(mousePressedOver(playButton)){
      gameState = "play";
    
    }

  }
  
if(gameState === "play"){
    start.visible = false;
    playButton.visible = false;
    bg.visible = true;
    player.visible = true;
    ground.visible = false;
    corona.visible = true;

    //player.collide(ground);

    corona.y = player.y;

    if(bg.x>0){
      bg.width = bg.width/2;
    }

  if(keyDown("space")){
    player.velocityY = -10;

  }
  player.velocityY = player.velocityY+0.5;

  var num = Math.round(random(1,2));

  if(num === 1){
    createImmunity();

  }

  if(num === 2){
    createObstacles();

  }

  createMask();
  createSanitizer();
  createVaccine();

  if(player.isTouching(obGroup)){
    obGroup.destroyEach();
    life = life-1;

  }

  if(player.isTouching(imGroup)){
    imGroup.destroyEach();
    score = score+10;

  }

  if(life === 3){
    image(heart,50,40,70,70);
    image(heart,110,40,70,70);
    image(heart,180,40,70,70);

  }

  if(life === 2){
    image(heart,50,50,70,70);
    image(heart,110,50,70,70);

  }

  if(life === 1){
    image(heart,50,50,70,70);
  
  }

  if(life === 0){
    gameState = "end";

  }

  if(player.isTouching(vaccine)){
    imGroup.destroyEach();
    obGroup.destroyEach();
    
    fill("green");
    textSize(50);
    text("YOU WON",700,350);
  }
}

  if(gameState === "end"){
    imGroup.destroyEach();
    obGroup.destroyEach();
    
    fill("red");
    textSize(50);
    text("GAME OVER",700,350);

  }

}

function createObstacles(){
  if(frameCount % 200 === 0){
    var obstacle = createSprite(1400,325,30,80);
    obstacle.shapeColor = "red";
    obstacle.velocityX = -7;
    obGroup.add(obstacle);

  }
}

function createImmunity(){
  if(frameCount % 400 === 0){
    var immune = createSprite(1400,325,30,80);
    immune.shapeColor = "green";
    immune.velocityX = -7;
    imGroup.add(immune);

  }
}

function createMask(){
  if(frameCount % 500 === 0){
    var mask = createSprite(1400,350,30,80);
    mask.addImage("mouser",mask1Img);
    mask.velocityX = -7;
  }
}

function createSanitizer(){
  if(frameCount % 600 === 0){
    var sanitizer = createSprite(1400,325,30,80);
    sanitizer.addImage("shudhta",sanitizerImg);
    sanitizer.velocityX = -7;
  }
}

function createVaccine(){
  if(frameCount % 2500 === 0 ){
    var vaccine = createSprite(1400,325,30,80);
    vaccine.addImage("injection",vaccineImg);
    vaccine.velocityX = -7;

  }
}

