let readlineSync = require('readline-sync');



console.log(`\n WELCOME TO BULLS AND COWS`);
console.log(" ");
let optionNumb = readlineSync.question(` What do you want to do?\n (Insert number)\n\n  - 1: Play\n  - 2: See instructions\n  - 3: Exit \n`);

let numbers= [];
let randomNum = 0;
let bulls = 0;
let cows = 0;
let arrComp = [9, 3, 7, 5];
let arrUser = [7, 3, 9, 2];

function generateNums() {
  for(i = 0; i < 4; i++){
    randomNum = Math.random() * 10;
    number.push(Math.floor(randomNum));
  };
};

function findBulls(arr1, arr2) {
  bulls = 0
  for (i = 0; i < 4; i++) {
    if (arr1[i] == arr2[i]) {
      arr1.splice(i, 1, `/`);
      arr2.splice(i, 1, `/`);
    };
  };
};


function findCows(arr1, arr2) {
  cows = 0
  for (i = 0; i < arr1.length; i++) {
    if (arr1[i] !== `/` && arr1[i] !== `*`) {
      for (j = 0; j < arr2.length; j++) {
        if (arr1[i] == arr2[j]) {
          arr1.splice(i, 1, `*`);
          arr2.splice(j, 1, `*`);
        }
      }
    }
  }
}

function finalCount(arr) {
  for (i = 0; i < arr.length; i++) {
    if (arr[i] == `/`) {
      bulls++;
    }
    else if (arr[i] == `*`) {
      cows++;
    }
    else {
      continue;
    }
  }
}


findBulls(arrComp, arrUser)
findCows(arrComp, arrUser)
finalCount(arrComp);
console.log(" ")
console.log(`bulls: ` + bulls)
console.log(`cows: ` + cows)
// let userNum = readlineSync.question(` Enter your number...`)



