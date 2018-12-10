let readlineSync = require('readline-sync');
let bulls = 0;
let cows = 0;
let winNumbers = [];
let arrComp = [];
let usrGuess = [];
let logsUser = [];
let attempts = 1
let winner = false;

function generateNums() {
  for(i = 0; i < 4; i++){
    let randomNum = Math.random() * 10;
    winNumbers.push(Math.floor(randomNum));    
  };
};

function cleanStats(){
  arrComp = []
  winNumbers = [];
  usrGuess = [];
  logsUser = [];
  attempts = 1
  winner = false;
  generateNums();
  arrComp = winNumbers.slice();
};

function playNow(){
  console.log(" ")
  let playNow = readlineSync.question(` Play game now? (y/n)\n\n`)
  playNow = playNow.toLowerCase().trim();
  if (playNow == 'y') {
    cleanStats();
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

function playAgain() {
  console.log(" ")
  let playAgain = readlineSync.question(` Would you like to play again? (y/n)\n\n`);
  playAgain.toLowerCase().trim();
  if (playAgain == 'y') {
    cleanStats()
    play(arrComp);
  }
  else if (playAgain == 'n') {
    exit()
  }
  else {
    console.log(` Please answer 'y' or 'n'\n`)
  }
};

function gameOver() {
  console.log(" ")
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
    return true;
  }
};

function findBullsAndCows(win, uGuess){
  
  usr = uGuess.slice();
  comp = win.slice();
  function findBulls(arr1, arr2) {
    bulls = 0;
    for (i = 0; i < 4; i++) {
      if (arr1[i] == arr2[i]) {
        arr1.splice(i, 1, `B`);
        arr2.splice(i, 1, `B`);
      } 
    }
  }
  
  function findCows(arr1, arr2) {
    cows = 0;
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
    bulls = 0;
    cows = 0;
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
  
  function checkWinner(comp, win) {
    if ((comp.toString().replace(/,/g, '')) == 'BBBB') {
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
  checkWinner(comp, win);
  checkAttempts();  
  uGuess = uGuess.toString().replace(/,/g, '')
  logsUser.push(` ${uGuess}: You have ${bulls} bulls and ${cows} cows`);
  console.log(" ")
  if( checkAttempts() == true) {
    logsUser.forEach(function (userlog) {
      console.log(userlog);
    })
    console.log(" ");
  }
  else {
    playAgain();
  }
  comp = win.slice;
};

function userGuess() {
  let currUserGuess = 0;
  console.log(" ");
  console.log(` Attempt #${attempts}`)
  userInput = readlineSync.question(` What is your number? \n\n`);
  currUserGuess = userInput.replace(/ /g, '');
  if(Number(currUserGuess) == "NaN" || currUserGuess.length !== 4){
    console.log(` Please enter a four digit number!\n`);
    attempts --;
    userGuess();
  }
  else {
    currUserGuess = currUserGuess.split("")
    usrGuess = currUserGuess.slice(); 
  }
  attempts ++;
  findBullsAndCows(winNumbers, usrGuess);
}

function play(arrComp) {
  console.log(arrComp);
  console.log(" ")
  console.log(` Game on!!`)
  console.log(" ");
  console.log(` The computer's number is: XXXX`)
  do {
    userGuess();
  }
  while( checkAttempts() );
}

function setUp() {
  wynNumbers = [];
  generateNums();
  arrComp = winNumbers.slice();
  return arrComp;
}

function exit() {
  console.log(" ")
  console.log(` Thank you for playing Bulls and Cows!\n\n`);
  process.exit;
};

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


