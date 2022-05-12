/*eslint-disable*/
'use strict'

window.onload=function(){


 let res=function (){
        let wrapper=document.getElementById("wrp"); 
        fetch('https://randomuser.me/api/?results=5')
        .then(response => response.json())
        .then(commit => {
        console.log(commit.results);
        commit.results.forEach(elem =>{
         
        wrapper.innerHTML  += `<div id="img">
        <img src="${elem.picture.medium}"> </div>
        <div id="name">${elem.name.first} ${elem.name.last}</div>
        <div id="phone">${elem.phone}</div>
        <div id="email">${elem.email}</div>`   
        })
    
        })
        wrapper.innerHTML ="";
    }
  res();
    
let btn =document.getElementById('btn');
btn.onclick= res;

}