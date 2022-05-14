/* eslint-disable*/
"use strict";
const SERVER_ROOT = 'http://localhost:3000';
window.onload = function() {

    // if (localStorage.getItem('accessToken')) {
    //     afterLogin();
    // } else {
    //     notLogin();
    // }


    document.getElementById('login').onclick = function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;


        fetch(`${SERVER_ROOT}/api/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then(data => loggedInFeatures(data));
    }

    // document.getElementById('logoutBtn').onclick = function() {
    //     localStorage.removeItem('accessToken');
    //     notLogin();
    // }
}

function loggedInFeatures(data) {
    if (data.status) {
        document.getElementById('errormessage').innerHTML = data.message;
    } else {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        localStorage.setItem('accessToken', data.accessToken);
        document.getElementById('page').innerHTML=afterlogin;
        fetchMusic();
      
    }
}

function fetchMusic() {


    fetch(`${SERVER_ROOT}/api/music`, {
        method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(response => response.json())
        .then(songs => {
            let c=1;
            for(let x of songs){ 
            
            let tr =`<tr>
        <td> ${c++} </td>
        <td>${x.title}</td>
        <td>${x.releaseDate}</td>
        <td><button id="ron" class="test" data-num="${x.id}" >+</button></td>
      </tr>`
    
      document.getElementById('tbrow').innerHTML += tr;

     


}
let di= document.querySelectorAll(".test");
console.log(di);
di.forEach(element => {
  element.onclick = function(){
  let datanum = this.getAttribute('data-num');
  let tbody22= document.getElementById('table22');
  tbody22.innerHTML ="";
  fetch(`${SERVER_ROOT}/api/playlist/add`, {
        method: 'POST',
         body:JSON.stringify({ songId: datanum }),
         
            headers: {
              'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => response.json())
        .then(data => {
          data.forEach(bt=>{
            let tr =`<tr>
            <td> ${bt.orderId} </td>
            <td>${bt.title}</td>
            <td>x</td>
            <td>+</td>
          </tr>`
          tbody22.innerHTML += tr;
          })
          


        })
  }
});



        
    })


    /********************************the play list****************** */

    fetch(`${SERVER_ROOT}/api/playlist`, {
      method: 'GET',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
      })
      .then(response => response.json())
      .then(songs => {
         
          for(let x of songs){ 
          
          let tr =`<tr>
      <td> ${x.orderId} </td>
      <td>${x.title}</td>
      <td>x</td>
      <td>+</td>
    </tr>`
    document.getElementById('table22').innerHTML += tr;
      }
      
  })

  
  // document.getElementById("test").onclick=addplaylist();   

      

 

}


    /******************************** adding to the play list****************** */
    

function fetchPlayList() {

}

function afterLogin() {
    
    
    fetchPlayList();
    document.getElementById('content').innerHTML = 'Content of the music';
}

function notLogin() {
    document.getElementById('search').style.display = 'none';
    document.getElementById('logout-div').style.display = 'none';
    document.getElementById('login-div').style.display = 'block';
    document.getElementById('content').innerHTML = 'Welcome to MIU Station';
}





/***********************************afterlogin*********************** */

let afterlogin=` <div class="container-fluid mt-2 bg-primary">
<div class="row">
  <div class="col-4">
    <img
      class="img-thumbnail m-2"
      src="image.jpg"
      alt="mylog"
      style="max-width: 15%"
    />
  </div>

  <div class="col-4 mt-lg-5">
    <input
      id="search"
      class="form-control w-50 d-inline"
      type="text"
      placeholder="Search.."
    />
    <button id="s-btn" class="btn btn-info">Search</button>
  </div>

  <div class="col-4 mt-lg-5 text-end">
    <button class="btn btn-info " id="login">logout</button>
  </div>
</div>
</div>

<div class="container-fluid text-center p-5">
<div class="row">
  <h2>You songs you are intrested in</h2>

  <table id="table" class="table table-hover bg-success">
    <thead>
      <th>#</th>
      <th>Title</th>
      <th>Release Date</th>
      <th>Action</th>
    </thead>
    <tbody id="tbrow" >
      
    </tbody>
  </table>

  <h2>Your play list</h2>
  <table id="table2" class="table table-hover bg-success">
    <thead>
      <th>Order</th>
      <th>Title</th>
      <th>Action</th>
    </thead>
    <tbody id="table22">
      
       
    </tbody>
  </table>
</div>

</div>

<div class="container-fluid bg-primary">
  <div class="row p-4">
    <div class="col-4">
   play signs
    </div>

    <div class="col-4 mt-lg-5">
     navigation bar
    </div>

    <div class="col-4 mt-lg-5 text-end spinner">
      vol...>
    </div>
  </div>
</div>`;


   // let tr =`<tr>
        //     <td> ${bt.orderId} </td>
        //     <td>${bt.title}</td>
        //     <td>x</td>
        //     <td>+</td>
        //   </tr>`
        //   document.getElementById('table2').innerHTML += tr;

