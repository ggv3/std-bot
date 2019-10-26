import Discord from 'discord.js';
import config from './config';

const bot = new Discord.Client();

bot.login(config.token);

bot.on('ready', () => {
	console.log(`Logged in with ${bot.user.tag} as ${bot.user.username}!`); // eslint-disable-line no-console
});

/* Listen to messages */
bot.on('message', msg => {
	console.log(msg);
});
