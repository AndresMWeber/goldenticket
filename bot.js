const Discord = require("discord.js");

const client = new Discord.Client();
const newUsers = new Discord.Collection();
let activeUsers = {};

const cacheUsers = () => {
  client.guilds.cache.forEach(guild => activeUsers[guild.name] = guild.members.cache.map(member => member.user));
  console.log(activeUsers);
}

client.on("ready", cacheUsers)
client.on("guildMemberAdd", cacheUsers);
client.on("guildMemberRemove", cacheUsers);

client.on('voiceStateUpdate', (oldState, newState) => {
  console.log('voice event: ', newState.members.cache, oldState.members.cache)
  console.log('yes', newState.voiceStates.c)
  let newUserChannel = newState.voiceStateUpdate
  let oldUserChannel = oldState.voiceStateUpdate
  // console.log('voice event: ', newUserChannel, oldUserChannel)
  if(oldUserChannel === undefined && newUserChannel !== undefined) {
    console.log('joined: ', newState)
  } else if(newUserChannel === undefined){
    console.log('left: ', oldState)
  }
})

// client.on('voiceStateUpdate', (oldMember, newMember) => {
//   const newUserChannel = newMember.voice.channelID
//   const oldUserChannel = oldMember.voice.channelID
//   const textChannel = message.guild.channels.cache.get('712677731023716452')

//   if(newUserChannel === '712677767333937284') {
//     textChannel.send(`${newMember.user.username} (${newMember.id}) has joined the channel`)
//   } else if (oldUserChannel === '712677767333937284' && newUserChannel !== '712677767333937284') {
//     textChannel.send(`${newMember.user.username} (${newMember.id}) has left the channel`)
//   }
// })

client.login(process.env.BOT_TOKEN);

module.exports = {activeUsers}