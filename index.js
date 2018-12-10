let readlineSync = require('readline-sync');
let bulls;
let cows;
let randomNum;
let winNumbers = [];
let arrComp = [];
let usrGuess = [];
let arrsUser = [];
let guesses = [];
let attempts = 1
let winner = false;

function generateNums() {
  for(i = 0; i < 4; i++){
    randomNum = Math.random() * 10;
    winNumbers.push(Math.floor(randomNum));    
  };
};

function playAgain() {
  console.log(" ")
  let playAgain = readlineSync.question(` Would you like to play again? (y/n)\n`);
  playAgain.toLowerCase().trim();
  if (playAgain == 'y') {
    play(arrComp);
  }
  else if (playAgain == 'n') {
    exit()
  }
  else {
    console.log(` Please answer 'y' or 'n'\n`)
  }
};


function findBullsAndCows(comp, usr, win){
  
  function findBulls(arr1, arr2) {
    bulls = 0
    for (i = 0; i < 4; i++) {
      if (arr1[i] == arr2[i]) {
        arr1.splice(i, 1, `B`);
        arr2.splice(i, 1, `B`);
      };
    };
  };
  
  
  function findCows(arr1, arr2) {
    cows = 0
    for (i = 0; i < arr1.length; i++) {
      if (arr1[i] !== `B` && arr1[i] !== `C`) {
        for (j = 0; j < arr2.length; j++) {
          if (arr1[i] == arr2[j]) {
            arr1.splice(i, 1, `C`);
            arr2.splice(j, 1, `C`);
          }
        }
      }
    }
  }
  
  function finalCount(arr2) {
    console.log(`procCurUsG: ` + arr2)
    for (i = 0; i < arr2.length; i++) {
      if (arr2[i] == `B`) {
        bulls++;
      }
      else if (arr2[i] == `C`) {
        cows++;
      }
      else {
        continue;
      }
    }
  }
  
  function checkWinner(usr, win) {
    console.log(usr)
    if (usr.toString().replace(/,/g, '') == 'BBBB') {
      win = win.toString().replace(/,/g, '');
      console.log(" ")
      console.log(` The computer's number is ${win} !!!\n`)
      console.log(` YOU ARE A WINNER!!!\n`);
      winner = true;
    }
  };

  findBulls(comp, usr);
  findCows(comp, usr);
  finalCount(comp);
  checkWinner(usr, win)  
  console.log(" ")
  console.log(` Your have ${bulls} bulls and ${cows} cows`)
};

function gameOver() {
  console.log(` The Game is over.`);
  console.log(` Computer's number was ${winNumbers.toString().replace(/,/g, "")}\n`);
  console.log(` YOU LOST`)
  playAgain();
};

function checkAttempts() {
  if(winner == true) {
    return false;
  }
  
  else if(attempts == 15) {
    console.log(" ")
    console.log(` Last chance...Choose wisely`)
    return true;
  }

  else if(attempts > 15){
    gameOver()
    return false;
  }
  else {
    console.log(` Attempt #${attempts}`)
    return true;
  }
};

function checkPreviousGuess(prevGuess, currGuess) {
  if (prevGuess.includes(currGuess)){
    console.log(" ")
    console.log(` You have already used that number.\n Please enter a different one. \n\n`)
    attempts --;
    userGuess();
  };
};


function userGuess() {
  let currUserGuess = 0;
  let arrComp = winNumbers.slice();
  userInput = readlineSync.question(` What is your number? \n\n`);
  currUserGuess = userInput.replace(/ /g, '');
  checkPreviousGuess(arrsUser, currUserGuess);
  if(Number(currUserGuess) == "NaN" || currUserGuess.length !== 4){
    console.log(` Please enter a four digit number!\n`);
    attempts --;
    userGuess();
  }
  else {

    usrGuess = currUserGuess.split("");
    guesses = currUserGuess.split("").slice()
    arrsUser.push(usrGuess);
    console.log(`currUsG: ` + currUserGuess);
    console.log(`usrGuess: ` + usrGuess);
    console.log(`ArrUser: ` + arrsUser);
    console.log(`ArrComp: ` + arrComp);
    console.log(`winNumbers: ` + winNumbers);
    
  }
  attempts ++;
  findBullsAndCows(arrComp, usrGuess, winNumbers);
  console.log(`currUsG: ` + currUserGuess);
  console.log(`usrGuess: ` + usrGuess);
  console.log(`ArrUser: ` + arrsUser);
  console.log(`ArrComp: ` + arrComp);
  console.log(`winNumbers: ` + winNumbers);
  console.log(`guesses: ` + guesses);
  
}

function setUp() {
  wynNumbers = [];
  generateNums();
  arrComp = winNumbers.slice();
  return arrComp;
}

function play(arrC) {
  console.log(arrC);
  console.log(" ")
  console.log(` Game on!!`)
  console.log(" ");
  console.log(` The computer's number is: XXXX`)
  do {
    userGuess();
  }
  while( checkAttempts() );
}

function exit() {
  console.log(" ")
  console.log(` Thank you for playing Bulls and Cows!\n\n`);
  process.exit;
};

function playNow(){
  console.log(" ")
  let playNow = readlineSync.question(` Play game now? (y/n)\n\n`)
  playNow = playNow.toLowerCase().trim();
  if (playNow == 'y') {
    play(arrComp);
  }
  else if (playNow == 'n') {
    console.log(" ")
    startGame();
  }
  else {
    console.log(" ")
    console.log(` Please enter 'y' or 'n'\n\n`)
  }
}

function seeInstructions() {
  console.log(` Bulls and Cows is a simple guessing game. Your goal is to decipher\n a four digit number that the computer has generated for you.\n In order to do so, you must tell the computer a four digit number\n of your own. If your guess has the right digit at the exact position,\n you will have found a BULL. If your guess has the right digit,\n but in a different position than in the computer's number, you will\n have found a COW. The rest of the digits don't count. \n You have 15 attemps to find the four Bulls. `);
  playNow();
}


function startGame() {
  console.log(`\n WELCOME TO BULLS AND COWS`);
  console.log(" ");
  setUp();
  let optionNumb = readlineSync.question(` What do you want to do?\n (Insert number)\n\n  - 1: Play\n  - 2: See instructions\n  - 3: Exit \n\n`);
  optionNumb = Number(optionNumb.trim());
  if (optionNumb == '1'){
    console.log(" ")
    play(arrComp);
  }
  else if (optionNumb == '2') {
    console.log(" ")
    seeInstructions();
  } 
  else if (optionNumb == '3') {
    console.log(" ")
    exit()
  }
  else {
    console.log(" ")
    console.log(` Please enter a number for the option...`)
    startGame();
  }
} 

startGame();


