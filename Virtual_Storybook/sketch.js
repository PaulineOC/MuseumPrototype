//Screen controls
var screenWidth;
var screenHeight;

//Leap Motion Controller
var leapController;
var pinch=true;

//Player Navigator
var pX=screenWidth/2
var pZ=screenHeight-(2*rad); //change to size of image
var rad=30;

//Book Controls
var currPage=0;


var frontCover=true;
var pg1=false;
// var pg3=false;
var chosenFruit;
// var pg4=false;
var backCover =false;
//Hotspot transparency
var trans=250;
var fall=true;


// images
var front_cover_img;
var back_cover_img;
var page1_background;
//var p1_backgroundApple;

var pg3background1;
var pg3background2;
var pg3background3;
var apple;
var appleH;
var apricot;
var apricotH;
var cherry;
var cherryH;

//Load Images
function preload(){
  front_cover_img = loadImage('assets/start/book_front_cover.png');
  back_cover_img = loadImage('assets/end/book_back_cover.png');
  //Page1 Stuff
  page1_background = loadImage('assets/page1/pages1_2.png');
  //Page 3 background complete
  
  
  //Page3 Stuff
  pg3background1=loadImage('assets/page3/pages3_4.png');
  pg3background2=loadImage('assets/page3/pages3_4_tree.png');
  //pg3background3=loadImage('assets/page3/');
  apple=loadImage('assets/page3/fruit/apple.png');
  appleH=loadImage('assets/page3/fruit/apple_hover.png');
  apricot=loadImage('assets/page3/fruit/apricot.png');
  apricotH=loadImage('assets/page3/fruit/apricot_hover.png');
  cherry=loadImage('assets/page3/fruit/cherries.png');
  cherryH=loadImage('assets/page3/fruit/cherry_hover.png');
  //Page 3 background complete
}

function setup() {
  //Screen Setup
    screenWidth=1280;
    screenHeight=1024;
    createCanvas(screenWidth, screenHeight);
    
  //Page setups
    page1setup();
    //setup page3
    
  //Leap stuff
    outputDiv = select('#output');
    //set up our leap controller
    leapController = new Leap.Controller({
      enableGestures: true
    });
    leapController.loop( handleHandData );
    leapController.on("gesture", handleGestures);
    noStroke();
}

function draw() {
  
  
  
  
  
  
  if(frontCover){
    background(front_cover_img);
  }
  else if(pg1){
    if(!page1_finished){
      //start pg1
      background(page1_background);
      page1draw();
    }
    else{
      chosenFruit=curr_selected_word.word;
      background(page1_background);
      text(pg1Excerpt);
      hotSpot();
      fill(255,100,100,50); // set color
      noStroke();
      ellipse(pX, pZ, 50);
      
      //console.log(pg1pg1Excerpt);
      //load other background
    }
  }
 
  
}//end of draw


function keyTyped(){
  // keypress for page1
  if (key=="o"){
    frontCover= false;
    pg1= true;
  }
}


function hotSpot(){
    var h1OffW=166+50
    var h2OffW=screenWidth-166-50;
    var hOffH=screenHeight-150;
    var radius=50;
    
    if(fall){
      trans-=2;
      if(trans<=0){
        fall=false;;
      }
    }
    else{
      trans+=2;
      if(trans>=250){
        fall=true;
      }
    }
    fill(0,0,0,trans);
    ellipse(h1OffW,hOffH,radius,radius);
    ellipse(h2OffW,hOffH,radius,radius);
    
    //Collision w/ Left H0
    if(pX<h1OffW+radius && pX+rad>h1OffW && pZ<hOffH+radius && pZ+rad>hOffH ){
        
        console.log('REALLY CONECTING');
  
      
    }
    else if(pX<h2OffW+radius && pX+rad>h2OffW && pZ<hOffH+radius && pZ+rad>hOffH){
      console.log('hi2');
    }
        

}


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
    pX = map(hx, -200, 150, 166, screenWidth-166);
    pY = map(hy,    0, 500, 500,   0);
    pZ = map(hz,    -5, 70, 150,   screenHeight-150);
  }
}


function handleGestures(gesture) {
  if(pg1){
    if (gesture.type == 'keyTap') {
      tapped=true;
    }
    else{
      tapped=false;
    }
  }//pg1 controls
}//end of 
