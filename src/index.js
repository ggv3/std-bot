import Discord from 'discord.js';
import config from './config';

const bot = new Discord.Client();

bot.login(config.token);

bot.on('ready', () => {
	console.log(`Logged in with ${bot.user.tag} as ${bot.user.username}!`); // eslint-disable-line no-console
});

/* Listen to messages */
bot.on('message', msg => {
	if (msg.content.startsWith('!slap')) {
		const user = msg.mentions.users.first();
		if (!user) {
			msg.channel.send('No such user');
		} else {
			msg.channel.send(`${msg.author.username} slaps ${user.username} around a bit with a large trout`);
		}
	}
});
