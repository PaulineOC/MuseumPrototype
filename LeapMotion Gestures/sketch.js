var screenWidth;
var screenHeight;


var handString='';
var pointableString='';
var set=false;
var controllerOptions = {};

var fposX=null;
var fposY=null;

var tmpx=0;
var tmpz=0;
var p5Bool=false;


function setup() {
  //Change screen height/width
  screenWidth = 800;
  screenHeight = 700;
  createCanvas(screenWidth, screenHeight);
}


/*Program specs: 
 * Ellipse is drawn whereever the hand is 
 * If the hand becomes a FIST, then the ellipse is permanently stamped to where the hand was a fist
 * Any movement of the hand (either open palm or fist) doesnt' affect position of the ellipse after it has been "stamped
*/

function draw() {
  
  background(0, 0, 255);

  if(p5Bool){
          //if making a fist the FIRST time = get location of hand 
          if (fposX == null && fposY == null) {
            fposX=tmpx;
            fposY=tmpz;
          }
        }
        //First time fist: use location of hand from above and draw ellipse at set point permanently 
        if(fposX != null || fposY != null){
          //make the position STICK
          ellipse(fposX, fposY,30);
        }
        //Otherwise if it's not hand is NOT a fist, draw where hand is currently at
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
          tmpz=finalMapZ;
          //console.log(hand.palmPosition[2]);
          
        }//for loop
        
        
        if(isFist(frame) &&!set){
          //boolean for p5 draw function to see if it's a fist
         p5Bool=true;
         set=true;
        }
        
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
