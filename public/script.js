const dreamsList = document.getElementById("dreamList");
const usersList = document.getElementById("userList");

function appendNewDream(dream) {
  const newListItem = document.createElement("li");
  newListItem.innerText = dream;
  dreamsList.appendChild(newListItem);
}

function appendNewUser(user) {
  const newListItem = document.createElement("li");
  const username = document.createElement("span");
  const avatar = document.createElement("img");
  console.log('processing user', user)
  avatar.src = user.avatarURL
  username.innerText = user.username
  newListItem.appendChild(username);
  newListItem.appendChild(avatar);
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
  .then(serverUsers => {
    usersList.firstElementChild.remove();
    Object.entries(serverUsers).forEach(([_, {members}]) => members.forEach(appendNewUser))
  });