//import "./styles.css";

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = 'whitesmoke';
ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

var canvasWidth = c.width;
var canvasHeight = c.height;
let unitScale = 12;

//generate grid
export function drawGrid(xSize, ySize, unitScale, lineWidth, lineColor){
  let grid = new Path2D();
  let unitSize = parseFloat(xSize/unitScale);
  let xCoord = 0;
  let yCoord = 0;
  ctx.lineWidth = lineWidth || 1;
  ctx.strokeStyle = lineColor || "#000";

  //draw vertical lines
  for (let index = 0; index <= unitScale; index++) {
    yCoord = ySize;
    
    grid.moveTo(xCoord, 0);
    grid.lineTo(xCoord, yCoord);
    ctx.stroke(grid);

    xCoord += parseFloat(unitSize);
  }
  //reset y coordinate
  yCoord = 0;

  //draw horizontal lines
  for (let index = 0; index <= unitScale; index++) {
    xCoord = xSize;
    
    grid.moveTo(0, yCoord);
    grid.lineTo(xCoord, yCoord);
    ctx.stroke(grid);

    yCoord += parseFloat(unitSize);
  }
  return grid;
}

//draw symbols on grid 
function drawSymbol(base10Number, isEnglish, color){
  let symbol = new Path2D();
  let unitSize = parseFloat(canvasWidth/unitScale);
  let xCoord = ((base10Number - 1) % unitScale) * unitSize;
  let yCoord = parseInt((base10Number - 1) / unitScale, 10) * unitSize;
  let textWidth = 18;
  ctx.fillStyle = color || "#000";

  if( isEnglish ){
    ctx.font = "18px Poppins";
    textWidth = ctx.measureText(base10Number).width;
    xCoord += unitSize - textWidth - 4;
    yCoord += 18;
    ctx.fillText(base10Number, xCoord, yCoord);
  }else{
    ctx.font = "24px taygetean_numeralsregular";
    let n = convertNumber(base10Number);
    textWidth = ctx.measureText(n).width;
    xCoord += ( unitSize/2 - textWidth/2 ) + 2;
    yCoord +=unitSize - unitSize/3 + 1;
    ctx.fillText(n, xCoord, yCoord);
  }
  return symbol;
};

//convert to Taygetean grid
export function convertNumber( number ){
  
  let g = 0;
  let n = '';
  var r;
  
  g = parseInt(number/12, 10);
  r = number - (g * 12);
  if(r === 0 )r = 12;

  if(g === 10 )g = "A";
  if(g === 11 )g = "B";
  if(g === 12 )g = "C";

  if(r === 10 )r = "A";
  if(r === 11 )r = "B";
  if(r === 12 )r = "C";
  if( g < 1 )g = "";
  n = g +""+ r;

  if( n === "1C" )n = "C";

  return n;
}

//download canvas as image
//https://stackoverflow.com/a/56185896
function downloadCanvasAsImage( canvasId, fileName, fileExt ){
  if(fileExt === 'jpg')fileExt = 'jpeg';
  let canvasImage = document.getElementById( canvasId ).toDataURL('image/'+fileExt);
  
  // this can be used to download any image from webpage to local disk
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function () {
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(xhr.response);
      a.download = fileName+'.'+fileExt;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    xhr.open('GET', canvasImage); // This is to download the canvas Image
    xhr.send();
}

//https://stackoverflow.com/a/30757781
function ready(fn) {
  if (document.readyState !== 'loading'){
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState !== 'loading')
        fn();
    });
  }
}

//
ready(function(){
  document.getElementById("download").addEventListener("click", function(){
    downloadCanvasAsImage('myCanvas', 'grid', 'jpg');
  });
  document.getElementById("refresh").addEventListener("click", function(){
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = 'whitesmoke';
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    drawGrid(canvasWidth, canvasHeight, 12, 0.6, "#000");
  
    for (let index = 1; index <= 144; index++) {
      drawSymbol(index, 0, '#333');
      drawSymbol(index, 1, '#999');
    }
  });
  //drawGrid( canvasWidth, canvasHeight, 72, 0.6, "#e5e5e5");
  drawGrid(canvasWidth, canvasHeight, 12, 0.6, "#000");
  
  for (let index = 1; index <= 144; index++) {
    drawSymbol(index, 0, '#333');
    drawSymbol(index, 1, '#999');
  }

  
});

