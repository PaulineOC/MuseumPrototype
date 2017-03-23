// detects if user should move on to next page
var page1_finished= false;
var background_img;

var choices=[];

var blank1;

var tapped=false;
var curr_selected_blank;
var curr_selected_word;


var pg1Excerpt = "Once upon a time,";
var pg2Excerpt = "there was a girl named Sally.";
var pg3Excerpt = "She lived with her grandma";
var pg4Excerpt = "in the Tangled Twisted woods.";
var pg5Excerpt = "One day, her grandma asks her to";
var pg6Excerpt = "go pick fruit in the garden";
var pg7Excerpt = "for the pie that she wants to";
var pg8Excerpt = "bake for the king’s ball.";
var pg9Excerpt = "Help Sally pick";
var pg10Excerpt = "for the pie!";

var excerpt = "Help Sally pick the fruit!";


function page1setup() {
  blank1 = new blank('_________', 380,860);
  var apples = new word('apples', 800,300);
  choices.push(apples);
  var peaches = new word('cherries', 800,500);
  choices.push(peaches);
  var apricot = new word('apricots', 800,700);
  choices.push(apricot);

  
}

function page1draw() {
  if(!page1_finished){
   //draw our excerpt
   
  fill(0,0,0);
  // WRITE pg1pg1Excerpt
  // set font
  textFont("Pacifico");
  // set a larger text size 
  textSize(25); 

  text(pg1Excerpt, 190,240);
  text(pg2Excerpt, 190,300);
  text(pg3Excerpt, 190,380);
  text(pg4Excerpt, 190,460);
  text(pg5Excerpt, 190,540);
  text(pg6Excerpt, 190,620);
  text(pg7Excerpt, 190,700);
  text(pg8Excerpt, 190,780);
  text(pg9Excerpt, 190,860);
  text(pg10Excerpt,500,860);
  
  
  blank1.drawText();
  // write word choices on page
    for(var i = 0; i < choices.length; i++){
      choices[i].drawText();
    }
  }
  
  for(var i = 0; i < choices.length; i++){
    choices[i].checkHit();
  }
  drawPlayer();

}

//Word Class
function word(word,x,z){
  this.word = word;
  this.x = x;
  this.z = z;
  this.drawText = function(){
    textSize(50);
      // set font
    textFont("Pacifico");
    fill(0,0,0);
    text(this.word,this.x,this.z);
  };
  this.moveText = function(x, z){
        this.x=x;
        this.z=z;
        //this.drawText();
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
