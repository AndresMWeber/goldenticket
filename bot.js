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
    console.log("cached users:", activeUsers);
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
  cacheUsers();
  getDefaultChannel(state.guild).send(
    `${user.username} (${user.id}) has ${verb} voice channel: ${channel.name}`
  );
});

client.login(process.env.BOT_TOKEN);

module.exports = { activeUsers, cacheUsers };
