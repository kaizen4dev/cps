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
