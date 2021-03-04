import { Client, Collection } from 'discord.js';
import { PREFIX } from './utils/constants';
import { parseCommand } from './utils';
import commands from './commands';

require('dotenv').config();
require('make-promises-safe');

const moduleNames = ['general'];

const bot = new Client();
bot.commands = new Collection();

commands.forEach(cmd => {
  bot.commands.set(cmd.name, cmd);
});

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(PREFIX)) return;
  const parsedCommand = parseCommand(msg, moduleNames);
  const { commandName } = parsedCommand;
  const command =
    bot.commands.get(commandName) ||
    bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;
  command.execute(parsedCommand);
});

bot.on('error', e => {
  console.error(`Error: ${e}`);
});

bot.login(process.env.TOKEN);
