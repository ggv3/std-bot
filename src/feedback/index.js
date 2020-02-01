export default function slap(msg) {
  const admins = ['GicGer', 'Galloglaich'];

  const user = msg.mentions.users.first();

  if (!user) {
    msg.channel.send('No such user');
  } else {
    if (msg.author.username === user.username) {
      msg.channel.send('Stop hitting yourself');
    } else if (admins.includes(user.username)) {
      msg.channel.send(`${user.username} is a fine fellow!`);
    } else {
      msg.channel.send(
        `${msg.author.username} slaps ${user.username} around a bit with a large trout`,
      );
    }
  }
}
