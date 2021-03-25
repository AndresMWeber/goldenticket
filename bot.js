const Discord = require("discord.js");

const client = new Discord.Client();
const newUsers = new Discord.Collection();
let activeUsers = {};
let activeVoiceUsers = {};

const cacheUsers = () => client.guilds.cache.forEach(guild => {
  console.log(guild.members.cache)
  activeUsers[guild.name] = {...activeUsers[guild.name], members: guild.members.cache.map(member => member.user)}
})

client.on("ready", cacheUsers)
client.on("guildMemberAdd", cacheUsers);
client.on("guildMemberRemove", cacheUsers);
client.on('voiceStateUpdate', (oldState, newState) => {
  let channel, verb, state
  if(newState.channelID) {
    verb = 'joined'
    state = newState
  } else if(oldState.channelID){
    verb = 'left'
    state = oldState
  }
  channel = state.guild.channels.cache.get(state.channelID)
  console.log(state.member, state, channel)
  console.log(channel.members)
  
  activeUsers[state.guild.name] = {[channel.name]: [...channel.members]}
  console.log(activeUsers)
  console.log(`${verb}: ${channel}`)
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