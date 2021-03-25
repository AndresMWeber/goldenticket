const dreamsList = document.getElementById("dreamList");
const usersList = document.getElementById("userList");

function appendNewDream(dream) {
  const newListItem = document.createElement("li");
  newListItem.innerText = dream;
  dreamsList.appendChild(newListItem);
}
function appendNewUser(user) {
  const newListItem = document.createElement("li");
  newListItem.innerText = user;
  usersList.appendChild(newListItem);
}

fetch("/dreams")
  .then(response => response.json())
  .then(dreams => {
    dreamsList.firstElementChild.remove();
    dreams.forEach(appendNewDream);
  });


fetch("/users")
  .then(response => response.json())
  .then(users => {
    dreamsList.firstElementChild.remove();
    users.map(user=>user.username).forEach(appendNewUser);
  });