
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

var mouse=false;
var hand=false;

// x & y position of our user controlled character
var x = 0;
var z = 0;
var rad =0;

//Other Game Objects
var allFruits=[];
var tree;
var bucketX=125;
var bucketY=650;
var bucketW=150;
var bucketH=75;

var fist=false;
var fruitSelected=false;
var madeTap=false;

//Images
var img;
var img2;
var backgroundImg





//BOARD GAME STUFF
var sizeG = 5;
var grid;
var currObj=null
var thisX=null;
var thisY=null;
var goodF=0;
var badF=0;


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
    
  //Player control
  x =50;
  z = screenHeight/2;
  rad=15;
  
  
  
  var tmpCount=0;
  var gridX=screenWidth-550;
  //starts at 450
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
    //hand controller
  
      
       if(fist){
        background(0,0,150);
      }
      else{
        background(128);
      }
      
      image(backgroundImg,0,0);

      for(var i=1;i<=5;i++){
        for(var j=1;j<=5;j++){
          var radius=random(25,40);

          if(x<grid[i][j].x+grid[i][j].rW && x+rad>grid[i][j].x){
            if(z<grid[i][j].y+grid[i][j].rH && z+rad>grid[i][j].y){
              

              thisX=i;
              thisY=j;
              
               if(!grid[i][j].selected){
                grid[i][j].hover=true;
              }


            }
          }
          else{
            grid[i][j].hover=false;
          }
          grid[i][j].drawFruit();
          
        }
      }
      
      fill(0);
      noStroke();
      ellipse(x, z, rad, rad);
      
      // tint(0, 0, 25, 50);  // Tint blue and set transparency
      // image(img2,x,y);
    
    
  }//end of game start/playing
 

}//END OF DRAW

//Game objects: 

//Fruit
function Fruit(x,y,r1,r2){
  this.x=x;
  this.y=y;
  this.rW=r1;
  this.rH=r2;

  //Color and Type
  var tmp= random(0,1);
  console.log(this.type);
  if(tmp>=.5){
    this.type='good'
    
  }
  else{
    this.type='bad'
  }
  this.r=0;
  this.g=0;
  this.b=0;
  
  this.trans=255;

  
  
  this.selected = false;
  this.hover=false;
  
  
  
  this.drawFruit = function(){
    noStroke();
    if(this.hover&&!this.selected){
      stroke(255,255,0);
      strokeWeight(2);
    }
    if(this.selected){
      this.trans-=10;
      if(this.trans<=0){
        console.log('respawn here');
      }
  
    }//end of selected
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
    }//end of drawFruit
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




//COLLISION TESTING;
function collision(otherX, otherY){
  
  
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
  //this.x2 = this.x+50;
  //this.y2 =this.y+25;
  
  this.drawText = function(){
    textSize(28);
    textFont("Georgia");
    fill(this.r,this.g,this.b);
    text(this.word,this.x,this.y,this.x2,this.y2);
    this.len=textWidth(this.word);
  };
}


function keyTyped(){
  if(!start && key=="s"){
    start=true;
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
// console.log("got a gesture ...");
// console.log(gesture.type);
  if(gesture.type == 'keyTap'){
    //madeTap=true;
    if(!grid[thisX][thisY].selected){
        grid[thisX][thisY].selected =true;
       console.log('chosen fruit');
       //Add score
       //If poisonous - need to  stop affecting other apples? 
        if(grid[thisX][thisY].type=='good'){
          goodF++;
        }
        else{
          badF++;
        }
    }
  }
  else{
    madeTap=false;
    console.log(madeTap);
  }
}




