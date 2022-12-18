window.addEventListener("DOMContentLoaded", () => {
    const boxes = Array.from(document.querySelectorAll(".col-sm"));
    const displayCurrentPlayer = document.querySelector(".display-player");
    const displayWinner = document.querySelector(".annouce-winner");
    const resetGame = document.querySelector('#reset');

    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let activeGame = true;

    // prompts the players to enter names at the start of the game.
                let player1 = prompt("Player for X enter a name please");
                console.log(player1);

                let player2 = prompt("Player for O enter a name please");
                console.log(player2);

    // sets each player by name
    let playerXWinner = `${player1} Wins as X`
    let playerOWinner = `${player2} Wins as O`
    let tie = "Tie Game Please Reset"

    /* 
    Game play's like 
    [0][1][2]
    [3][4][5]
    [6][7][8]
    */
    
// Each space is set within the array as a winning condition and the function below this checks this condition

    const conditionsForWin = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    // checks results of each play and checks if a winning condition was met ends the game if round was won.

    function handleResult() {
        let roundWin = false;
        for (let i = 0; i <= 7; i++) {
            let winnerCondition = conditionsForWin[i];
            let one = gameBoard[winnerCondition[0]];
            let two = gameBoard[winnerCondition[1]];
            let three = gameBoard[winnerCondition[2]];
            if (one === "" || two === "" || three === "") {
                continue;
            }
            if (one === two && two === three) {
                roundWin = true;
                break;
            }
        }
        if (roundWin) {
            announce(currentPlayer === "O" ? playerOWinner : playerXWinner);
            activeGame = false;
            return;
        }

        if (!gameBoard.includes(""))
            announce(tie);
    }

    // This announces the winner at when one of the winning conditions is met if the case is met that condition runs.

    let announce = (type) => {
        switch (type) {
            case playerOWinner:
                displayWinner.innerHTML = `${player2} As <span class="PlayerO">O</span> Won`;
                break;
            case playerXWinner:
                displayWinner.innerHTML = `${player1} As <span class="PlayerX">X</span> Won`;
                break;
            case tie:
                displayWinner.innerText = `Tie Game Please Reset`;
        }
        displayWinner.classList.remove("hide");
    };

    // this function makes sure something cant be entered as a wrong move.

    let isGoodMove = (box) => {
        if (box.innerText === "X" || box.innerText === "O") {
            return false;
        }
        return true;
    }

    // this updates the game board every time to the current player that's turn it is.
    let updateGame = (index) => {
        gameBoard[index] = currentPlayer;
    }

// this function changes the player once the opposite player has made their move.

    let changePlayer = () => {
        displayCurrentPlayer.classList.remove(`Player${currentPlayer}`);
        currentPlayer = currentPlayer === "O" ? "X" : "O";
        displayCurrentPlayer.innerText = currentPlayer;
        displayCurrentPlayer.classList.add(`Player${currentPlayer}`);
    }

    // this is the action of actually clicking on each box that is the game board that tells the game to change players and handle the result of the play.
    let userAction = (box, index) => {
        if (isGoodMove(box) && activeGame) {
            box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateGame(index);
            handleResult();
            changePlayer();
        }
    }

    // this is makes each box clickable and gives them function.

    boxes.forEach( (box, index) => {
        box.addEventListener("click", () => userAction(box, index)); 
    });


    //this is the logic for the reset button it clears all the boxes and adds the class tag hide back too the display winner box so it disappears from the page when the game is ongoing. 

      const resetGameButton = () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        activeGame = true;
        displayWinner.classList.add("hide");

        if (currentPlayer === "X") {
            changePlayer();
        }
        
        boxes.forEach(box => {
            box.innerText = "";
            box.classList.remove("PlayerO");
            box.classList.remove("PlayerX");
        });
    }
    resetGame.addEventListener("click", resetGameButton);



    
});
