// update logs template 
function updateLogs(msg){
  const logs = document.querySelector(".logs .content");
  const newEntry = document.createElement("p");
  newEntry.textContent = msg || "I'm not a zombie!";
  logs.prepend(newEntry);
  return;
}

// clear logs
function clearLogs(){
  const logs = document.querySelector(".logs .content");
  while (logs.firstChild) {
    logs.removeChild(logs.firstChild);
  }
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

// old way
function getInputOldWay() {
  const input = prompt("Choose: cobble, paper, or shears").toLowerCase();
  if(input == "cobble" 
    || input == "paper" 
    || input ==  "shears"
    || input == "dia"){
    // updateLogs(`You manualy chose ${input}.`);
    return input;
  } else {
    alert("Invalid input.")
    return getInputOldWay();
  };
}

// new way, by creating modal.
function getInput() {
  // create elements
  const dialog = document.createElement("dialog");
  const text = document.createElement("p");
  const input = document.createElement("input");
  const submit = document.createElement("button");
  const cancel = document.createElement("button");
  const status = document.createElement("span");

  // assign text and styles to elements
  text.innerHTML = "Choose cobble, paper, or shears. ";

  submit.textContent = "Submit";
  submit.style.backgroundColor = "blue";
  submit.style.color = "white"

  cancel.textContent = "Cancel";
  cancel.style.backgroundColor = "gray";
  cancel.style.color = "white";

  // add event listeners to buttons
  cancel.addEventListener('click', () => {
    dialog.close();
    dialog.remove();
  })

  submit.addEventListener('click', () => {
    // check correctness of choice, if so, play it and close(remove) dialog.
    // Otherwise show "invalid input" in the modal
    if(input.value == "cobble" 
      || input.value == "paper" 
      || input.value ==  "shears"){
      play(input.value); 
      dialog.close();
      dialog.remove();
    } else {
      status.textContent = "Invalid input";
      status.style.color = "red";
      text.append(status);
    };
  })

  // append elements to dialog
  dialog.append(text);
  dialog.append(input);
  dialog.append(cancel);
  dialog.append(submit);

  // append dialog to body and show it
  document.querySelector("body").append(dialog);
  dialog.showModal();
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
    gamemode.textContent = "Best of 3";
  } else if(getGamemode() == "Best of 3"){
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
  } else if(gamemode == "Best of 3"){
    winningScore = 2;
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
  const player = choice || getInputOldWay(); // old way used as fallback, in case where choice isn't passed to play() function.
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

// listen for events
function listen(){
  // clicks
  addEventListener('click', (e) => {
    switch(e.target.className){
      case "cobble":
        play("cobble");
        break;
      case "paper":
        play("paper");
        break;
      case "shears":
        play("shears");
        break;
      case "write-manualy":
        getInput();
        break;
      case "switch-gamemode":
        updateGamemode();
        break;
      case "test-logs":
        updateLogs();
        break;
      case "reset-score":
        resetScore();
        break;
      case "clear-logs":
        clearLogs();
        break;
    }
  })
}
listen();
