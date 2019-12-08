/* eslint-disable prefer-template */
import Discord from 'discord.js';
import config from './config';
import { COMMAND_PREFIX, CODE_BLOCK } from './utils/constants';
import parser from './services/parser';
import slap from './slap';

const bot = new Discord.Client();

bot.login(config.token);

bot.on('ready', () => {
  console.log(`Logged in with ${bot.user.tag} as ${bot.user.username}!`); // eslint-disable-line no-console
});

bot.on('message', msg => {
  if (msg.content.startsWith(`${COMMAND_PREFIX}slap`)) {
    slap(msg);
  } else if (msg.content.startsWith(`${COMMAND_PREFIX}kassa`)) {
    msg.channel.send(`Mee nyt vittuun ${config.tuukka}`);
  } else if (msg.content.startsWith(`${COMMAND_PREFIX}foo`)) {
    const command = parser(msg.content.substring(1));
    msg.channel.send(`${CODE_BLOCK}
    action: ${command.action}
    arguments: ${command.arguments}
    ${CODE_BLOCK}`);
  }
});
