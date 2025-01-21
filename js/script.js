// update logs template 
function updateLogs(msg){
  const logs = document.querySelector(".logs .content");
  const newEntry = document.createElement("p");
  newEntry.textContent = msg || "I'm not a zombie!";
  logs.prepend(newEntry);
  return;
}

// let zombie choose an item
function bot(){
  const number = Math.random() * 100 + 1;
  if(number < 34){
    return "cobble";
  } else if(number < 67) {
    return "paper";
  } else if (number < 100){
    return "shears";
  } else {
    return "dia";
  };
};

// let player manualy write chosen item
function getInput() {
  const input = prompt("Choose: cobble, paper, or shears").toLowerCase();
  if(input == "cobble" 
    || input == "paper" 
    || input ==  "shears"
    || input == "dia"){
    // updateLogs(`You manualy chose ${input}.`);
    return input;
  } else {
    alert("Invalid input.")
    return getInput();
  };
}

// updates score for passed player
function updateScore(name){
  const score = document.querySelector(`.score .${name}`);
  score.textContent = Number(score.getHTML()) + 1;
  return;
}

// get Winner
function getWinner(nameOne, nameTwo){

  let winner;

  if(nameOne == nameTwo){
    return "Tie";
  };

  switch(nameOne){
    case "dia":
      winner = nameOne;
      break;
    case "cobble":
      winner = nameTwo == "shears" ? nameOne : nameTwo;
      break;
    case "paper":
      winner = nameTwo == "cobble" ? nameOne : nameTwo;
      break;
    case "shears":
      winner = nameTwo == "paper" ? nameOne : nameTwo;
      break;
  };

  return winner;
}

// get current score
function getScore(name){
  const score = document.querySelector(`.score .${name}`);
  return score.getHTML();
}

function resetScore(){
  document.querySelector(".score .player").textContent = "";
  document.querySelector(".score .zombie").textContent = "";
  updateLogs("Score is reseted.")
}

function getGamemode(){
  return document.querySelector(".gamemode").textContent;
}

function updateGamemode(){
  resetScore();
  let gamemode = document.querySelector(".gamemode");
  if(getGamemode() == "Infinity"){
    gamemode.textContent = "Best of 5";
  } else {
    gamemode.textContent = "Infinity";
  }
  updateLogs(`Gamemode switched to "${gamemode.textContent}"`);
}

function updateGame(){

  let gamemode = getGamemode();
  let playerScore = getScore("player");
  let zombieScore = getScore("zombie");
  let winningScore;

  if(gamemode == "Best of 5"){
    winningScore = 3;
  } else return;

  if(playerScore == winningScore || zombieScore == winningScore){
    resetScore();
    updateLogs("------------------------------------");
    updateLogs(`Zombie's score: ${zombieScore}`);
    updateLogs(`Your score: ${playerScore}`);
    updateLogs("-----------Game over!-----------");
  }
}

// finally we can play..
function play(choice){
  const player = choice || getInput();
  const zombie = bot();

  const winner = getWinner(player, zombie);

  if(winner == "Tie"){
    updateLogs("Tie!");
  } else if(winner == player){
    updateLogs(`Zombie chose ${zombie}. You won!`)
    updateScore("player")
  } else {
    updateLogs(`Zombie chose ${zombie}. You lost.`)
    updateScore("zombie")
  }
  updateGame();
}
