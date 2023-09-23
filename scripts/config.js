function openPlayerConfig(event){
    editedPlayer = +event.target.dataset.playerid;
    playerConfigOverlayElement.style.display = "block";
    backdropElement.style.display = "block";
}

function closePlayerConfig(){
    playerConfigOverlayElement.style.display = "none";
    backdropElement.style.display = "none";
    formElement.firstElementChild.classList.remove("error");
    errorOutputElement.innerText = "";
    formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayerName = formData.get('playername').trim();
    if(!enteredPlayerName){
        event.target.firstElementChild.classList.add("error");
        errorOutputElement.textContent = "Enter a valid name!";
        errorOutputElement.style.color = "red";
        return;
    }
    
    players[editedPlayer - 1].name = enteredPlayerName;

    const updatedPlayerDataElement = document.getElementById("player-"+editedPlayer+"-data");
    updatedPlayerDataElement.children[1].textContent = enteredPlayerName;
    closePlayerConfig();
}