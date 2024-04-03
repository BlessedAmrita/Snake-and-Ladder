const player_1_steps = document.querySelector("#player-1-steps");
const player_2_steps = document.querySelector("#player-2-steps");
const roll_dice = document.querySelector("#roll-dice");
const player_1_position = document.querySelector(".player-1-position");
const player_2_position = document.querySelector(".player-2-position");
const initial_position_1=document.querySelector("#initial-position-1");
const final_position_1=document.querySelector("#final-position-1");
const initial_position_2=document.querySelector("#initial-position-2");
const final_position_2=document.querySelector("#final-position-2");


const snake = [
  { start: 98, end: 78 },
  { start: 95, end: 75 },
  { start: 93, end: 73 },
  { start: 87, end: 24 },
  { start: 62, end: 19 },
  { start: 64, end: 60 },
  { start: 54, end: 34 },
  { start: 17, end: 7 },
];

const ladder = [
  { start: 80, end: 100 },
  { start: 71, end: 91 },
  { start: 28, end: 84 },
  { start: 51, end: 67 },
  { start: 21, end: 42 },
  { start: 1, end: 38 },
  { start: 4, end: 14 },
  { start: 9, end: 31 },
];

function snakeCheck(position){
    snake.forEach((snakePosition)=>{
        
        if(position===snakePosition.start)
        {
            position=snakePosition.end;
           
        }
    })
    return position;
}
function ladderCheck(position){
    ladder.forEach((ladderPosition)=>{
        if(position===ladderPosition.start)
        {
            position=ladderPosition.end;
            
        }
    })
    return position;
}
function diceNumber() {
  return Math.floor(Math.random() * 6 + 1);
}

let i = 1;
let dice_number = 0;


roll_dice.addEventListener("click", () => {
 initial_position_1.innerText=findPosition_1();
 initial_position_2.innerText=findPosition_2();
  if (i === 1) {
    dice_number = diceNumber();
    player_1_steps.innerText = dice_number;
    player_2_steps.innerText = "Your Turn!";
    move_position_1(dice_number);
  } else {
    dice_number = diceNumber();
    player_1_steps.innerText = "Your Turn!";
    player_2_steps.innerText = dice_number;
    move_position_2(dice_number);
  }
  i *= -1;
  final_position_1.innerText=findPosition_1();
  final_position_2.innerText=findPosition_2();
});
let row; let column;



//----------------------------------------------------------------------------------------

function move_position_1(dice_number) {
  let position = findPosition_1() + dice_number;
  if(position>=100) return;
  position=snakeCheck(position);
  position= ladderCheck(position);
  if (position % 10 !== 0) {
    row = 10 - Math.floor(position / 10);
    
    if (row % 2 !== 0) column = 11 - (position % 10);
    else column = position % 10;
  } else {
    row = 11 - Math.floor(position / 10);
    if (row % 2 === 0) column = 10;
    else column = 1;
  }
  player_1_position.style.gridRow = row;
  player_1_position.style.gridColumn = column;
  
  checkWinner(position);
}
//----------------------------------------------------------------------------------------------------


function move_position_2(dice_number) {
  let position = findPosition_2() + dice_number;
  if(position>100) return;
  position=snakeCheck(position);
  position= ladderCheck(position);
  if (position % 10 !== 0) {
    row = 10 - Math.floor(position / 10);
    if (row % 2 !== 0) column = 11 - (position % 10);
    else column = position % 10;
  } else {
    row = 11 - Math.floor(position / 10);
    if (row % 2 === 0) column = 10;
    else column = 1;
  }
  player_2_position.style.gridRow = row;
  player_2_position.style.gridColumn = column;
  checkWinner(position);
}
//------------------------------------------------------------------------------------------------------------

function findPosition_1() {
  let position;
  let rowPosition = parseInt(player_1_position.style.gridRow);
  let columnPosition = parseInt(player_1_position.style.gridColumn);
  //    console.log("player1 row:", rowPosition);
  //    console.log("player1 column:", columnPosition);
  if (rowPosition % 2 === 0) {
    position = (10 - rowPosition) * 10 + columnPosition;
  } else {
    position = (10 - rowPosition) * 10 + 11 - columnPosition;
  }
  return position;
}

//-----------------------------------------------------------------------------------------------------------------
function findPosition_2() {
  let position;
  let rowPosition = parseInt(player_2_position.style.gridRow);
  let columnPosition = parseInt(player_2_position.style.gridColumn);
  //    console.log("player2 row:", rowPosition);
  //    console.log("player2 column:", columnPosition);
  if (rowPosition % 2 === 0) {
    position = (10 - rowPosition) * 10 + columnPosition;
  } else {
    position = (10 - rowPosition) * 10 + 11 - columnPosition;
  }
  return position;
}



function checkWinner(position){
    if(position===100){
        roll_dice.disabled=true;
        roll_dice.innerText="Winner";
    }
}