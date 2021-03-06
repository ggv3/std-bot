export default {
  name: 'kassa',
  aliases: ['kassa'],
  usage: '!kassa',
  description: 'Express massive disappointment',
  execute: ({ msg }) => {
    const {
      channel = {},
      guild: { emojis = {}, channels: { cache: channelCache } = {} } = {},
      author,
    } = msg || {};
    if (channel.type === 'dm') return;
    msg.channel.send(`Mee nyt vittuun ${emojis.cache.find(e => e.name === 'STDTuukka')}`);
    channelCache
      .get(process.env.BOT_SPAM_CHANNEL_ID)
      .send(`User: ${author.username} used command: !kassa`);
  },
};
