const Discord = require("discord.js");

const client = new Discord.Client();
const newUsers = new Discord.Collection();
let activeUsers = [];

client.on("guildMemberAdd", function(message) { 
  const list = client.guilds.cache.get("myServerID");
  activeUsers = list.members.cache.forEach(member => member.user);                               
});                                      

client.login(process.env.BOT_TOKEN);

export default activeUsers