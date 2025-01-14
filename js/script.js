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
  const number = Math.random() * 100;
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
    return manualy();
  };
}


