//import "./styles.css";
var linkElem = document.createElement('link');
document.getElementsByTagName('canvas')[0].appendChild(linkElem);
linkElem.rel = 'stylesheet';
linkElem.type = 'text/css';
linkElem.href = './styles.css';

var t1 = document.getElementById("typeface1");
var t2 = document.getElementById("typeface2");

var fill = "whitesmoke";
var stroke = "#000";

function drawSymbols( canvas, font ){
  let context = canvas.getContext("2d");
  context.fillStyle = fill;
  context.strokeStyle = stroke;
  var canvasWidth = context.width;
  var canvasHeight = context.height;
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.fillRect(0,0,window.innerWidth,window.innerHeight);
  context.fillStyle = stroke;
  let textArr = ['1','2','3','4','5','6','7','8','9','A','B','C','+','-'];
  let xCoord = 24;
  let yCoord = 48;
  
  
  for (let index = 0; index < textArr.length; index++) {
    let n = textArr[index];
    context.font = font;
    context.fillText(n, xCoord, yCoord);
    context.font = "24px Poppins";
    context.fillText(n, xCoord, yCoord + 36);
    context.font = "24px taygetean_numeralsregular";
    xCoord += 48;
  }
  return context;
}


drawSymbols(t1, "24px taygetean_numeralsregular");
drawSymbols(t2, "24px taygetean_numerals_slimRg");