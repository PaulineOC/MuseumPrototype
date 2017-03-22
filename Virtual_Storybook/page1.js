// detects if user should move on to next page
var page1_finished= false;
var background_img;

var choices=[];

var blank1;

var tapped=false;
var curr_selected_blank;
var curr_selected_word;


var pg1Excerpt = "Sally wanted to pick";


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
  if(!page1_finished){
    fill(0,0,0);
  // WRITE pg1pg1Excerpt
  // set font
  textFont("Helvetica");
  // set a larger text size 
  textSize(20); 
   //draw our text
  text(pg1Excerpt, 160,250);
  blank1 = new blank('_______', 360,250);
  blank1.drawText();
  // write word choices on page
    for(var i = 0; i < choices.length; i++){
      choices[i].drawText();
    }
    drawPlayer();

  }
  
  for(var i = 0; i < choices.length; i++){
    choices[i].checkHit();
  }
}

//Word Class
function word(word,x,z){
  this.word = word;
  this.x = x;
  this.z = z;
  this.drawText = function(){
    textSize(20);
      // set font
    textFont("Helvetica");
    fill(0,0,0);
    text(this.word,this.x,this.z);
  };
  this.moveText = function(x, z){
        this.x=x;
        this.z=z;
        this.drawText();
  };
  this.checkHit = function (){
    if(tapped && inRange(pX, this.x) && inRange(pZ, this.z) && curr_selected_word==null && !page1_finished ){
       curr_selected_word= this;
        fill(0);
        curr_selected_word.moveText(blank1.x,blank1.z);
        pg1Excerpt+=' '+curr_selected_word.word;
        page1_finished=true;
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
