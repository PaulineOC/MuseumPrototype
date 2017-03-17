var background_img;
var leapController;

var mapped_x = 0;
var mapped_y = 0;
var mapped_z= 0;

var screenWidth = 1000;
var screenHeight = 600;

var choices=[];

var blank1;

var curr_selected_blank;
var curr_selected_word;

// detects if user should move on to next page
var page1_finished= false;

function preload(){
  background_img = loadImage('background.png');
}

function setup() {
  createCanvas(screenWidth,screenHeight);
  
    // set up our leap controller
  leapController = new Leap.Controller({
    enableGestures: true
  });
  
  // every time the Leap provides us with hand data we will ask it to run this function
  leapController.loop( handleHandData );
  
  // handle gestures using a special function as well
  leapController.on("gesture", handleGestures);
  
  
  
  // WORD CHOICE OPTIONS
   // set font
  // textFont("Helvetica");
  // // set a larger text size 
  // textSize(20); 
  // text("apples", 700,130);
  // text("peaches", 700,250);
  // text("avocado", 700,400);
  blank1 = new blank('_______', 320,250);
  var apples = new word('apples', 700,130);
  choices.push(apples);
  var peaches = new word('peaches', 700,250);
  choices.push(peaches);
  var avocado = new word('avocado', 700,400);
  choices.push(avocado);
  

  
}

function draw() {
  // color of text
  fill(0,0,0);
  
  //background
  background(background_img);
  
  // WRITE EXCERPT
  // set font
  textFont("Helvetica");
  // set a larger text size 
  textSize(20); 
   // draw our text
  text("Sally wanted to pick", 130,250);
  
  blank1.drawText();
  
  
  // write word choices on page
   for(var i = 0; i < choices.length; i++){
    choices[i].drawText();
  }

  // guiding circle
  fill(255,100,100,50); // set color
  noStroke();
  ellipse(mapped_x, mapped_z, 60);
  for(var i = 0; i < choices.length; i++){
    choices[i].checkHit();
  }
  
}


// this function runs every time the leap provides us with hand tracking data
// it is passed a 'frame' object as an argument - we will dig into this object
// and what it contains throughout these tutorials
function handleHandData(frame) {

  // make sure we have exactly one hand being detected
  if (frame.hands.length == 1) {
    // get the position of this hand
    var handPosition = frame.hands[0].stabilizedPalmPosition;
    
   // x, y, z
    var x = handPosition[0];
    var y = handPosition[1];
    var z = handPosition[2];
    
    // mapping values
    //x = map(hx, -200, 200, 100, 400);
    //y = map(hy,    0, 500, 500,   0);
    mapped_x = map(x,-150,170,0,screenWidth);
    mapped_z = map(z,-40,120,0,screenHeight);
    
    
  }
}

// our function to handle gestures
function handleGestures(gesture) {
  if (gesture.type == 'keyTap') {
    //curr_selected_word
    if(curr_selected_word != null){
      curr_selected_word.moveText(blank1.x,blank1.z);
      // make other selections disappear
      for(var i = 0; i < choices.length; i++){
        if(choices[i].word != curr_selected_word.word){
          choices[i].moveText(2000,2000);
        }
      } // end of for
    }// end of if
  }
}

//Word Class
function word(word,x,z){
  this.word = word;
  this.x = x;
  this.z = z;
  
  // draw word
  this.drawText = function(){
    textSize(20);
      // set font
    textFont("Helvetica");
    text(this.word,this.x,this.z);
  };
  
  // move word
  this.moveText = function(x, z){
        this.x=x;
        this.z=z;
        this.drawText();
  };
  
  this.checkHit = function (){
    
    if(inRange(mapped_x, this.x)){
      if(inRange(mapped_z, this.z)){
       // register hit
       curr_selected_word = this;
       
      } 
    }
  }
    
}

function blank(word,x,z){
  this.word = word;
  this.x = x;
  this.z = z;
  
  // draw word
  this.drawText = function(){
    textSize(20);
      // set font
    textFont("Helvetica");
    text(this.word,this.x,this.z);
  };
  
  this.checkHit = function (){
  
  if(inRange(mapped_x, this.x)){
    if(inRange(mapped_z, this.z)){
     // register hit
     curr_selected_blank = this;
     
    } 
  }
}
  
    
}

// check if value is in range
function inRange(mapped_val, word_pos){
  var min = word_pos - 50;
  var max = word_pos + 50;
  
  if(min < mapped_val && mapped_val < max){
    return true;
  }
}