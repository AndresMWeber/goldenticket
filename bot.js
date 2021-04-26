const Discord = require("discord.js");

const client = new Discord.Client();
const newUsers = new Discord.Collection();
let activeUsers = {};

const getDefaultChannel = guild => {
  if (guild.channels.cache.has(guild.id))
    return guild.channels.cache.get(guild.id);
  const generalChannel = guild.channels.cache.find(
    channel => channel.name === "general"
  );
  if (generalChannel) return generalChannel;
  return guild.channels.cache
    .filter(
      c =>
        c.type === "text" &&
        c.permissionsFor(guild.client.user).has("SEND_MESSAGES")
    )
    .first();
};

const cacheUsers = () =>
  client.guilds.cache.forEach(guild => {
    const channels = {};
    guild.channels.cache
      .filter(c => ["text", "voice"].includes(c.type))
      .forEach(channel => {
        channels[channel.type] = {
          ...channels[channel.type],
          [channel.name]: client.channels.cache
            .get(channel.id)
            .members.map(m => m.user)
        };
      });

    activeUsers[guild.name] = {
      ...activeUsers[guild.name],
      members: guild.members.cache.map(member => member.user),
      channels
    };
  });

client.on("ready", cacheUsers);
client.on("guildMemberAdd", cacheUsers);
client.on("guildMemberRemove", cacheUsers);
client.on("voiceStateUpdate", async (oldState, newState) => {
  let verb, state;
  if (newState.channelID) {
    verb = "joined";
    state = newState;
  } else if (oldState.channelID) {
    verb = "left";
    state = oldState;
  }
  const user = await client.users.fetch(state.id);
  const channel = state.guild.channels.cache.get(state.channelID);
  await cacheUsers();
  generateMessage(user, verb, getDefaultChannel(state.guild));
});

const generateMessage = (user, verb, channel) => {
  const exampleEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Voice Channel Event")
    .setURL(`https://discord.com/users/${user.id}`)
    .addFields({
      name: `${channel.name}: Voice Channel Event`,
      value: `${user.username} has ${verb} voice`
    })
    .setTimestamp();
  channel.send(exampleEmbed);
};

client.login(process.env.BOT_TOKEN);

module.exports = { activeUsers, cacheUsers };
