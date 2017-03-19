//Screen controls
var screenWidth;
var screenHeight;

//Leap Motion Controller
var leapController;

//Player Navigator
var pX=screenWidth/2
var pY=screenHeight-(2*rad); //change to size of image
var rad=50;

//Book Controls
var frontCover=true;
var pg1=false;
var pg2=false;
var pg3=false;
var pg4=false;
var backCover =false;

//Extra Images


function setup() {
  //Screen Setup
    screenWidth=1000;
    screenHeight=600;
    createCanvas(screenWidth, screenHeight);

  //Leap Motion Controller
    outputDiv = select('#output');
    // set up our leap controller
    leapController = new Leap.Controller({
      enableGestures: true
    });
    leapController.loop( handleHandData );
    leapController.on("gesture", handleGestures);
    noStroke();
}//end of setup

function draw() {
  if(frontCover){
    background(148);
    
  }
  else if(pg1){
    if(pg1Start){
      //start pg
    }
    else if(pg1Finished){
      //show finished pg
    }
  }
  else if(pg2){
    if(pg2Start){
      //start pg
    }
    else if(pg2Finished){
      //show finished pg
    }
  }
  else if(pg3){
    if(pg3Start){
      //start pg
    }
    else if(pg3Finished){
      //show finished pg
    }
  }
  else if(pg4){
    if(pg4Start){
      //start pg
    }
    else if(pg4Finished){
      //show finished pg
    }
  }
  else if(backCover){
    
  }
  
}//end of draw




//Leap Motion Stuff


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

// our function to handle gestures
function handleGestures(gesture) {
// console.log("got a gesture ...");
// console.log(gesture.type);
  if (gesture.type == 'screenTap') {
  // console.log(gesture);
   
  }
}