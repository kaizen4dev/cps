// update logs template 
function updateLogs(msg){
  const logs = document.querySelector(".logs .content");
  const newEntry = document.createElement("p");
  newEntry.textContent = msg || "I'm not a zombie!";
  logs.prepend(newEntry);
  return;
}
