/*eslint-disable*/
"use strict";

window.onload = function () {
  let res = async function () {
    let wrapper = document.getElementById("wrp");
    let res = await fetch("https://randomuser.me/api/?results=5");
    let commit = await res.json();

    wrapper.innerHTML = "";
    commit.results.forEach((elem) => {
      wrapper.innerHTML += `<div id="img">
        <img src="${elem.picture.medium}"> </div>
        <div id="name">${elem.name.first} ${elem.name.last}</div>
        <div id="phone">${elem.phone}</div>
        <div id="email">${elem.email}</div>`;
    });
  };

  res();

  let btn = document.getElementById("btn");
  btn.onclick = res;
};


let array=[1,2,3,8]
console.log(array.indexOf(8));
