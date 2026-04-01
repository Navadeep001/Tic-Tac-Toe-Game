const cells=document.querySelectorAll(".cell");
const statusText=document.getElementById("status");
const restartBtn=document.getElementById("restart");
const aiToggle=document.getElementById("ai-toggle");

let board=["","","","","","","","",""];
let currentPlayer="X";
let running=true;

const winPatterns=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

const clickSound=new Audio("https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3");
const winSound=new Audio("https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3");

cells.forEach(cell=>cell.addEventListener("click",cellClick));
restartBtn.addEventListener("click",restartGame);

function cellClick(){

const index=this.dataset.index;

if(board[index]!=""||!running) return;

updateCell(this,index);
checkWinner();

if(aiToggle.checked && running && currentPlayer==="O"){
setTimeout(aiMove,400);
}

}

function updateCell(cell,index){

board[index]=currentPlayer;
cell.textContent=currentPlayer;
clickSound.play();

}

function changePlayer(){

currentPlayer=currentPlayer==="X"?"O":"X";

statusText.textContent=`Player ${currentPlayer}'s Turn`;

}

function checkWinner(){

let roundWon=false;

for(let i=0;i<winPatterns.length;i++){

const pattern=winPatterns[i];

const a=board[pattern[0]];
const b=board[pattern[1]];
const c=board[pattern[2]];

if(a==""||b==""||c=="") continue;

if(a===b && b===c){

roundWon=true;

pattern.forEach(index=>{
cells[index].classList.add("win");
});

break;

}

}

if(roundWon){

statusText.textContent=`Player ${currentPlayer} Wins!`;
winSound.play();
running=false;
return;

}

if(!board.includes("")){

statusText.textContent="Draw!";
running=false;
return;

}

changePlayer();

}

function restartGame(){

board=["","","","","","","","",""];
currentPlayer="X";
running=true;

statusText.textContent="Player X's Turn";

cells.forEach(cell=>{
cell.textContent="";
cell.classList.remove("win");
});

}

function aiMove(){

let emptyCells=board
.map((val,index)=>val==""?index:null)
.filter(val=>val!==null);

let randomIndex=
emptyCells[Math.floor(Math.random()*emptyCells.length)];

cells[randomIndex].click();

}
