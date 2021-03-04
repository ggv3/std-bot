import Knex from 'knex';
import knexfile from '../../../knexfile';

const knex = Knex(knexfile);

export default {
  name: 'feedback',
  aliases: ['palaute'],
  usage: '!feedback',
  description: 'Sends feedback to database',
  execute: ({ msg }, bot) => {
    const { channel = {}, content = null } = msg || {};
    if (!channel.type === 'dm') return;
    const feedback = content.split(' ').slice(1).join(' ');
    knex('feedback')
      .insert({ text: feedback })
      .then(() => {
        bot.channels.cache.get(process.env.FEEDBACK_CHANNEL_ID).send(feedback);
        channel.send('Palaute lähtetetty');
      })
      .catch(e => {
        bot.channels.cache
          .get(process.env.BOT_SPAM_CHANNEL_ID)
          .send(`Error saving feedback: ${e} Original feedback: ${feedback}`);
        channel.send('Virhe palautteen lähettämisessä, selvitellään.');
      });
  },
};
