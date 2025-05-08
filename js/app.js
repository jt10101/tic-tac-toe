/*-------------------------------- Constants --------------------------------*/

const gameMarkers = ["O", "X"]; // These are used to determine what the game markers are
const markerValues = [4, 1];

// Determination of a win
// The tic tock toe grid is as follows and each square is assigned with a unique ID from 0-8
// [0] [1] [2]
// [3] [4] [5]
// [6] [7] [8]

// Whenever a grid is populated with either X or O, we will assign a VALUE to it
// Value :
// X = 1
// O = 4

// [X] [ ] [ ]      [1] [ ] [ ]
// [ ] [ ] [ ]  ==> [ ] [ ] [ ]
// [ ] [ ] [ ]      [ ] [ ] [ ]

// [X] [ ] [X]      [1] [ ] [1]
// [ ] [O] [ ]  ==> [ ] [4] [ ]
// [ ] [ ] [ ]      [ ] [ ] [ ]

// To win the game, you need to fill certain grids with the same marker.
// There are 8 possible win combitions. Using the below grid as reference:
// [0] [1] [2]
// [3] [4] [5]
// [6] [7] [8]

// The winning combitions are:
// #1 Fill the top row (0,1,2)      => topRow
// #2 Fill the middle row (3,4,5)   => middleRow
// #3 Fill the bottom row (6,7,8)   => bottomRow
// #4 Fill the left column (0,3,6)  => leftCol
// #5 Fill the middle column (1,4,7)=> middleCol
// #6 Fill the right column (2,5,8) => rightCol
// #7 Left diagonal (0,4,8)         => leftDiag
// #8 Right diagonal (2,4,6)        => rightDiag

// Since we need the winning combition squares to be filled with the same marker
// We can assuming that the winning condition is met when the values associated with the combitions are either:
// 3 or 16, where:
// X wins when the sum of any combition is 3
// O wins when the sum of any combition is 16

// The below object stores the value of the corresponding win conditions
const winConditions = {
  topRow: 0,
  middleRow: 0,
  bottomRow: 0,
  leftCol: 0,
  middleCol: 0,
  rightCol: 0,
  leftDiag: 0,
  rightDiag: 0,
};

const gridPopulation = {
  0: ["topRow", "leftCol", "leftDiag"],
  1: ["topRow", "middleCol"],
  2: ["topRow", "rightCol", "rightDiag"],
  3: ["middleRow", "leftCol"],
  4: ["middleRow", "middleCol", "leftDiag", "rightDiag"],
  5: ["middleRow", "rightCol"],
  6: ["bottomRow", "leftCol", "rightDiag"],
  7: ["bottomRow", "middleCol"],
  8: ["bottomRow", "leftDiag", "rightCol"],
};

/*---------------------------- Variables (state) ----------------------------*/
const game = {
  selectedBox: "",
  currentPlayer: 0, // toggles between 0 and 1, 0 being o and 1 being X
  winConditionMet: false,
  message: "O turn!",
};

/*------------------------ Cached Element References ------------------------*/
const squareBlocks = document.querySelectorAll(".sqr");
const turnMessage = document.getElementById("turn");
const resetButton = document.getElementById("reset-button");
/*-------------------------------- Functions --------------------------------*/
// Function that assigns the ID of the selected box to {Object game} + calculates value
const squareClick = (boxID) => {
  game.selectedBox = Number(boxID);
  //   console.log(gridPopulation[boxID]);
  for (let i = 0; i < gridPopulation[boxID].length; i++) {
    let x = gridPopulation[boxID][i]; // this set x to be the value we want to manipulate
    winConditions[x] += markerValues[game.currentPlayer];
  }
};
// Check win condition
const checkWin = () => {
  const checkValues = Object.values(winConditions);
  //   console.log(checkValues);
  const winConditionMetCheck =
    checkValues.includes(3) || checkValues.includes(12);
  //   console.log(winConditionMetCheck);
  if (winConditionMetCheck) {
    game.winConditionMet = true;
    game.message = "We have a winner!";
  }
};
// Function that prints the current X or O marker to the selected box
const render = () => {
  squareBlocks[game.selectedBox].textContent = gameMarkers[game.currentPlayer];
  //   console.log(game.selectedBox);
};

const resetFunc = () => {
  //reset game object to defaults
  game.currentPlayer = 0;
  game.winConditionMet = false;
  game.message = "O turn!";
  turnMessage.textContent = game.message;
  //reset win condition values to 0
  for (const i in winConditions) {
    if (winConditions.hasOwnProperty(i)) {
      winConditions[i] = 0;
    }
  }
  //clears board of existing markers
  for (let i = 0; i < squareBlocks.length; i++) {
    const square = squareBlocks[i];
    squareBlocks[i].textContent = "";
  }
};
/*----------------------------- Event Listeners -----------------------------*/
const main = () => {
  for (let i = 0; i < squareBlocks.length; i++) {
    const square = squareBlocks[i];
    square.addEventListener("click", (event) => {
      squareClick(event.target.id);
      render();
      checkWin();
      if (game.winConditionMet === true) {
        turnMessage.textContent = game.message;
      } else {
        if (game.currentPlayer === 0) {
          game.currentPlayer++;
          game.message = "X turn!";
        } else {
          game.currentPlayer--;
          game.message = "O turn!";
        }
        turnMessage.textContent = game.message;
        console.log(game);
        console.log(winConditions);
      }
    });
  }
};
resetButton.addEventListener("click", resetFunc);
/*---------------------------- Checks of balance ----------------------------*/

main();
