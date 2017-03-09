var screenWidth;
var screenHeight;


var handString='';
var pointableString='';

var controllerOptions = {};


function setup() {

  //Change screen height/width
  screenWidth = 800;
  screenHeight = 700;
  createCanvas(screenWidth, screenHeight);
  background(0, 0, 255);

}


function draw() {
  
  Leap.loop(controllerOptions,function(frame){
    //HAND STUFF + map + move circle
      // if(frame.hands.length>0){
      //   background(0, 0, 255);
        //var finaly;
      //   for(var i =0;i<frame.hands.length;i++){
      //     var hand=frame.hands[i];
      //     var testx= hand.palmPosition[0];
      //     var testz= hand.palmPosition[2];
      //   var finalx = map(testx,-150,170,0,screenWidth);
      //   var finalz = map(testz,-150,160,0,screenHeight);
      //     //console.log(hand.palmPosition[2]);
      //     ellipse(finalx,finalz,30);
      //   }
      // }
      if(isFist(frame)){
        background(0,255,0);
      }
      else{
        background(255,0,0);
      }
      
  });
}

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
