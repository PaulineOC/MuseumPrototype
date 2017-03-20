function page3(){
  this.pg3Start=false;
  this.pg3Finished=false;
  this.pg3GameStart=false;
  
  //Game states
  this.begin=true;
  this.start=false;
  this.appleSuccess=0;
  this.win=false;
  this.greeting;
  this.fist=false;
  //BOARD GAME STUFF
  this.gridW = 8;
  this.gridH=3;
  this.grid;
  
  this.currObj=null
  this.thisX=null;
  this.thisY=null;
  this.goodF=0;
  this.badF=0;
  this.deathFactor=0;
  
  this.timeDone=false;
  this.time=10;
  
  // x & y position of our user controlled character
  this.x = 0;
  this.z = 0;
  this.rad =0;
  
  //Screen Offsets:
  this.timerOffset=200;
  //set from previous game
  this.fruitType='apricot';
  //Images
  this.background1Img;
  this.background2Img;
  this.gameFruit;
  this.gameFruitH;
  
  
  //FUNCTIONS
  this.loadAllImages=function (){
    //background image:
    this.background1Img=loadImage('assets/pg3-4/pages3_4.png');
    this.background2Img=loadImage('assets/pg3-4/pages3_4_tree.png');
    if(this.fruitType=="apple"){
      this.gameFruit=loadImage('assets/pg3-4/fruit/apple.png');
      this.gameFruitH=loadImage('assets/pg3-4/fruit/apple_hover.png');
    }
    else if(this.fruitType=='apricot'){
      this.gameFruit=loadImage('assets/pg3-4/fruit/apricot.png');
      this.gameFruitH=loadImage('assets/pg3-4/fruit/apricot_hover.png');
    }
    else{
      this.gameFruit=loadImage('assets/pg3-4/fruit/cherry.png');
      this.gameFruitH=loadImage('assets/pg3-4/fruit/_hover.png');
    }
  }


  this.pg3Setup = function(){
    greeting = new word("Hello! Please press S",windowWidth/4,windowHeight/2,0,0,255);
    //Score
    var goodScoreOffsetW=166+97.5;
    var scoreH=screenHeight-150;
    var badScoreOffsetW=screenWidth-166-292.5;
    scoreGood= new word("Good "+this.fruitType+"s:", goodScoreOffsetW,scoreH,0,0,255);
    scoreBad= new word("Bad "+this.fruitType+"s:", badScoreOffsetW,scoreH,0,0,255);
    //Fruit Grid
    var gridX=195+166;
    var gridY=200;
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
  
  this.Open= function(){
    image(this.background1Img,0,0,screenWidth, screenHeight);
    greeting.drawText();
  }
  
  this.timer=function(){
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
  
  this.pg3Game=function(){
    image(background2Img,0,0,screenWidth,screenHeight);
    timer();
    scoreGood.drawText(goodF);
    scoreBad.drawText(badF);
    
    if(!timeDone){
          for(var i=1;i<=gridW;i++){
            for(var j=1;j<=gridH;j++){
              if(grid[i][j].alive){
                if(x<grid[i][j].x+grid[i][j].rW && x+rad>grid[i][j].x){
                  if(z<grid[i][j].y+grid[i][j].rH && z+rad>grid[i][j].y){
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
    }//Timer
  }
  
  this.mouseClickedpg3=function(){
    if(grid[thisX][thisY] && !grid[thisX][thisY].selected){
      grid[thisX][thisY].selected =true;
      grid[thisX][thisY].dying =true;
      //Add score
      if(grid[thisX][thisY].alive==true && grid[thisX][thisY].type=='good'){
        goodF++;
      }
      else if(grid[thisX][thisY].alive==true && grid[thisX][thisY].type=='bad'){
        badF++;
        deathFactor-=2;
        if(deathFactor<=2){
          deathFactor=2;
        }
      }
    }
}//end of Mouseclicked3
}//end of page3 class





function Fruit(x,y,r1,r2){
  this.img=gameFruit;
  this.imgH=gameFruitH;
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
function word(word,x,y,r,g,b){
  this.word=word;
  this.x=x;
  this.y=y;
  this.r=r;
  this.g=g;
  this.b=b;
  this.len=0;
  
  this.drawText = function(extraT){
    textSize(28);
    textFont("Georgia");
    fill(this.r,this.g,this.b);
    text(this.word+" "+extraT,this.x,this.y,this.x2,this.y2);
    this.len=textWidth(this.word);
  };
}