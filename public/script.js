const guildsSection = document.getElementById("guild-list");

const appendNewUser = (user, userList) => {
  const newListItem = document.createElement("li");
  const username = document.createElement("span");
  const avatar = document.createElement("img");
  console.log("processing user", user);
  avatar.src = user.avatarURL;
  username.innerText = user.username;
  newListItem.appendChild(username);
  newListItem.appendChild(avatar);
  userList.appendChild(newListItem);
};

const appendNewGuild = ({ name, members, voice }) => {
  const guild = document.createElement("li");
  const guildRow = document.createElement("div");
  const guildColumn = document.createElement("div");
  const widget = document.createElement("div");
  const widgetContent = document.createElement("div");

  const newTitle = document.createElement("h3");
  const memberList = document.createElement("ul");
  const voiceList = document.createElement("ul");

  guildRow.classList = "row";
  guildColumn.classList = "col-md-5";
  widget.classList = "widget";
  widgetContent.classList = "widget-content";
  guild.classList = "list-group-item";
  newTitle.innerText = name;

  members.map(member => appendNewUser(member, memberList));

  guild.appendChild(newTitle);
  guild.appendChild(memberList);
  guild.appendChild(voiceList);

  guildsSection.appendChild(guildRow);
  guildRow.appendChild(guildColumn);
  guildColumn.appendChild(widget);
  widget.appendChild(widgetContent);
  widgetContent.appendChild(guild);
};

fetch("/users")
  .then(response => response.json())
  .then(serverUsers => {
    guildsSection.firstElementChild.remove();
    Object.entries(serverUsers).forEach(([server, data]) => {
      appendNewGuild({ name: server, ...data });
    });
  });
