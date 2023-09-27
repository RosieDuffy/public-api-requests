const gallery = document.getElementById("gallery");

// Fetch //

fetch("https://randomuser.me/api/?results=12&nat=us")
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    const employees = response.results;
    createCard(employees);
  })
  .catch((error) => {
    console.error(error);
  });

//** Helper Functions **//

/* createCard function - take in data and create a new card element and display it on the page. 
   modal is created when an employee card is clicked */

function createCard(people) {
  people.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="card-img-container">
      <img class="card-img" src="${user.picture.medium}" alt="profile picture">
  </div>
  <div class="card-info-container">
      <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
      <p class="card-text">${user.email}</p>
      <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
  </div>`;
    card.addEventListener("click", () => {
      openModal(user);
    });
    gallery.appendChild(card);

    card.style.background = "#9896f1";
    card.style.boxShadow = "-10px 10px  10px #d59bf6";
    card.style.border = "5px solid white";
  });
}

// birthdayConverter Function to make birthdate more readable //

function birthdayConverter(user) {
  const birthday = user.dob.date;
  const dateParts = birthday.split("T")[0].split("-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  return `${day}/${month}/${year}`;
}

// createModal function - creates a modal for each employee, closes when close btn is clicked //

function createModal(user) {
  const modContainer = document.createElement("div");
  modContainer.classList.add("modal-container");
  modContainer.id = "modal-container";

  // prettier-ignore
  modContainer.innerHTML =  `
     <div class="modal" id="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${user.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="modal-text">${user.email}</p>
          <p class="modal-text cap">${user.location.city}</p>
          <hr>
          <p class="modal-text">${user.phone}</p>
          <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
          <p class="modal-text">Birthday: ${birthdayConverter(user)}</p>
      </div>
      <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>`;

  modContainer
    .querySelector("#modal-close-btn")
    .addEventListener("click", closeModal);
  gallery.insertAdjacentElement("afterend", modContainer);
  const modalbox = document.getElementById("modal");

  modalbox.style.boxShadow = "-10px 10px  10px #d59bf6";
  modalbox.style.backgroundColor = "#edb1f1";
  modalbox.style.border = "5px solid white";
}

// Open and Close functions for employee modal windows //

function openModal(employee) {
  createModal(employee);
  document.getElementById("modal-container").style.display = "block";
}

function closeModal() {
  document.getElementById("modal-container").style.display = "none";
  document.getElementById("modal-container").innerHTML = "";
}

// Styles //

document.body.style.backgroundColor = "#8ef6e4";
const header = document.querySelector(".header-text-container");
header.style.fontFamily = "Londrina Solid, cursive";
header.style.fontSize = "2em";

// Search Bar //

const searchContainer = document.querySelector(".search-container");
searchContainer.innerHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", (e) => {
  let currentValue = e.target.value.toLowerCase();
  let names = document.querySelectorAll(".card-name");
  names.forEach((name) => {
    if (name.textContent.toLowerCase().includes(currentValue)) {
      name.parentNode.parentNode.style.display = "flex";
    } else {
      name.parentNode.parentNode.style.display = "none";
    }
  });
});
