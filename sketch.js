    var path,mainCyclist;
    var player1,player2,player3;
    var pathImg,mainRacerImg1,mainRacerImg2;

    var oppPink1Img,oppPink2Img;
    var oppYellow1Img,oppYellow2Img;
    var oppRed1Img,oppRed2Img;
    var gameOverImg,cycleBell;

    var pinkCG, yellowCG,redCG; 

    var obs1,obs2,obs3;
    var ob1,ob2,ob3;

  

    var END =0;
    var PLAY =1;
    var gameState = PLAY;

    var distance=0;
    var gameOver, restart;

  function preload(){

    pathImg = loadImage("Road.png");

    mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
    mainRacerImg2 = loadAnimation("mainPlayer3.png");
    
    oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
    oppPink2Img = loadAnimation("opponent3.png");
    
    oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
    oppYellow2Img = loadAnimation("opponent6.png");
    
    oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
    oppRed2Img = loadAnimation("opponent9.png");

    obst1Img = loadImage("obstacle1.png");
    obst2Img = loadImage("obstacle2.png");
    obst3Img = loadImage("obstacle3.png");
    
    
    cycleBell = loadSound("bell.mp3");
    
    gameOverImg = loadImage("gameOver.png");
}

function setup(){
   
    createCanvas(1200,300);
    // Moving background
    path=createSprite(100,150);
    path.addImage(pathImg);
    path.velocityX = -5;

    //creating boy running
    mainCyclist  = createSprite(70,150);
    mainCyclist.scale=0.07;
      
    //set collider for mainCyclist
    mainCyclist.setCollider("rectangle",0,0,400,400);
    mainCyclist.debug = true
    gameOver = createSprite(350,150);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.8;
    gameOver.visible = false;  
    
    pinkCG = new Group();
    yellowCG = new Group();
    redCG = new Group();
    obs1 = new Group();
    obs2 = new Group();
    obs3 = new Group();

      
}

function draw() {
    background(0);
    
    drawSprites();
    textSize(20);
    fill(255);
    text("Distance: "+ distance,900,30);
    
  if(gameState===PLAY){
    mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 === 0) {
    if (select_oppPlayer === 1) {
      pinkCyclists();
    }

    else if (select_oppPlayer === 2) {
      yellowCyclists();
    }

    else {
      redCyclists();
    }
  }

  var select_obstacle = Math.round(random(1,3));
  console.log(select_obstacle);

  if (World.frameCount % 150 === 0) {
    if (select_obstacle === 1) {
      obstacles_1();
    }

    else if (select_obstacle === 2) {
     obstacles_2();
    }

    else {
     obstacles_3();
    }
  }

  
  if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     // player1.addImage(oppoPink2Img);
     player1.addAnimation( "opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img );
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
  }
  

  else if (gameState === END) {
      gameOver.visible = true;
      //Add code to show restart game instrution in text here
      text("press UP ARROW to reset the game" ,200,250);
      if (keyDown("up_arrow")){
        reset();
      }
       
      path.velocityX = 0;
      mainCyclist.velocityY = 0;
      mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
      
    
      pinkCG.setVelocityXEach(0);
      pinkCG.setLifetimeEach(-1);
    
      yellowCG.setVelocityXEach(0);
      yellowCG.setLifetimeEach(-1);
    
      redCG.setVelocityXEach(0);
      redCG.setLifetimeEach(-1);
  }
  if(obs1.isTouching(mainCyclist)){
    gameState = END;
    obs1.velocityY = 0;
    
    
   }
   
   if(obs2.isTouching(mainCyclist)){
     gameState = END;
     obs2.velocityY = 0;
     
   }
   
   if(obs3.isTouching(mainCyclist)){
     gameState = END;
     obs3.velocityY = 0;
     
   }
   


 if (gameState === END) {
    gameOver.visible = true;
      
      
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
      
    
    obs1.setVelocityXEach(0);
    obs1.setLifetimeEach(-1);
    
    obs2.setVelocityXEach(0);
    obs2.setLifetimeEach(-1);
    
    obs3.setVelocityXEach(0);
    obs3.setLifetimeEach(-1);

      
      //write condition for calling reset( )
     // reset();
  }
}



function pinkCyclists(){
    player1 =createSprite(1100,Math.round(random(50, 250)));
    player1.scale =0.06;
    player1.velocityX = -(6 + 2*distance/150);
    player1.addAnimation("opponentPlayer1",oppPink1Img);
    player1.lifetime=170;
    pinkCG.add(player1);
}

function yellowCyclists(){
    player2 =createSprite(1100,Math.round(random(50, 250)));
    player2.scale =0.06;
    player2.velocityX = -(6 + 2*distance/150);
    player2.addAnimation("opponentPlayer2",oppYellow1Img);
    player2.lifetime=170;
    yellowCG.add(player2);
}

function redCyclists(){
    player3 =createSprite(1100,Math.round(random(50, 250)));
    player3.scale =0.06;
    player3.velocityX = -(6 + 2*distance/150);
    player3.addAnimation("opponentPlayer3",oppRed1Img);
    player3.lifetime=170;
    redCG.add(player3);
}

 

function obstacles_1(){
    var ob1 =createSprite(1200,Math.round(random(50, 250)));
    ob1.velocityX = -(6 + 2*distance/150);
    ob1.scale =0.06;
    ob1.addImage(obst1Img);
    ob1.lifetime=170;
    obs1.add(ob1);
}

function obstacles_2(){
    var ob2 =createSprite(1200,Math.round(random(50, 250)));
    ob2.velocityX = -(6 + 2*distance/150);
    ob2.scale =0.06;
    ob2.addImage(obst2Img);
    ob2.lifetime=170;
    obs2.add(ob2);
}

function obstacles_3(){
    var ob3 =createSprite(1200,Math.round(random(50, 250)));
    ob3.scale =0.06;
    ob3.velocityX = -(6 + 2*distance/150);
    ob3.addImage(obst3Img);
    ob3.lifetime=170;
    obs3.add(ob3);
}

//create reset function here
function reset(){
    gameState=PLAY;
    gameOver.visible=false;
    mainCyclist.changeAnimation("SahilRunning", mainRacerImg1);
    pinkCG.destroyEach();
    redCG.destroyEach();
    yellowCG.destroyEach();
    obs1.destroyEach();
    obs2.destroyEach();
    obs3.destroyEach();
    distance=0;
 }




 
  