import Discord, { Message } from 'discord.js';
import config from './config';
import slap from './slap';
import { getUnreadFeedback, getAllFeedback } from './feedback';
import {
  COMMAND_PREFIX,
  TEN_MINUTES_IN_MS,
  CODE_BLOCK,
} from './utils/constants';

const bot = new Discord.Client();

bot.login(config.token);

bot.on('ready', () => {
  console.log(`Logged in with ${bot.user.tag} as ${bot.user.username}!`); // eslint-disable-line no-console
});

setInterval(() => {
  getUnreadFeedback().then(feedbackArray => {
    if (feedbackArray) {
      feedbackArray.forEach(f => {
        bot.channels
          .get(config.feedbackChannelId)
          .send(`${CODE_BLOCK}${f}${CODE_BLOCK}`);
      });
    }
  });
}, TEN_MINUTES_IN_MS);

bot.on('message', msg => {
  if (msg.content.startsWith(`${COMMAND_PREFIX}foo`)) {
    msg.channel.send(`Foo`);
    return;
  }

  if (msg.content.startsWith(`${COMMAND_PREFIX}palautteet`)) {
    if (
      msg.member.roles.has(config.roles.admin) ||
      msg.member.roles.has(config.roles.moderator)
    ) {
      getAllFeedback().then(feedbackArray => {
        console.log(feedbackArray);
        if (feedbackArray) {
          feedbackArray.forEach(f => {
            bot.channels
              .get(config.feedbackChannelId)
              .send(`${CODE_BLOCK}${f}${CODE_BLOCK}`);
          });
        }
      });
    } else {
      msg.channel.send(`Väärä rooli, mee nyt vittuun ${config.tuukka}`);
    }
    return;
  }

  if (msg.content.startsWith(`${COMMAND_PREFIX}slap`)) {
    slap(msg);
    return;
  } else if (msg.content.startsWith('!kassa')) {
    msg.channel.send(`Mee nyt vittuun ${config.tuukka}`);
    return;
  }
});
