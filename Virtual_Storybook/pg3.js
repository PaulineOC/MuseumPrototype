var pg3Finished=false;
var pg3GameStart=false;
var collision=false;

var begin=true;
var start=false;

var greeting;
var greeting2;
var fist=false;

//BOARD GAME STUFF
var gridW = 8;
var gridH=3;
var grid;

var currObj=null
var thisX=null;
var thisY=null;
var goodF;
var badF;
var deathFactor=0;

var timeDone=false;
var time=5;


// x & y position of our user controlled character
var x = 0;
var z = 0;
var rad =0;

//Screen Offsets:
var timerOffset=200;
//set from previous game
//Images
var background1Img;
var background2Img;
var gameFruit;
var gameFruitH;


//SET UP

function pg3Setup(){
 
 goodF=0;
var badF=0;
  //Fruit Grid
  var gridX=195+166;
  var gridY=350;
  var boxSize=65;
  grid = new Array();
  for(var i=1;i<=gridW;i++){
    grid[i]=new Array();
    for(var j=1;j<=gridH;j++){
      var radius=60;
      grid[i][j]=new Fruit(i*boxSize+gridX-(.5*radius), j*boxSize+gridY-(.5*radius),radius, radius);
    }
  }
}

//PLAYING THE GAME
  //Timer
  function timer() {
    //every sixty frame count
    if(frameCount % 60 === 0) {
      time -= 1;
    }
    if(time>=0){
      textSize(28);
      text("Seconds: " + time,  timerOffset, timerOffset);
    }
    else{
      timeDone = true;
      textSize(28);
      text("Seconds: " + 0, timerOffset, timerOffset);
    }
}


function game(){
  background(pg3backgroundGame);
  
  var goodScoreOffsetW=166+97.5;
  var scoreH=screenHeight-150;
  var badScoreOffsetW=screenWidth-166-292.5;
  scoreGood= new word2("Good "+chosenFruit, goodScoreOffsetW,scoreH,0,0,255);
  scoreBad= new word2("Bad "+chosenFruit, badScoreOffsetW,scoreH,0,0,255);
  timer();
  scoreGood.drawText(goodF);
  scoreBad.drawText(badF);
  
  if(!timeDone){
        for(var i=1;i<=gridW;i++){
          for(var j=1;j<=gridH;j++){
            
            if(grid[i][j].alive){
              
              
              if(pX<grid[i][j].x+grid[i][j].rW && pX+rad>grid[i][j].x){
                if(pZ<grid[i][j].y+grid[i][j].rH && pZ+rad>grid[i][j].y){
                console.log('made a collision');
                 thisX=i;
                 thisY=j;
                  if(!grid[i][j].selected && grid[i][j].alive && !grid[i][j].dying){
                    grid[i][j].hover=true;
                  }
                }
              }//not intersecting
              else{
                grid[i][j].hover=false;
              }
              grid[i][j].drawFruit();
              //Apples die out
              grid[i][j].currLife++;
              if(grid[i][j].currLife>=grid[i][j].lifeSpan){
                  grid[i][j].currLife=0;
                  grid[i][j].alive=false;
              }
            }//end of alive
            else{//not alive apple
              grid[i][j].currWait++;
              if(grid[i][j].currWait>=grid[i][j].targetWait){
                  grid[i][j].spawnFruit();
                  grid[i][j].currWait=0;
            }
          }
        }//end of inner for
      }//end of outer for
       drawPlayer();
    }//Timer
    else{
      //Game over
      pg3GameStart=false;
      pg3Finished=true;
    }
    //GAME OVER
}


//Controls

// function mouseClickedpg3(){
//     if(grid[thisX][thisY] && !grid[thisX][thisY].selected){
//       grid[thisX][thisY].selected =true;
//       grid[thisX][thisY].dying =true;
//       //Add score
//       if(grid[thisX][thisY].alive==true && grid[thisX][thisY].type=='good'){
//         goodF++;
//       }
//       else if(grid[thisX][thisY].alive==true && grid[thisX][thisY].type=='bad'){
//         badF++;
//         deathFactor-=2;
//         if(deathFactor<=2){
//           deathFactor=2;
//         }
//       }
//     }
// }//end of Mouseclicked3



//GAME OBJECTS
//Fruit
function Fruit(x,y,r1,r2){
  
  this.img;
  this.imgH;
  this.x=x;
  this.y=y;
  this.rW=r1;
  this.rH=r2;
  //Living conditions
  this.alive=false;
  this.dying=false;
  
  //Spawn wait
  this.targetWait = int(random(50,250));
  this.currWait=0;
  //Life span
  this.lifeSpan=int(random(50,150));
  this.currLife=0;
  
  this.trans=255;
  this.type;


  this.selected = false;
  this.hover=false;
  
  this.spawnFruit= function(firstTime){
      if(chosenFruit=='apples'){
      this.img=apple;
      this.imgH=appleH;
      }
      else if(chosenFruit=='apricots'){
        this.img=apricot;
        this.imgH=apricotH;
      }
      else if(chosenFruit=='cherries'){
        this.img=cherries;
        this.img=cherriesH;
      }
    var tmp= random(0,2);
    if(tmp>=.5){
      this.type='good';
    }
    else{
      this.type='bad';
      deathFactor+=.5;
      // console.log("adding bad apple "+deathFactor);
    }
    this.selected=false;
    // this.dying=false;
    this.hover=false;
    this.trans=255;
    this.alive=true;
    if(!firstTime){
      this.targetWait=int(random(50,250));
      this.lifeSpan = int(random(200,500));
    }
  }//end of spawnFruit
  
  

  this.drawFruit = function(){
      noStroke();
      this.trans-=.25*deathFactor;
      //Natural Decay
      if(this.trans<=0){
            this.alive=false;
      }
      //Selected Fruit
      if(this.selected && this.alive){
        this.dying=true;
        this.trans-=2;
        if(this.trans<=0){
            this.alive=false;
        }
      }//end of selected
      
      if(this.type=='good' && this.alive){
        if(this.hover&&!this.selected && !this.dying){//hovering over alive, unselected fruit 
          tint(255,255);
          image(this.imgH,this.x,this.y,this.rW,this.rH);
          
        }
        else{
            tint(255,this.trans);
            image(this.img,this.x,this.y,this.rW,this.rH);
        }
        noTint();
      }
      else if(this.type=='bad' && this.alive){
        if(this.hover&&!this.selected && !this.dying ){//hovering over alive, unselected fruit 
          tint(0,0,0,255);
          image(this.imgH,this.x,this.y,this.rW,this.rH);
          
        }
        else{
            tint(0,0,0,this.trans);
            image(this.img,this.x,this.y,this.rW,this.rH);
        }
        noTint();
      }
  }//end of drawFruit;
}

//Word Class
function word2(word,x,y,r,g,b){
  this.word=word;
  this.x=x;
  this.y=y;
  this.r=r;
  this.g=g;
  this.b=b;
  this.len=0;
  
  this.drawText = function(extraT){
    textSize(24);
    textFont("Pacifico");
    fill(0);
     this.len=textWidth(this.word);
    if(extraT){
      text(this.word+" "+extraT,this.x,this.y,this.x2,this.y2);
    }
    else{
      text(this.word,this.x,this.y,this.x2,this.y2);
    }
   
  };
}
