let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
      .then (function(response){
        return response.json();
      })
      .then (function(toyObject){
        //console.log(toyObject)
        const toyCollection = document.getElementById("toy-collection");
        toyObject.forEach((toy) => {
          //console.log(toy)
            toyCollection.innerHTML = toyCollection.innerHTML +
            `
            <div class="card">
            <h2>${toy.name}</h2>
            <img src= "${toy.image}" class="toy-avatar"/>
            <p id="likes">${toy.likes} Likes</p>
            <button class="like-btn" id="${toy.id}">Like ❤️</button>
            </div>
            `
        })


//event listener to send patch
//on response update like counter
const cardCycle = document.getElementsByClassName("like-btn");
for(let i = 0; i < cardCycle.length; i++){
  const makeAClick = cardCycle[i]
  makeAClick.addEventListener('click',function(e){

    const configurationObjectGet = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      Accept: "application/json"
      },
    }
  
    fetch(`http://localhost:3000/toys/${e.target.id}`,configurationObjectGet)
      .then (function(response){
        const responseObject = response.json();
        return responseObject
      }).then(resObj =>{
        console.log(resObj)

        const newNumberOfLikes = resObj.likes + 1

        const configurationObject = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": newNumberOfLikes
          })
        }
      
        fetch(`http://localhost:3000/toys/${e.target.id}`,configurationObject)
          .then (function(response){
            const responseObject = response.json();
            return responseObject
          }).then(res => {
            cardCycle[i].parentElement.outerHTML = 
            `<div class="card">
            <h2>${res.name}</h2>
            <img src= "${res.image}" class="toy-avatar"/>
            <p id="likes">${newNumberOfLikes} Likes</p>
            <button class="like-btn" id="${res.id}">Like ❤️</button>
            </div>
            `
          })
      })

      })
}
      })

  let toyNameInput = '';
  let toyImageInput = '';

  const toyNameInputElement = document.getElementById("nameInput")

  toyNameInputElement.addEventListener("input", function(e){
    toyNameInput = e.target.value;
  })

  const toyImageInputElement = document.getElementById("imageInput")

  toyImageInputElement.addEventListener("input", function(e){
    toyImageInput = e.target.value;
  })

  const createToy = document.getElementsByClassName("add-toy-form");
  createToy[0].addEventListener('submit', function(e){
    e.preventDefault();
console.log("I listen good.")

    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toyNameInput,
        "image": toyImageInput,
        "likes": 0
      })
    }

    fetch("http://localhost:3000/toys",configurationObject)
      .then (function(response){
        return response.json();
      })
  })





});

