const Discord = require("discord.js");

const client = new Discord.Client();
const newUsers = new Discord.Collection();
let activeUsers = [];

const cacheUsers = () => {
  activeUsers = client.guilds.cache.forEach(guild => {
    console.log(guild.members.cache)
    guild.members.cache.forEach(member => member.user)
  });
  console.log(activeUsers)
}

client.on("ready", cacheUsers)
client.on("guildMemberAdd", cacheUsers);
client.on("guildMemberRemove", cacheUsers);

client.login(process.env.BOT_TOKEN);

module.exports = {activeUsers}