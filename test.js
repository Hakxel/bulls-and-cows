let bulls = 0;
let cows = 0;
let arrComp = [9, 3, 7, 4];
let arrUser = [4, 3, 4, 9];


function findBulls(arr1, arr2) {
  bulls = 0
  for (i = 0; i < 4; i++) {
    if (arr1[i] == arr2[i]) {
      // bulls += 1;
      arr1.splice(i, 1, `/`);
      arr2.splice(i, 1, `/`);
      console.log(arr1, arr2)
    };
  };
  // return bulls;
};


// findBulls(first, second)
console.log(`arrComp ` + arrComp )
console.log(`arrUser` + arrUser)
// console.log(`first` + first)
// console.log(`second` + second)


function findCows(arr1, arr2) {
  cows  = 0
  for (i = 0; i < arr1.length; i++) {
      if (arr1[i] !== `/` && arr1[i] !== `*`){
        for (j = 0; j <arr2.length; j++) {
          if (arr1[i] == arr2[j]) {
            console.log(`cows count inside` + cows);
            arr1.splice(i, 1, `*`);
            arr2.splice(j, 1, `*`);
            // cows ++;
          }
        }
        // return cowsCount;
      }
    console.log(`cows count final` + cows);
    console.log(arr1, arr2);  
    // cows += cowsCount.length;
  }
  // return cows
}

function finalCount(arr) {
  for (i = 0; i < arr.length; i++){
    if(arr[i] == `/`) {
      bulls ++;
    }
    else if(arr[i] == `*`){
      cows ++;
    }
    else{
      continue;
    }
  }
}

findBulls(arrComp, arrUser);
findCows(arrComp, arrUser);
finalCount(arrComp);
console.log(`bulls ` + bulls);
console.log(`cows ` + cows);