/*eslint-disbale*/
"use strict";

/*********************Exercise 01**************** */

// const iasPrime = num => {
//     for(let i = 2, s = Math.sqrt(num); i <= s; i++)
//         if(num % i === 0) return false;
//     return num > 1;
// }

//console.log(isPrime(50));

let isPrime = (num) =>
  new Promise((resolve, reject) => {
    setTimeout(function () {
      for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) reject({ prime: false });

      resolve({ prime: num > 1 });
    }, 500);
  });

console.log("start");
isPrime(1)
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
console.log("end");

/*********************Exercise 02**************** */

Array.prototype.removeDuplicatesAsync = function () {
  let arr = this;
new Promise(function(resolve,reject){
    resolve([...new Set(arr)])
}).then(console.log);

};


console.log(`start`);
[4, 1, 5, 7, 2, 3, 1, 4, 6, 5, 2].removeDuplicatesAsync();
console.log(`end`);
