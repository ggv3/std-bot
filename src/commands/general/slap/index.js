import { getProtectedMembers } from './helpers';

export default {
  name: 'slap',
  aliases: ['slap'],
  usage: '!slap',
  description: 'Slap user with a trout',
  execute: ({ msg }) => {
    const {
      channel = {},
      guild: {
        roles: { cache: roleCache = [] } = {},
        members: { cache: memberCache = [] } = {},
        channels: { cache: channelCache = [] } = {},
      } = {},
      author = {},
    } = msg || {};
    if (channel.type === 'dm') return;
    const protectedMembers = getProtectedMembers(roleCache, memberCache);
    const user = msg.mentions.users.first();
    if (!user) {
      msg.channel.send('No such user');
    } else if (msg.author.username === user.username) {
      msg.channel.send('Stop hitting yourself');
    } else if (!protectedMembers.filter(pr => pr.user.username === user.username)) {
      msg.channel.send(`${user.username} is a fine fellow!`);
    } else {
      msg.channel.send(`${author.username} slaps ${user.username} around a bit with a large trout`);
    }
    channelCache.get(process.env.BOT_SPAM_CHANNEL_ID).send(`User: ${author.username} used command: !slap`);
  },
};
