"use strict";
addEventListener('load', start);
function start() {
  addLoginListeners(); // uh I dunno if this should be here of 
  console.log("login.html loaded");
} 

function addLoginListeners(){
  let loginTrigger = document.getElementById("login") //this is the trigger
  let modal = document.querySelector(".modal")
  let closeBtn = document.querySelector(".close-btn")
  let cancelBtn = document.querySelector(".cancel-btn")

  // displays the modal when 'login/register' is clicked
  loginTrigger.onclick = function(){
    modal.style.display = "block"
  }

  // close the modal using the cross button
  closeBtn.onclick = function(){
    modal.style.display = "none"
  }

  // close the modal by clicking outside
  window.onclick = function(event){
    if(event.target == modal){
      modal.style.display = "none"
    }
  }
}
