
var dog;
var cat;
var bunny;
var fontS=32;

var animals=[];
var selected;

function setup() {
  createCanvas(600,500);
  selected=false;
  dog = new word("dog",random(0,windowWidth),random((windowHeight/2),windowHeight),0,0,255);
  animals.push(dog);
  cat = new word("cat",random(0,windowWidth),random((windowHeight/2),windowHeight),0,255,0);
  animals.push(cat);
  bunny = new word("bunny",random(0,windowWidth),random((windowHeight/2),windowHeight),255,0,255);
  animals.push(bunny);

  

}

function draw() {
  background(230,230,230);
  if(!selected){
    for(var i=0;i<animals.length;i++){
      animals[i].moveText();
      
      
      if((mouseX >= animals[i].x && mouseX <= (animals[i].x+animals[i].len)) && (mouseY>=animals[i].y && mouseY<animals[i].y+fontS)){
        
        animals[i].move(mouseX,mouseY);
      }

      
    }
  }
  
  var sentence1 = new word("Today I bought a",15,50,0,0,0);
  sentence1.drawText();
  var sentence2 = new word("at the store",sentence1.len+bunny.len+10,50,0,0,0);
  sentence2.drawText();
  
  
  

// //check if word position is in the “sentence” && mouse released
// if(   (animals[i].x >= sentence1.len && animals[i].x < sentence2.x ) && (animals[i].y >=48 && animals[i].y < fontS+50)



// )

// //need to change font color of selected word + sentence
// this.finalSelection = function(){
// this.r=0;
// this.g=255;
// this.b=255;
// this.drawText();
// //selected =true;


// }

 
// )
  
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
    textSize(32);
    textFont("Georgia");
    fill(this.r,this.g,this.b);
    text(this.word,this.x,this.y,this.x2,this.y2);
    this.len=textWidth(this.word);
  };
  
  this.moveText = function(x, y){
    if(x && y){
      this.x=x;
      this.y=y;
    }
    this.drawText();
  };
  
  
  
  
  
  
}