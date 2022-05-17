/* eslint-disable*/
"use strict";
const SERVER_ROOT = "http://localhost:3000";

window.onload = function () {
  if (localStorage.getItem("accessToken")) {
    document.getElementById("page").innerHTML = afterlogin;
    fetchMusic();
    document.getElementById("logout").onclick = logout;
  } else {
    document.getElementById("username").innerHTML = "";
    document.getElementById("password").innerHTML = "";

    document.getElementById("login").onclick = function () {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      fetch(`${SERVER_ROOT}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => loggedInFeatures(data));
    };
  }
};

function loggedInFeatures(data) {
  if (data.status) {
    document.getElementById("errormessage").innerHTML = data.message;
  } else {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    localStorage.setItem("accessToken", data.accessToken);
    document.getElementById("page").innerHTML = afterlogin;
    fetchMusic();
    document.getElementById("logout").onclick = logout;
  }
}

function fetchMusic() {
  fetch(`${SERVER_ROOT}/api/music`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((response) => response.json())
    .then((songs) => {
      let c = 1;
      for (let x of songs) {
        let tr = `<tr>
        <td> ${c++} </td>
        <td>${x.title}</td>
        <td>${x.releaseDate}</td>
        <td><button id="ron" class="test" data-num="${x.id}" >+</button></td>
      </tr>`;

        document.getElementById("tbrow").innerHTML += tr;
      }


  /********************************the play list****************** */

  fetch(`${SERVER_ROOT}/api/playlist`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((response) => response.json())
    .then((songs) => {
      for (let x of songs) {
        let tr = `<tr id="row" >
      <td> ${x.orderId} </td>
      <td>${x.title}</td>
      <td style="text-align: right"> <button    class="test2" data-num2="${x.songId}" >x</button> </td>
      <td style="text-align: left"> <button class="play" data-num22="${x.urlPath}" > ></button> </td>
    </tr>`;
        document.getElementById("table22").innerHTML += tr;
        play();
        del();
      }
    });



      /******************************** adding to the play list****************** */
      let di = document.querySelectorAll(".test");
      
      di.forEach((element) => {
       element.onclick = function () {
         
          let datanum = this.getAttribute("data-num");
        
       
          fetch(`${SERVER_ROOT}/api/playlist/add`, {
            method: "POST",
            body: JSON.stringify({ songId: datanum }),

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              let tbody22 = document.getElementById("table22");
                   tbody22.innerHTML = "";
              for(let bt of data) {
               

                let tr = `<tr id="row" >
            <td> ${bt.orderId} </td>
            <td>${bt.title}</td>
            <td style="text-align: right"> <button    class="test2" data-num2="${bt.songId}" >x</button> </td>
            <td   style="text-align: left"> <button class="play" data-num22="${bt.id}" > ></button> </td>
          </tr>`;
          
          tbody22.innerHTML +=tr;
                
                del();
                play();
               }
            });
        };
       });
    });


}

/*******************delete function********* */

function del() {
  let di = document.querySelectorAll(".test2");

  di.forEach((element) => {
    element.onclick = function () {
      let datanum = this.getAttribute("data-num2");
      let trow = document.getElementById("row");
      trow.remove();

      fetch(`${SERVER_ROOT}/api/playlist/remove`, {
        method: "POST",
        body: JSON.stringify({ songId: datanum }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    };
  });
}

/*******************playfunction********* */

function play() {
  let di = document.querySelectorAll(".play");

  di.forEach((element) => {
    element.onclick = function () {
      let datanum = this.getAttribute("data-num22");
      console.log(datanum);
      let tolbar = document.getElementById("myAudio");

      tolbar.innerHTML = `<audio controls id="myVideo" width="320" height="176" autoplay>
  <source src="${SERVER_ROOT}/${datanum}" type="audio/mp4">
</audio> `;
    };
  });
}

/************************logout page******************** */

function logout() {
  localStorage.removeItem("accessToken");
  let page2 = document.getElementById("page");
  page2.innerHTML = logg;
}

/**********************************search function *************/

function search() {
  let val = document.getElementById("search").value;
  console.log(val);

  fetch(`${SERVER_ROOT}/api/music?search=${val}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let c = 1;
      document.getElementById("tbrow").innerHTML = "";
      for (let x of data) {
        let tr = `<tr>
      <td> ${c++} </td>
      <td>${x.title}</td>
      <td>${x.releaseDate}</td>
      <td><button id="ron" class="test" data-num="${x.id}" >+</button></td>
    </tr>`;

        document.getElementById("tbrow").innerHTML += tr;
      }
    });
}

/***********************************afterlogin*********************** */

let afterlogin = `<div  id="page2" style="padding:2%; background-color: darkslategray "> <div class="container-fluid bg-secondary rounded-pill">
<div class="row">
  <div class="col-sm-4 ">
  <img
  class="rounded-circle m-2"
  src="gft2.gif"
  alt="mylog"
  style="max-width: 20%"
/>
  </div>

  <div class="col-4 mt-lg-5 mb-lg-5">
    <input
      id="search"
     
      class="form-control w-50 d-inline"
      type="text"
      placeholder="Search.."
    />
    <button  onclick="search()" id="s-btn" class="btn btn-info">Search</button>
  </div>

  <div class="col-4 mt-lg-5 text-end">
    <button id="logout" class="btn btn-info " >logout</button>
  </div>
</div>
</div>

<div class="container-fluid text-center p-5">
<div class="row">
  <h2 class="text-white">Your songs of intrest</h2>

  <table id="table" class="table table-stripped table-hover text-white table-dark">
    <thead>
      <th>#</th>
      <th>Title</th>
      <th>Release Date</th>
      <th>Action</th>
    </thead>
    <tbody id="tbrow" >
      
    </tbody>
  </table>

  <h2 class="text-white">Your play list</h2>
  <table id="table2" class="table table-stripped table-hover text-white table-dark">
    <thead>
      <th>Order</th>
      <th>Title</th>
      <th>Action</th>
      <th></th>
    </thead>
    <tbody id="table22">
      
       
    </tbody>
  </table>
</div>

</div>

<div class="container-fluid bg-primary">

  <div id="myAudio" class="row p-4">
  
  </div>
</div> </div>`;

let logg = `     
<div id="inpage"  >
  <div  class="container-fluid  bg-secondary rounded-pill" >
    <div class="row">
      <div class="col-sm-6">
        <img
          class="rounded-circle m-2"
          src="gft2.gif"
          alt="mylog"
          style="max-width: 15%"
        />
      </div>

      <div class="col-6 text-end mt-lg-5">
        <input
          id="username"
          type="text"
          placeholder="Username.."
          class="form-control w-25 d-inline"
        />
        <input
          id="password"
          type="password"
          placeholder="Password.."
          class="form-control w-25 d-inline"
        />
        <button id="login" class="btn btn-info">login</button>
        <h3><div id="errormessage"  style="text-align: center; color:red; " ></div></h3>
      </div>
    </div>
  </div>

  <div   class="container-fluid text-center " >
    <div   class="row">
    
      <video  controls id="myVideo" width="900" height="500" autoplay>
        <source  src="vid2.mp4" type="audio/mp4">
      </video> 
      <h2>Welcome to Music Website</h2>
    </div>

    <div class="row">
      <div>All copyRights reseverd</div>
    </div>
  </div>
</div>`;

/******************************addition code*********************************************** */
