
// our Leap motion hand sensor controller object (instantiated inside of 'setup');
var leapController;

//Screen Setup
var screenWidth;
var screenHeight;

// x & y position of our user controlled character
var x = 0;
var z = 0;
var rad =0;

var allFruits=[];
var tree;

var fist=false;
var fruitSelected=false;

//Images
var img;
function setup() {
  
  screenWidth = 800;
  screenHeight = 700;
  
  screenWidth = 1000;
  screenHeight = 700;
  
  x =50;
  z = screenHeight/2;
  rad=25;
  
  createCanvas(screenWidth, screenHeight);

  // grab a connection to our output div
  outputDiv = select('#output');
  
  // set up our leap controller
  leapController = new Leap.Controller({
    enableGestures: true
  });

  // every time the Leap provides us with hand data we will ask it to run this function
  leapController.loop( handleHandData );
  // handle gestures using a special function as well
  leapController.on("gesture", handleGestures);
  noStroke();
  
  
  //Game Setup: 
  var numFruits=1;
  //Tree
  img = loadImage('assets/tree.png');
  tree = new Tree(screenWidth-550,150);
   //draw 3 fruits
   for(var j=0;j<numFruits;j++){
     var randX =random(tree.x+tree.wOffset,(tree.w+1));
     var randY = random(tree.y+tree.hOffset,(tree.h+1));
     var radius=random(50,40);
      allFruits.push(new Fruit(randX, randY,radius, radius));
   }
   
 // var player= new player();
   
}

function draw() {
  if(fist){
    background(0,0,150);
  }
  else{
      background(0,0,0);
  }
  
  tree.drawTree();
  for(var j=0;j<allFruits.length;j++){
    if(x<allFruits[j].x+allFruits[j].rW && x+rad>allFruits[j].x){
      if(z<allFruits[j].y+allFruits[j].rH && z+rad>allFruits[j].y){
        
        allFruits[j].hover=true;
        
        if(fist){
          allFruits[j].firstPick=true;
          allFruits[j].selected =true;
          allFruits[j].b=250;
          allFruits[j].drawFruit(x,z);
        }
      
      
      }//end of y collision 
    }//end of x collisions
    else{
      allFruits[j].b=0;
      allFruits[j].selected=false;
      allFruits[j].hover=false;
    }
    
    allFruits[j].drawFruit();

  

      
  }//end of for
      

  fill(255);
  noStroke();
  ellipse(x, z, rad, rad);
  

}//END OF DRAW

//Game objects: 

//Fruit
function Fruit(x,y,r1,r2){
  this.x=x;
  this.y=y;
  this.r=255;
  this.g=0;
  this.b=0;
  this.alpha=255;
  this.rW=r1;
  this.rH=r2;
  this.selected = false;
  this.firstPick = false;
  this.hover=false;
  this.drawFruit = function(xNew, yNew){
    fill(this.r, this.g, this.b, this.a);
    noStroke();
    if(this.hover){
      stroke(255,255,0);
      strokeWeight(4);
    }
    if(this.selected){
      if(xNew && yNew){
        this.x = xNew;
        this.y=yNew;
      }
    }//end of selected 
    if(this.firstPick && !this.selected){
        this.y+=0.5;
      }
    ellipse(this.x, this.y, this.rW, this.rH);
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
    
    if(checkFist(frame)){
      fist=true;
    }
    else{
      fist=false;
    }
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
  if (gesture.type == 'screenTap') {
  // console.log(gesture);
   
  }
}


