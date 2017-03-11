var screenWidth;
var screenHeight;


var handString='';
var pointableString='';
var set=false;
var controllerOptions = {};

var fposX=null;
var fposY=null;

var tmpx=100;
var tmpy=100;

function setup() {
  //Change screen height/width
  screenWidth = 800;
  screenHeight = 700;
  createCanvas(screenWidth, screenHeight);
}

function draw() {
  
  background(0, 0, 255);
  if(isFist(frame)){
          if (fposX == null && fposY == null) {
            fposX=finalMapX;
            fposY=finalMapZ;
          }
        }
        
        if(fposX != null || fposY != null){
          //make the position STICK
          ellipse(fposX, fposY,30);
        }
        else{
          ellipse(tmpx, tmpy,30);
        }
       

  
}

Leap.loop(controllerOptions,function(frame){
    //HAND STUFF + map + move circle --> NEED FOR SWIPING
      if(frame.hands.length>0){
        var finalx;
        var finalz;
        
        
        for(var i =0;i<frame.hands.length;i++){
          var hand=frame.hands[i];
          
          var testx= hand.palmPosition[0];
          var testz= hand.palmPosition[2];
          
          finalMapX = map(testx,-150,170,0,screenWidth);
          finalMapZ = map(testz,-150,160,0,screenHeight);
          
          tmpx=finalMapX;
          tmpy=finalMapZ;
          //console.log(hand.palmPosition[2]);
          
        }//for loop
        
        // if(isFist(frame)&& !set){
        //   ellipse(finalx,finalz,30);
        //   set=true;
        //   //background(0,255,0);
        //   //draw ellipse
        // }
        
        // else if
        // else{
        //   ellipse(finalx,finalz,30);
        // }
          
      }//end of frame hands lenght
      
      
      
  });



function isFist(frame){
    if(frame.hands.length>0){
      var hand = frame.hands[0];
      var extendedFingers = 0;
      //FINGER / POINTABLES
      for(var f = 0; f < hand.fingers.length; f++){
        var finger = hand.fingers[f];
        if(finger.extended){
          extendedFingers++;
        }
        
        if(extendedFingers==0){
          return true;
        }
        else{
          extendedFingers=0;
          return false;
          
        }
      }
      console.log("Extended fingers: " + extendedFingers);
    }
}


  
  
  
// Leap.loopController.setBackground(true);
