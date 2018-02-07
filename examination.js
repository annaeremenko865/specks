<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">
    	body {
    		background: #e9967a;
    		}
		#can {
			margin-top: 90px;
			
			}
    </style>
</head>
<body >
	<canvas id = "can"></canvas>
  <script>
let can = document.getElementById("can");
let b = document.createElement('button');
let bt = document.createTextNode('Push the button to start the game!')
b.appendChild(bt);
document.body.insertBefore(b, can);
b.style.float = 'left';
b.style.width= '300px';
b.style.height = '70px';
b.style.font = '25px impact';
b.style.color = 'green';
b.style.background = '#F0E68C';
b.style.border = 'solid 2 px green;';
b.style.borderRadius = '7px';
b.style.position = 'fixed';
 b.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.4)';

b.addEventListener('click', start);
window.addEventListener('load', specks);

let ctx;
let width = 320;
let height = 320;
let cells = [[],[],[],[]] ;
let rightSpecks = [[1,  2,  3,  4 ],
      			 [5,  6,  7,  8 ],
      			 [9,  10, 11, 12],
       			[13, 14, 15, 0 ] ] ;
let randomMas= [];
let count;
let moveCount = 0;
let bingo = false;
 
function specks(){
 can.width = width;
 can.height = height;
 ctx = can.getContext("2d");
 ctx.fillStyle="#1b796e";
 ctx.fillRect(0, 0, width, height, 20);
 for (let j = 0; j < 4; j++){
  for (let i = 0; i < 4; i++){
   cells[i][j] = new Cell();
   cells[i][j].i = i;
   cells[i][j].j = j;
   cells[i][j].x = 6 + i * 70 + 8 * i;
   cells[i][j].y = 6 + j * 70 + 8 * j;
   cells[i][j].addCell();
   cells[i][j].setText(rightSpecks[j][i]); 
  }
 }
 cells[3][3].clearCell();
}

function start(){
 can.width = width;
 can.height = height;
 ctx = can.getContext("2d");
 
 game();
    
 can.addEventListener("click", prepareToMove);
}

let Cell = function(){
 this.i = 0;
 this.j = 0;
 this.x = 0;
 this.y = 0;
 this.number = 0;
 this.addCell = function(){
  ctx.fillStyle = "#e0eeee";
  ctx.fillRect(this.x, this.y, 70, 70, 20);
 }
 this.setText = function(text){
  with (ctx){
   font = '20pt tahoma';
   textBaseline = 'top';
   textAlign = 'center';
   fillStyle = '#000';
   fillText(text, this.x + 35, this.y + 20);
  }
 }
  
 this.clearCell = function(){
  ctx.fillStyle = "#c1cdcd";
  ctx.fillRect(this.x, this.y, 70, 70, 20);
  }
}
 
function prepareToMove(e){
  
 for (let j = 0; j < 4; j++ ) {
    for (let i = 0; i < 4; i++ ) {
 if (cells[i][j].x + 70 > e.offsetX && cells[i][j].x < e.offsetX &&
    cells[i][j].y + 70 > e.offsetY && cells[i][j].y < e.offsetY ) 
 	 move(cells[i][j]);
 }}
}
 
 function move(e) {
    let currNumber = e.number;  
    if (currNumber != 0 && !bingo) {   
   	let i = e.i;    
   	let j = e.j;
   	let endMove = false;   
          
   for (let k = 0; k < 4; k++ ) {  
     switch(k) {
      case 0 :{ 
      if (i + 1 < 4 && cells[i + 1][j].number === 0) {   
       cells[i + 1][j].addCell();   
       cells[i + 1][j].setText(e.number); 
       cells[i + 1][j].number = currNumber;  
       endMove = true;   
       };
      break;
      }
      case 1 :{ 
       if (j + 1 < 4 && cells[i][j + 1].number === 0) {
        cells[i][j + 1].addCell();
        cells[i][j + 1].setText(e.number);
        cells[i][j + 1].number = currNumber;
       endMove = true;
       };
      break;
      }
      case 2 :{ 
      if (i - 1 > -1 && cells[i - 1][j].number === 0) {
       cells[i - 1][j].addCell();
       cells[i - 1][j].setText(e.number);
       cells[i - 1][j].number = currNumber;
       endMove = true;
       };
      break;
      }
      case 3 :{ 
       if (j - 1 > -1 && cells[i][j - 1].number === 0) {
        cells[i][j - 1].addCell();
        cells[i][j - 1].setText(e.number);
        cells[i][j - 1].number = currNumber;
       endMove = true;
       };
      break;
      }
     }
     if (endMove) { 
      cells[i][j].number = 0;  
      e.clearCell();
      moveCount++;   
     break; 
     }
    }
   }
  }
  
function game(){
 ctx.fillStyle = "#1b796e";
 ctx.fillRect(0, 0, width, height, 20);
 setCells();
}

function setCells(){
 for (let j = 0; j < 4; j++){
  for (let i = 0; i < 4; i++){
   cells[i][j] = new Cell();
   cells[i][j].i = i;
   cells[i][j].j = j;
   cells[i][j].x = 6 + i * 70 + 8 * i;
   cells[i][j].y = 6 + j * 70 + 8 * j;
  }
 }
  newGame();
}

  function newGame() {
   bingo = false;  
   moveCount = 0; 
   let tempcount = 0;  
   random();    
   for (let j = 0; j < 4; j++ ) { 
    for (let i = 0; i < 4; i++ ) {
     cells[i][j].addCell();
     cells[i][j].setText(randomMas[tempcount]); 
     cells[i][j].number = randomMas[tempcount];
     tempcount++;
    }
  }
    cells[3][3].clearCell(); 
 cells[3][3].number = 0;
  }

  function random() {
   let flag = true;
   let temp = 0;
   let count = 0;
   for (let k = 0; k < 16; k++ ) {randomMas[k] = 0};
     
   for (let j = 0; j < 15; j++ ) { 
    while (flag) {    
     if (count === 15) break;
     temp = Math.round(15 * Math.random() + 1);
     flag = false;
     for (let i = 0; i < 16; i++ ) {  
      if (randomMas[i] === temp || temp === 16) { flag = true; break; }
     }
    }
    randomMas[j] = temp;
    count++;
    flag = true;
   }
  }
 
CanvasRenderingContext2D.prototype.fillRect = fillRect;

function fillRect(x, y, w, h, r){
this.beginPath();
this.moveTo(x + r, y);
this.lineTo(x + w - r, y);
this.quadraticCurveTo(x + w, y, x + w, y + r);
this.lineTo(x + w, y + h - r);
this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
this.lineTo(x + r, y + h);
this.quadraticCurveTo(x, y + h, x, y + h - r);
this.lineTo(x, y + r);
this.quadraticCurveTo(x, y, x + r, y);
this.fill();
}
</script>
</body>
</html>
	
