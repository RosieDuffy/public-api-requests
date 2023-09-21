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

getData("https://randomuser.me/api/?results=12").then((data) => {
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
