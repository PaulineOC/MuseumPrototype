//Screen controls
var screenWidth;
var screenHeight;

//Leap Motion Controller
var leapController;
var pageMove=false;

//Player Navigator
var pX=screenWidth/2
var pZ=screenHeight-(2*rad); //change to size of image
var rad=35;

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
  switch(currPage){
    case 0:
      background(front_cover_img);
      drawPlayer();
      hotSpot(currPage);
      break;
    case 1:
      if(!page1_finished){
        background(page1_background);
        page1draw();
      } 
      else{
        chosenFruit=curr_selected_word.word;
        background(page1_background);//load other background
        drawPlayer();
        text(pg1Excerpt);
        hotSpot();
      
      }
      break;
    case 2:
      console.log('paulines page');
  }
}

function keyTyped(){
  // keypress for page1
  if (key=="o"){
    currPage++;
    // frontCover= false;
    // pg1= true;
  }
}

function drawPlayer(){
  fill(255,100,100,150); // set color
  noStroke();
  ellipse(pX, pZ, rad);
}

function hotSpot(numb){
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
    
    //Collision w/ Left H0
    if(numb!==0 && pX<h1OffW+radius && pX+rad>h1OffW && pZ<hOffH+radius && pZ+rad>hOffH && pageMove){
        currPage--;
    }
    else if(numb!==4 && pX<h2OffW+radius && pX+rad>h2OffW && pZ<hOffH+radius && pZ+rad>hOffH && pageMove){
      currPage++;
    }
    fill(0,0,0,trans);
    if(numb==0){//title cover
      ellipse(h2OffW-50,hOffH+25,radius,radius);
    }
    else if(numb==4){//back cover
      ellipse(h1OffW,hOffH,radius,radius);
    }
    else{
        ellipse(h1OffW,hOffH,radius,radius);
        ellipse(h2OffW,hOffH,radius,radius);
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

  switch(currPage){
    case 0:
       if(gesture.type=='keyTap'){
        //console.log("his");
        pageMove=true;
      }
      else{
        pageMove=false;
      }
      break;
    case 1:
      if (gesture.type == 'keyTap') {
      tapped=true;
      pageMove;
      }
      else{
        tapped=false;
        pageMove=false;
      }
      break;
  }
 
}
