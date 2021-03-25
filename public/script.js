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
  const widgetFooter = document.createElement("div");

  const newTitle = document.createElement("div");
  const usersTitle = document.createElement("h6")
  const memberList = document.createElement("ul");
  const voiceTitle = document.createElement("h6")
  const voiceList = document.createElement("ul");

  guildRow.classList = "row";
  guildColumn.classList = "col-md-5";
  widget.classList = "widget card";
  widgetContent.classList = "widget-content card-body";
  widgetFooter.classList = "card-footer text-muted";
  memberList.classList = "widget-user-list"
  guild.classList = "list-group-item";
  newTitle.classList = "card-header"
  newTitle.innerText = name;
  usersTitle.classList = "card-subtitle mb-2 text-muted"
  usersTitle.innerText = "Users:"
  voiceTitle.classList = "card-subtitle mb-2 text-muted"
  voiceTitle.innerText = "Voice Channels:"

  guildsSection.appendChild(guild);
  guild.appendChild(guildRow)
  guildRow.appendChild(guildColumn);
  guildColumn.appendChild(widget);
  widget.appendChild(newTitle);
  widget.appendChild(widgetContent);
  widget.appendChild(widgetFooter);
  
  widgetFooter.appendChild(usersTitle);
  appendUserList(members, widgetFooter)
  widgetContent.appendChild(voiceTitle);
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
