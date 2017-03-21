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
// var pg3=false;
// var pg4=false;
var backCover =false;

// images
var front_cover_img;
var back_cover_img;
var page1_background;


//Load Images
function preload(){
  front_cover_img = loadImage('assets/start/book_front_cover.png');
  back_cover_img = loadImage('assets/end/book_back_cover.png');
  page1_background = loadImage('assets/page1/pages1_2.png');
}

function setup() {
  //Screen Setup
    screenWidth=1000;
    screenHeight=600;
    
    createCanvas(screenWidth, screenHeight);
    outputDiv = select('#output');
    //set up our leap controller
    leapController = new Leap.Controller({
      enableGestures: true
    });
    
    leapController.loop( handleHandData );
    leapController.on("gesture", handleGestures);
    noStroke();
  
    
    // setup page1
    page1setup();
    
    // setup page3
    

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
      background(page1_background);
          // guiding circle
           // draw our text
      fill(0);
      text(excerpt, 160,250);
      fill(255,100,100,50); // set color
      noStroke();
      ellipse(mapped_x, mapped_z, 60);
      // load the tree with fruit 
      
      // point user to go on to next page 

    }
  }
  // else if(pg3){
  //   p3.Open();
  //   // if(pg3Start){
  //   //   if(pg3GameStart){
  //   //     p3.game();
  //   //   }
  //   // }
  //   // else if(pg3Finished){
  //   //   //show finished pg
  //   // }
  // }
  // else if(pg4){
  //   if(pg4Start){
  //     //start pg
  //   }
  //   else if(pg4Finished){
  //     //show finished pg
  //   }
  // }
  // else if(backCover){
    
  // }
  
}//end of draw


function keyTyped(){
  // keypress for page1
  if (key=="o"){
    frontCover= false;
    pg1= true;
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
    x = map(hx, -250, 195, 0, screenWidth);
    y = map(hy,    0, 500, 500,   0);
    z = map(hz,    -170, 200, 0,   screenHeight);
  }
}

// our function to handle gestures
function handleGestures(gesture) {
  
  if(pg1){
    if (gesture.type == 'keyTap') {
      if(curr_selected_word != null){
        curr_selected_word.moveText(blank1.x,blank1.z);
        // make other selections disappear
        for(var i = 0; i < choices.length; i++){
          if(choices[i].word != curr_selected_word.word){
            choices[i].moveText(2000,2000);
          }
        } // end of for
         excerpt+=' '+curr_selected_word.word;
        page1_finished = true;
      }// end of if
    }
    
  }
  
  
  
  // if(pg3){
  //   if(gesture.type == 'keyTap'){
  //   //madeTap=true;
  //     if(!grid[thisX][thisY].selected){
  //         grid[thisX][thisY].selected =true;
  //         grid[thisX][thisY].dying =true;
          
  //       //Add score
  //       //If poisonous - need to  stop affecting other apples? 
  //         if(grid[thisX][thisY].alive==true && grid[thisX][thisY].type=='good'){
  //           goodF++;
  //         }
  //         else if(grid[thisX][thisY].alive==true && grid[thisX][thisY].type=='bad'){
  //           badF++;
  //           deathFactor-=2;
  //           if(deathFactor<=2){
  //             deathFactor=2;
  //           }
  //         }
  //     }
  //   }
  // }//pg3 
  
}//end of 
