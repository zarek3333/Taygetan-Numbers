import {convertNumber} from "./app.js";

var c2 = document.getElementById("myClock");
let clock = c2.getContext("2d");
clock.fillStyle = 'whitesmoke';
clock.fillRect(0,0,window.innerWidth,window.innerHeight);

var c3 = document.getElementById("myDigital");
let clock2 = c3.getContext("2d");
clock2.fillStyle = 'whitesmoke';
clock2.fillRect(0,0,window.innerWidth,window.innerHeight);

//generate Taygetan clock
function drawClock(){
  //clear canvas
  clock.clearRect(0, 0, c2.width, c2.height);
  //define time
  let d = new Date();
  //hour
  let h = d.getHours();
  //minute
  let m = d.getMinutes();
  //second
  let s = d.getSeconds();
  //time array
  let tArray = [h,m,s];
  //
  let n = '';
  let xCoord = c2.width;
  let yCoord = 30;
  let w = 0;
  let count = 3;
  let colon = ':';
  clock.font = "30px taygetean_numeralsregular";
  for(let i = tArray.length; i > 0 ; i-- ){
    n = convertNumber(tArray[count - 1]);
    w = clock.measureText(n).width + 16;
    xCoord -= w; 
    count--;
    clock.fillText(n + colon, xCoord, yCoord);
  }
  clock.textAlign = "left";
  return clock;
}

//generate Earthly clock
function drawClock2(){
  //clear canvas
  clock2.clearRect(0, 0, c3.width, c3.height);
  //define time
  let d2 = new Date();
  //hour
  clock2.font = "24px Bai Jamjuree";
  clock2.fillText(d2.toLocaleTimeString(), 150, 20);
  clock2.textAlign = "right";
  clock2.textBaseline = "middle";
  return clock2;
}

setInterval(() => {
  drawClock();
  drawClock2();
}, 1000);