const gallery = document.getElementById("gallery");

// Fetch Functions //

async function getData(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    return console.log("Something went wrong");
  }
}

getData("https://randomuser.me/api/?results=12&nat=us").then((data) => {
  getUser(data).then(createCard);
});

// Helper Functions //

function getUser(data) {
  const employees = data.results.map((employee) => {
    return employee;
  });
  return Promise.all(employees);
}

function createCard(people) {
  people.map((user) => {
    const html = `<div class="card">
  <div class="card-img-container">
      <img class="card-img" src="${user.picture.medium}" alt="profile picture">
  </div>
  <div class="card-info-container">
      <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
      <p class="card-text">${user.email}</p>
      <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
  </div>
</div>`;
    gallery.insertAdjacentHTML("beforeend", html);
  });
}

function createModal(people) {
  const scriptTag = document.querySelector("script");
  const modalContainer = document.createElement("div");

  modalContainer.className = "modal-container";
  gallery.parentNode.insertBefore(modalContainer, scriptTag);

  people.map((user) => {
    const html =
      // prettier-ignore
      `<div class="modal">
                      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                      <div class="modal-info-container">
                          <img class="modal-img" src="${user.picture.medium}" alt="profile picture">
                          <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                          <p class="modal-text">${user.email}</p>
                          <p class="modal-text cap">${user.location.city}</p>
                          <hr>
                          <p class="modal-text">${user.phone}</p>
                          <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                          <p class="modal-text">Birthday: ${birthdayConverter(user)}</p>
                      </div>
                  </div>
                `;

    modalContainer.insertAdjacentHTML("beforeend", html);
    modalContainer.hidden = "true";
  });
}

function birthdayConverter(user) {
  const birthday = user.dob.date;
  const dateParts = birthday.split("T")[0].split("-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  return `${day}/${month}/${year}`;
}

const userCards = document.getElementsByClassName("card");
userCards.addEventListener('click', (e) => {
  createModal(e);
})
