var background_img;
var leapController;

var mapped_x = 0;
var mapped_y = 0;
var mapped_z= 0;

var screenWidth = 1280;
var screenHeight = 800;

var choices=[];

var blank1;

var curr_selected_blank;
var curr_selected_word;

// detects if user should move on to next page
var page1_finished= false;

var excerpt = "Sally wanted to pick";


function page1setup() {

  blank1 = new blank('_______', 320,250);
  var apples = new word('apples', 650,160);
  choices.push(apples);
  var peaches = new word('cherries', 650,280);
  choices.push(peaches);
  var avocado = new word('apricots', 650,400);
  choices.push(avocado);
  
}



function page1draw() {
  // color of text
  fill(0,0,0);
  
  //background
  //background(background_img);
  
  // WRITE EXCERPT
  // set font
  textFont("Helvetica");
  // set a larger text size 
  textSize(20); 
   // draw our text
  text(excerpt, 160,250);
  
  blank1 = new blank('_______', 360,250);
  blank1.drawText();
  
  
  // write word choices on page
   for(var i = 0; i < choices.length; i++){
    choices[i].drawText();
  }

  // guiding circle
  if(!page1_finished){
    fill(255,100,100,50); // set color
    noStroke();
    ellipse(mapped_x, mapped_z, 60);
  }
  
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

// // our function to handle gestures
// function handleGestures(gesture) {
  
// }

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
  
  //alpha for fading out 
  
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
  // return false
  return false;
}
