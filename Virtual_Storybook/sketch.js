//Screen controls
var screenWidth;
var screenHeight;

//Leap Motion Controller
var leapController;
var pageMove=false;

//Player Navigator
var pX=screenWidth/2
var pZ=screenHeight/2-(2*rad); //change to size of image
var rad;

//Book Controls
var currPage=0;

var frontCover=true;
var pg1=false;
// var pg3=false;
var chosenFruit=null;
// var pg4=false;
var backCover =false;
//Hotspot transparency
var trans=100;
var fall=true;


// images
var front_cover_img;
var back_cover_img;
var page1_background;
//var p1_backgroundApple;


var page1_tree_apples;
var page1_tree_apricots;
var page1_tree_cherries;

var pg3backgroundGame;
var pg3AppleBegin;
var pg3ApricotBegin;
var pg3CherriesBegin;

var pg3AppleEnd;
var pg3ApricotEnd;
var pg3cherriesEnd;

var apple;
var appleH;
var apricot;
var apricotH;
var cherries;
var cherriesH;


//Load Images
function preload(){
  front_cover_img = loadImage('assets/start/book_front_cover.png');
  back_cover_img = loadImage('assets/end/book_back_cover.png');
  //Page1 Stuff
  page1_background = loadImage('assets/page1/pages1_2.png');
  page1_tree_apples = loadImage('assets/page1/pages1_2_tree_apples.png');
  page1_tree_apricots = loadImage('assets/page1/pages1_2_tree_apricots.png');
  page1_tree_cherries = loadImage('assets/page1/pages1_2_tree_cherries.png');
  //Page 3 background complete
  
  
  
  //Page3 Stuff
  pg3AppleBegin=loadImage('assets/page3/Begin/apples.png');
  pg3ApricotBegin=loadImage('assets/page3/Begin/apricots.png');
  pg3CherriesBegin=loadImage('assets/page3/Begin/cherries.png');
  pg3AppleEnd=loadImage('assets/page3/End/apple.png');
  pg3ApricotEnd=loadImage('assets/page3/End/apricots.png');
  pg3CherriesEnd=loadImage('assets/page3/End/cherries.png');
  
  
  pg3backgroundGame=loadImage('assets/page3/pages3_4_tree.png');
  apple=loadImage('assets/page3/fruit/apple.png');
  appleH=loadImage('assets/page3/fruit/apple_hover.png');
  apricot=loadImage('assets/page3/fruit/apricot.png');
  apricotH=loadImage('assets/page3/fruit/apricot_hover.png');
  cherries=loadImage('assets/page3/fruit/cherries.png');
  cherriesH=loadImage('assets/page3/fruit/cherries_hover.png');
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
    pg3Setup();
    //Player setup
    rad=35;
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
      //hotSpot(currPage);
      drawPlayer();
      break;
    case 1:
      if(!page1_finished){
        background(page1_background);
        page1draw();
      } 
      else{
        chosenFruit=curr_selected_word.word;
        console.log(chosenFruit);
        
        if(chosenFruit == 'apricots'){
          background(page1_tree_apricots);
        }
        else if(chosenFruit == 'apples'){
          background(page1_tree_apples);
        }
        else{
          background(page1_tree_cherries);
        }
        
        textSize(30);
        fill(0);
        text(excerpt,220,500);
        hotSpot(currPage);
        drawPlayer();
      }
      break;
    case 2:
      if(!pg3GameStart && !pg3Finished){
        var backgroundInfo="Sally needs to pick the ripe "+chosenFruit+" ,\nbut has to be careful about \n avoiding the poisoned ones\n that will  rot the tree.";
        var instructions= "\nTo pick "+chosenFruit+ " use the 'screenTap' gesture. \nMake sure you take enough good ones.";
        var instructions2="\nYou may have to pick some poisoned ones\n to make sure they dont' rot the tree,\n but don't select too many\n or the consequences could be dire."
        greeting = new word2(backgroundInfo+instructions+instructions2,200,windowHeight/2,0,0,255);
        if(chosenFruit=='apples'){
          background(pg3AppleBegin);//load bkgd w/ apples
          greeting.drawText();
          startbutton();
          drawPlayer();
        }
        else if(chosenFruit=='apricots'){
          background(pg3ApricotBegin);//load bkgd w/ apricots
          greeting.drawText();
          startbutton();
          drawPlayer();
        }
        else{
          background(pg3CherriesBegin);//load bkgrd w/ peaches
          greeting.drawText();
          startbutton();
          drawPlayer();
        }
      }
      else if(pg3GameStart && !pg3Finished){
        game();
      }
      else if(!pg3GameStart && pg3Finished){
        if(chosenFruit=='apples'){
          background(pg3AppleEnd);
          greeting.drawText();
          hotSpot(currPage);
          drawPlayer();
          
        }
        else if(chosenFruit=='apricots'){
          background(pg3ApricotEnd);
          greeting.drawText();
          hotSpot(currPage);
          drawPlayer();
        }
        else{
          background(pg3CherriesEnd);
          greeting.drawText();
          hotSpot(currPage);
          drawPlayer();
        }
      }//end of else if
      break;
    case 3:
      console.log('penultimate page');
      break;
    case 4:
      image(back_cover_img);
    default: 
      background(0);
      break;
  }
  
  function startbutton(){

    fill(0,0,255,100);
    rect(250,750,275,50);
    textSize(20);
    textFont("Pacifico");
    fill(0,0,0);
    text("'KeyTap' Me to Pick Fruit!", 265, 775);
    
    
    if(pX<250+275 && pX+rad>250 && pZ<750+50 && pZ+rad> 750 && !pg3GameStart && !pg3Finished){
        collision=true;
    }
    else{
      collision=false;
    }
    
  }
}

function keyTyped(){
  // keypress for page1
  if (key=="o"){
    if(currPage==0){
      currPage++;
    }
    else if (currPage==1){
      if(!page1_finished){
        page1_finished=true;
      }
      else{
        currPage++;
      }
    }
    else if(currPage==2){
      if(!pg3GameStart){
        pg3GameStart=true;
      }
      else{
      currPage++;
    }
      
    }
    
    //currPage++;
  }
}

function drawPlayer(){
  fill(255,100,100,150); // set color
  noStroke();
  ellipse(pX, pZ, rad,rad);
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
    else if(pageMove && numb!==4 && pX<h2OffW+radius && pX+rad>h2OffW && pZ<hOffH+radius && pZ+rad>hOffH){
      currPage++;
    }
    
    fill(0,0,255,trans);
    if(numb==0){//title cover
      ellipse(h2OffW-50,hOffH+25,radius,radius);
    }
    else if(numb==4){//back cover
      ellipse(h1OffW,hOffH,radius,radius);
    }
    else if (numb>0 && numb<4){
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
    //pY = map(hy,    0, 500, 500,   0);
    pZ = map(hz,    -5, 70, 150,   screenHeight-150);
  }
}


function handleGestures(gesture) {
  switch(currPage){
    case 0:
       if(gesture.type=='swipe'){
        currPage++;
        pageMove=true;
      }
      break;
    case 1:
      if (gesture.type == 'keyTap') {
      tapped=true;
        if(page1_finished){
          pageMove=true;
        }
      }
      break;
    case 2:
      if(!pg3GameStart && gesture.type=="keyTap" && collision ){
        pg3GameStart=true;
      }
      else if(pg3GameStart && gesture.type=="keyTap"){
        madeTap=true;
        if(thisX && thisY && !grid[thisX][thisY].selected){
            grid[thisX][thisY].selected =true;
            grid[thisX][thisY].dying =true;
           //If poisonous - need to  stop affecting other apples? 
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
        else{
          madeTap=false;
        }
        
      }
      else if(!pg3GameStart && pg3Finished && gesture.type=="keyTap" ){
        pageMove=true;
      }
      break;
  }
 
}
