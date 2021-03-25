const dmake = document.createElement
const appendNewUser = (user, userList) => {
  const newListItem = dmake("li");
  const username = dmake("span");
  const avatar = dmake("img");
  console.log("processing user", user);
  avatar.src = user.avatarURL;
  username.innerText = user.username;
  newListItem.appendChild(username);
  newListItem.appendChild(avatar);
  userList.appendChild(newListItem);
}

const appendNewGuild = ({name, members, voice}) => {
  const guildsSection = document.getElementById('guilds')
  const newTitle = dmake("h3");
  newTitle.innerText = name
  dmake("li")
}

fetch("/users")
  .then(response => response.json())
  .then(serverUsers => {
    usersList.firstElementChild.remove();
    Object.entries(serverUsers).forEach(([server, data]) => {
      appendNewGuild({name: server, ...data})
    });
  });
