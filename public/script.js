const guildsSection = document.getElementById("guild-list");

const appendUserList = (users, parent) => {
  const memberList = document.createElement("ul");
  memberList.classList = "widget-user-list"
  
  users.forEach(user => {
    const newListItem = document.createElement("li");
    const link = document.createElement('a')
    const avatar = document.createElement("img");

    link.href = `https://discord.com/users/${user.id}`
    link.setAttribute("target", "_blank");
    avatar.src = user.avatarURL;

    link.appendChild(avatar)
    newListItem.appendChild(link);
    memberList.appendChild(newListItem);
  })
  parent.appendChild(memberList)
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
  memberList.classList = "widget-user-list"
  guild.classList = "list-group-item";
  newTitle.innerText = name;
  

  guildsSection.appendChild(guild);
  guild.appendChild(guildRow)
  guildRow.appendChild(guildColumn);
  guildColumn.appendChild(widget);
  widget.appendChild(widgetContent);
  widgetContent.appendChild(newTitle);
  appendUserList(members, widgetContent)
  widgetContent.appendChild(voiceList);
};

fetch("/users")
  .then(response => response.json())
  .then(serverUsers => {
    guildsSection.firstElementChild.remove();
    Object.entries(serverUsers).forEach(([server, data]) => {
      appendNewGuild({ name: server, ...data });
    });
  });
