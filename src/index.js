import Discord from 'discord.js';
import slap from './slap';
import { getUnreadFeedback, getAllFeedback } from './feedback';
import { addTwitchUser } from './twitch';
import {
  COMMAND_PREFIX,
  TEN_MINUTES_IN_MS,
  CODE_BLOCK,
} from './utils/constants';
require('dotenv').config();

const bot = new Discord.Client();

bot.login(process.env.TOKEN);

bot.on('ready', () => {
  console.log(`Logged in with ${bot.user.tag} as ${bot.user.username}!`); // eslint-disable-line no-console
});

setInterval(() => {
  getUnreadFeedback().then(feedbackArray => {
    if (feedbackArray) {
      feedbackArray.forEach(f => {
        bot.channels
          .get(process.env.FEEDBACK_CHANNEL_ID)
          .send(`${CODE_BLOCK}${f}${CODE_BLOCK}`);
      });
    }
  });
}, TEN_MINUTES_IN_MS);

bot.on('message', msg => {
  if (msg.content.startsWith(`${COMMAND_PREFIX}twitch`)) {
    if (
      msg.member.roles.has(process.env.ROLE_ADMIN) ||
      msg.member.roles.has(process.env.ROLE_MODERATOR)
    ) {
      try {
        addTwitchUser(msg.content.substring(8));
        msg.channel.send(`Käyttäjä tallennettu`);
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    } else {
      msg.channel.send(`Väärä rooli, mee nyt vittuun ${process.env.TUUKKA}`);
    }
    return;
  }

  if (msg.content.startsWith(`${COMMAND_PREFIX}palautteet`)) {
    if (
      msg.member.roles.has(process.env.ROLE_ADMIN) ||
      msg.member.roles.has(process.env.ROLE_MODERATOR)
    ) {
      getAllFeedback().then(feedbackArray => {
        console.log(feedbackArray);
        if (feedbackArray) {
          feedbackArray.forEach(f => {
            bot.channels
              .get(process.env.FEEDBACK_CHANNEL_ID)
              .send(`${CODE_BLOCK}${f}${CODE_BLOCK}`);
          });
        }
      });
    } else {
      msg.channel.send(`Väärä rooli, mee nyt vittuun ${process.env.TUUKKA}`);
    }
    return;
  }

  if (msg.content.startsWith(`${COMMAND_PREFIX}slap`)) {
    slap(msg);
    return;
  } else if (msg.content.startsWith('!kassa')) {
    msg.channel.send(`Mee nyt vittuun ${process.env.TUUKKA}`);
    return;
  }
});
