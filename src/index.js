import { Client, Collection } from 'discord.js';
import Knex from 'knex';
import knexfile from './knexfile';
import { PREFIX } from './utils/constants';
import { parseCommand } from './utils';
import commands from './commands';

require('dotenv').config();
require('make-promises-safe');

const knex = Knex(knexfile);
const moduleNames = ['general'];
const bot = new Client();
bot.commands = new Collection();

commands.forEach(cmd => {
  bot.commands.set(cmd.name, cmd);
});

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  knex.migrate.latest();
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
  command.execute(parsedCommand, bot);
});

bot.on('error', e => {
  console.error(`Error: ${e}`);
});

bot.login(process.env.TOKEN);
