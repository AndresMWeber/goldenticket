const guildsSection = document.getElementById("guild-list");

const appendChannelList = channels => {
  console.log(channels);
  const accordionId = "accordion";
  const accordionMain = document.createElement("div");
  accordionMain.id = accordionId;
  Object.entries(channels).forEach(([name, users]) => {
    console.log(users);
    const headingId = `${name}-heading`;
    const collapseId = `${name}-collapse`;

    const card = document.createElement("div");
    const cardBody = document.createElement("div");
    const header = document.createElement("div");
    const collapse = document.createElement("div");
    const heading = document.createElement("h5");
    const headingButton = document.createElement("button");

    card.classList = "card";
    cardBody.classList = "card-body";

    header.id = headingId;
    header.classList = "card-header";
    heading.classList = "mb-0";

    collapse.id = collapseId;
    collapse.classList = "collapse show";
    collapse.setAttribute("data-parent", `#${accordionId}`);
    collapse.setAttribute("aria-labelledby", headingId);

    headingButton.classList = "btn btn-link";
    headingButton.setAttribute("data-toggle", "collapse");
    headingButton.setAttribute("aria-expanded", "false");
    headingButton.setAttribute("aria-controls", collapseId);
    headingButton.setAttribute("data-target", `#${collapseId}`);

    headingButton.innerText = name;
    cardBody.appendChild(appendUserList(users));

    card.appendChild(header);
    card.appendChild(collapse);
    collapse.appendChild(cardBody);
    header.appendChild(headingButton);
    accordionMain.appendChild(card);
  });
  return accordionMain;
};

const appendUserList = users => {
  const memberList = document.createElement("ul");
  memberList.classList = "widget-user-list";

  users.forEach(user => {
    const newListItem = document.createElement("li");
    const link = document.createElement("a");
    const avatar = document.createElement("img");

    link.href = `https://discord.com/users/${user.id}`;
    link.setAttribute("target", "_blank");
    avatar.src = user.avatarURL;

    link.appendChild(avatar);
    newListItem.appendChild(link);
    memberList.appendChild(newListItem);
  });
  return memberList;
};

const appendNewGuild = ({ name, members, channels: { voice, text } }) => {
  console.log("adding guild:", name, members, text, voice);

  const guild = document.createElement("li");
  const guildRow = document.createElement("div");
  const guildColumn = document.createElement("div");
  const widget = document.createElement("div");
  const widgetContent = document.createElement("div");
  const widgetFooter = document.createElement("div");

  const newTitle = document.createElement("div");
  const usersTitle = document.createElement("h6");
  const memberList = document.createElement("ul");
  const voiceTitle = document.createElement("h6");
  const textTitle = document.createElement("h6");
  const voiceList = document.createElement("ul");

  guildRow.classList = "row";
  guildColumn.classList = "col-md-5";
  widget.classList = "widget card";
  widgetContent.classList = "widget-content card-body";
  widgetFooter.classList = "card-footer text-muted";
  memberList.classList = "widget-user-list";
  guild.classList = "list-group-item";
  newTitle.classList = "card-header";
  newTitle.innerText = name;
  usersTitle.classList = "card-subtitle mb-2 text-muted";
  usersTitle.innerText = "Users:";
  voiceTitle.classList = "card-subtitle mb-2 text-muted";
  voiceTitle.innerText = "Voice Channels:";
  textTitle.classList = "card-subtitle mb-2 text-muted";
  textTitle.innerText = "Text Channels:";

  guildsSection.appendChild(guild);
  guild.appendChild(guildRow);
  guildRow.appendChild(guildColumn);
  guildColumn.appendChild(widget);
  widget.appendChild(newTitle);
  widget.appendChild(widgetContent);
  widget.appendChild(widgetFooter);
  console.log(voice);
  widgetFooter.appendChild(usersTitle);
  widgetFooter.appendChild(appendUserList(members));
  widgetContent.appendChild(voiceTitle);
  widgetContent.appendChild(appendChannelList(voice));
  widgetContent.appendChild(textTitle);
  widgetContent.appendChild(appendChannelList(text));
};

fetch("/users")
  .then(response => response.json())
  .then(serverUsers => {
    guildsSection.firstElementChild.remove();
    Object.entries(serverUsers).forEach(([server, data]) => {
      appendNewGuild({ name: server, ...data });
    });
  });
