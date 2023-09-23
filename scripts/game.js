
// Initialize the gameData array with a 3x3 grid filled with zeros.
const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];



function resetGame() {
    activePlayer = 0;
    currentRound = 1;
    gameOverElement.style.display = "none";
    gameOverElement.firstElementChild.innerHTML = '<h2>You won, <span id="winner-name">PLAYER NAME</span></h2>';

    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            gameFieldElements[gameBoardIndex].textContent = '';
            gameFieldElements[gameBoardIndex].classList.remove('disabled');
            gameBoardIndex += 1;
        }
    }
}

function startNewGame() {
    if (players[0].name === "" || players[1].name === "") {
        alert("Please enter player names!");
        return;
    }

    resetGame();

    activePlayerElement.textContent = players[activePlayer].name;

    gameAreaElement.style.display = "block";
}


function switchPlayer(){
    if(activePlayer === 0){
        activePlayer = 1;
    }else{
        activePlayer = 0;
    }
    activePlayerElement.textContent = players[activePlayer].name;
}

function selectGameField(event){
    
    const selectedColumn = event.target.dataset.col - 1;
    const selectedRow = event.target.dataset.row - 1;

    if(gameData[selectedRow][selectedColumn] > 0){
        alert("Please select an empty field");
        return;
    }

    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add("disabled");
    
    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    let winnerId = checkForGameOver();
    
    if(winnerId !== 0){
        endGame(winnerId);
    }

    currentRound++;

    switchPlayer();
}

function checkForGameOver(){

    // Checking for row winner
    for(let i=0;i<3;i++){
        if(gameData[i][0]>0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]){
            return gameData[i][0];
        }
    }

    // Checking for col winner
    for(let i=0;i<3;i++){
        if(gameData[0][i]>0 && gameData[0][i] === gameData[1][i] && gameData[1][i] === gameData[2][i]){
            return gameData[0][i];
        }
    }

    //Checking for diagonal winner
    if(gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]){
        return gameData[0][0];
    }
    if(gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]){
        return gameData[2][0];
    }

    if(currentRound === 9){
        return -1;
    }

    return 0;
    
}

function endGame(winnerId){

    if(winnerId > 0){
        gameOverElement.firstElementChild.firstElementChild.textContent = "You won, "+players[winnerId - 1].name +" !";
    }else{
        gameOverElement.firstElementChild.textContent = "It's a DRAW!";
    }
    gameOverElement.style.display = "block";
}