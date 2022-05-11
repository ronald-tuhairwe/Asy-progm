/* eslint-disable*/
"use strict";

let isPrime = (num) =>
  new Promise((resolve, reject) => {
    setTimeout(function () {
      for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) reject({ prime: false });

      resolve({ prime: num > 1 });
    }, 500);
  });

async function isPrimeAsync(num) {
  try {
    let res = await isPrime(num);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

console.log("start");
isPrimeAsync(7);
console.log("end");

// Output:
// start
// end
// { prime: true }

/*********************Exercise 02**************** */

Array.prototype.removeDuplicatesAsync = async function () {
  let arr = this;
  let prms = new Promise(function (resolve, reject) {
    resolve([...new Set(arr)]);
  });

  console.log(await prms);
};

console.log(`start`);
[4, 1, 5, 7, 2, 3, 1, 4, 6, 5, 2].removeDuplicatesAsync();
console.log(`end`);
