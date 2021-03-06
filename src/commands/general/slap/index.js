export default {
  name: 'slap',
  aliases: ['slap'],
  usage: '!slap',
  description: 'Slap user with a trout',
  execute: ({ msg }) => {
    const { channel = {}, guild: { channels: { cache: channelCache = [] } = {} } = {}, author = {} } =
      msg || {};
    if (channel.type === 'dm') return;
    const user = msg.mentions.users.first();
    if (!user) {
      channel.send('User not found');
    } else if (msg.author.username === user.username) {
      channel.send('Stop hitting yourself');
    } else {
      channel.send(`${author.username} slaps ${user.username} around a bit with a large trout`);
    }
    channelCache.get(process.env.BOT_SPAM_CHANNEL_ID).send(`User: ${author.username} used command: !slap`);
  },
};
