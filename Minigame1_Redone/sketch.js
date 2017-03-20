

// our Leap motion hand sensor controller object (instantiated inside of 'setup');
var leapController;

//Screen Setup
var screenWidth;
var screenHeight;

//Game states
var begin=true;
var start=false;
var appleSuccess=0;
var win=false;
var greeting;


var fist=false;

//Images
var img;
var img2;
var backgroundImg


//BOARD GAME STUFF

var sizeG = 4;
var grid;
var currObj=null
var thisX=null;
var thisY=null;
var goodF=0;
var badF=0;
var deathFactor=0;

var timeDone=false;
var time=10;

//Other Game Objects
var tree;
var fruitType='apples';


// x & y position of our user controlled character
var x = mouseX;
var z = mouseY;
var rad =0;


function setup() {
  screenWidth = 1000;
  screenHeight = 700;
  
  createCanvas(screenWidth, screenHeight);
  //background image:
  backgroundImg=loadImage('assets/background.png');
  // grab a connection to our output div
  outputDiv = select('#output');
  // set up our leap controller
  leapController = new Leap.Controller({
    enableGestures: true
  });
  // every time the Leap provides us with hand data we will ask it to run this function
  leapController.loop( handleHandData );
  //handle gestures using a special function as well
  leapController.on("gesture", handleGestures);
  noStroke();
  
  //Game overview:
  greeting = new word("Hello! Please press S",windowWidth/4,windowHeight/2,0,0,255);
  //Hand test
  img2 = loadImage('assets/hand2.png');
  

//Actual Game:
  //Score
  scoreGood= new word("Good "+fruitType+"s:", windowWidth/4,windowHeight/4,0,0,255);
  scoreBad= new word("Bad "+fruitType+"s:", windowWidth/4,windowHeight/2,0,0,255);
  //Player control
  x =50;
  z = screenHeight/2;
  rad=15;
  
  var tmpCount=0;
  var gridX=screenWidth-550;
  var gridY=250;
  var boxSize=55;
  //GRID:
    grid = new Array();
    for(var i=1;i<=sizeG;i++){
      grid[i]=new Array();
      for(var j=1;j<=sizeG;j++){
        var radius=random(25,35);
        grid[i][j]=new Fruit(i*boxSize+gridX-(.5*radius), j*boxSize+gridY-(.5*radius),radius, radius);
        tmpCount++;
      }
    }
    //Tree
    img = loadImage('assets/tree.png');
    tree = new Tree(screenWidth-550,150);
}

function draw() {
  if(begin){
    background(149);
    greeting.drawText();
    //tint(0, 0, 0, 25);  // Tint blue and set transparency
    //image(img2,500,500);
  }
  if(start){
      
      image(backgroundImg,0,0);
      timer();
      
      //timer still running
      scoreGood.drawText(goodF);
      scoreBad.drawText(badF);
      if(!timeDone){
        
        for(var i=1;i<=sizeG;i++){
        for(var j=1;j<=sizeG;j++){
          
          if(grid[i][j].alive){
            if(x<grid[i][j].x+grid[i][j].rW && x+rad>grid[i][j].x){
              if(z<grid[i][j].y+grid[i][j].rH && z+rad>grid[i][j].y){
               thisX=i;
               thisY=j;
               
                if(!grid[i][j].selected && grid[i][j].alive && !grid[i][j].dying){
                  grid[i][j].hover=true;
                }
              }
            }
            else{
              grid[i][j].hover=false;
            }
            
            
            grid[i][j].drawFruit();
            //Apples die out
            grid[i][j].currLife++;
            if(grid[i][j].currLife>=grid[i][j].lifeSpan){
                grid[i][j].currLife=0;
                grid[i][j].alive=false;
            }
          }//end of alive
          
          else{//not alive apple
            grid[i][j].currFrame++;
            if(grid[i][j].currFrame>=grid[i][j].targetFrame){
                grid[i][j].spawnFruit();
                grid[i][j].currFrame=0;
            }
          }
        }//end of inner for
      }//end of outer for
    }//Timer
    
    fill(0);
    noStroke();
    ellipse(mouseX, mouseY, rad, rad);
    x=mouseX;
    z=mouseY;
    
    
  }//end of game start/playing
 

}//END OF DRAW

//Game objects: 

//Fruit
function Fruit(x,y,r1,r2){
  this.x=x;
  this.y=y;
  this.rW=r1;
  this.rH=r2;
  //Living conditions
  this.alive=false;
  this.dying=false;
  
  this.targetFrame = int(random(50,250));
  this.currFrame=0;
  
  this.lifeSpan=int(random(50,150));
  this.currLife=0;
  
  this.trans=255;
  this.type;
  //Color
  this.r=0;
  this.g=0;
  this.b=0;

  this.selected = false;
  this.hover=false;
  
  this.spawnFruit= function(firstTime){
    var tmp= random(0,2);
    if(tmp>=.5){
      this.type='good';
    }
    else{
      this.type='bad';
      deathFactor+=1.5;
      console.log("adding bad apple "+deathFactor);

    }
    this.selected=false;
    // this.dying=false;
    this.hover=false;
    this.trans=255;
    this.alive=true;
    if(!firstTime){
      this.targetFrame=int(random(50,250));
      this.lifeSpan = int(random(200,500));
    }
  }//end of spawnFruit
  
  this.drawFruit = function(){
      noStroke();
      if(this.selected && this.alive){
        this.dying=true;
        this.trans-=10;
        if(this.trans<=0){
            this.alive=false;
        }
      }//end of selected
      
      if(this.hover&&!this.selected && !this.dying && this.alive){
        stroke(255,255,0);
        strokeWeight(2);
      }
      
       this.trans-=.25*deathFactor;
        if(this.trans<=0){
            this.alive=false;
        }
      
      if(this.alive){
        if(this.type=='good'){
        this.r=255;
        this.g=0;
        this.b=0;
        fill(this.r, this.g, this.b, this.trans);
        }
        else{
          this.r=0;
          this.g=0;
          this.b=0;
          fill(this.r, this.g, this.b, this.trans);
      }
        ellipse(this.x, this.y, this.rW, this.rH);
      }
  }
}

//Tree
function Tree(x,y,w,h){
  this.x=x;
  this.y=y;
  this.wOffset = 85;
  this.hOffset=78;
  this.w=this.x+430+this.wOffset;
  this.h=this.y+232+this.hOffset;
  this.drawTree = function(){
    image(img,x,y);
  }
}


//Word Class
function word(word,x,y,r,g,b){
  this.word=word;
  this.x=x;
  this.y=y;
  this.r=r;
  this.g=g;
  this.b=b;
  this.len=0;
  
  this.drawText = function(extraT){
    textSize(28);
    textFont("Georgia");
    fill(this.r,this.g,this.b);
    text(this.word+" "+extraT,this.x,this.y,this.x2,this.y2);
    this.len=textWidth(this.word);
  };
}


function keyTyped(){
  if(!start && key=="s"){
    start=true;
  }
}

function timer() {
  //every sixty frame count
  if(frameCount % 60 === 0) {
    time -= 1;
  }
  
  if(time>=0){
    textSize(12);
    text("Seconds: " + time, 20, 50);
  }
  else{
    timeDone = true;
    textSize(12);
    text("Seconds: " + 0, 20, 50);
  }
  
}



//LEAP MOTION STUFF

// this function runs every time the leap provides us with hand tracking data
// it is passed a 'frame' object as an argument - we will dig into this object
function handleHandData(frame) {
  if (frame.hands.length == 1) {
    var handPosition = frame.hands[0].stabilizedPalmPosition;//palm position
    // grab the x, y & z components of the hand position
    // these numbers are measured in millimeters
    var hx = handPosition[0];
    var hy = handPosition[1];
    var hz = handPosition[2];
    // x is left-right, y is up-down, z is forward-back
    x = map(hx, -250, 195, 0, screenWidth);
    y = map(hy,    0, 500, 500,   0);
    z = map(hz,    -170, 200, 0,   screenHeight);
  }
}


//CHECKING IS FIST (from stackoverflow)
const minValue = 0.6;
function getExtendedFingers(hand){
   var f = 0;
   for(var i=0;i<hand.fingers.length;i++){
      if(hand.fingers[i].extended){
         f++;
      }
   }
   return f;
}

function checkFist(hand){
   var sum = 0;
   for(var i=0;i<hand.fingers.length;i++){
      var finger = hand.fingers[i];
      var meta = finger.bones[0].direction();
      var proxi = finger.bones[1].direction();
      var inter = finger.bones[2].direction();
      var dMetaProxi = Leap.vec3.dot(meta,proxi);
      var dProxiInter = Leap.vec3.dot(proxi,inter);
      sum += dMetaProxi;
      sum += dProxiInter
   }
   sum = sum/10;

   if(sum<=minValue && getExtendedFingers(hand)==0){
       return true;
   }else{
       return false;
   }
}


// our function to handle gestures
function handleGestures(gesture) {

  if(gesture.type == 'keyTap'){
    //madeTap=true;
    if(!grid[thisX][thisY].selected){
        grid[thisX][thisY].selected =true;
        grid[thisX][thisY].dying =true;
        
       //Add score
       //If poisonous - need to  stop affecting other apples? 
        if(grid[thisX][thisY].alive==true && grid[thisX][thisY].type=='good'){
          goodF++;
        }
        else if(grid[thisX][thisY].alive==true && grid[thisX][thisY].type=='bad'){
          badF++;
        }
    }
  }
  else{
    madeTap=false;
  }
}

function mouseClicked(){
  
  if(grid[thisX][thisY] && !grid[thisX][thisY].selected){
        grid[thisX][thisY].selected =true;
        grid[thisX][thisY].dying =true;
        
       //Add score
       //If poisonous - need to  stop affecting other apples? 
        if(grid[thisX][thisY].alive==true && grid[thisX][thisY].type=='good'){
          goodF++;
        }
        else if(grid[thisX][thisY].alive==true && grid[thisX][thisY].type=='bad'){
          badF++;
          deathFactor-=2;
          if(deathFactor<=2){
            deathFactor=2;
          }
          console.log("removing bad apple "+deathFactor);
        }
    }
  
  
  
}



