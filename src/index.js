import Discord from 'discord.js';
import config from './config';
import slap from './slap';

const bot = new Discord.Client();

bot.login(config.token);

bot.on('ready', () => {
	console.log(`Logged in with ${bot.user.tag} as ${bot.user.username}!`); // eslint-disable-line no-console
});

bot.on('message', msg => {
	if (msg.content.startsWith('!slap')) {
		slap(msg);
	} else if (msg.content.startsWith('!kassa')) {
		msg.channel.send(`Mee nyt vittuun ${config.tuukka}`);
	}
});
