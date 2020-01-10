import Discord, { Message } from "discord.js";
import config from "./config";
import slap from "./slap";
import axios from "axios";
import moment from "moment";

const bot = new Discord.Client();

bot.login(config.token);

bot.on("ready", () => {
  console.log(`Logged in with ${bot.user.tag} as ${bot.user.username}!`); // eslint-disable-line no-console
});

const gatherFeedback = async feedback => {
  let feedbackStr = "";
  await feedback.forEach(f => {
    feedbackStr += `[${moment(f.createdAt).format("HH:mm:ss YYYY-MM-DD")}] - ${
      f.text
    } \n`;
  });
  return feedbackStr;
};

bot.on("message", msg => {
  if (msg.content.startsWith("!slap")) {
    slap(msg);
    return;
  } else if (msg.content.startsWith("!kassa")) {
    msg.channel.send(`Mee nyt vittuun ${config.tuukka}`);
    return;
  }

  if (msg.content.startsWith("!lukemattomat")) {
    if (
      msg.member.roles.has(config.roles.admin) ||
      msg.member.roles.has(config.roles.moderator)
    ) {
      axios
        .get(`${config.endpoint}/printunread`)
        .then(response => {
          const { data } = response;
          if (data.length === 0) {
            msg.channel.send("Ei lukemattomia palautteita");
            return;
          }
          gatherFeedback(data)
            .then(feedback => {
              msg.channel.send("```" + feedback + "```");
            })
            .catch(e => console.log(`error: ${e}`));
        })
        .catch(e => console.log(`error: ${e}`));
      return;
    } else {
      msg.channel.send(`Väärä rooli, mee nyt vittuun ${config.tuukka}`);
    }
    return;
  }

  if (msg.content.startsWith("!palautteet")) {
    if (
      msg.member.roles.has(config.roles.admin) ||
      msg.member.roles.has(config.roles.moderator)
    ) {
      axios
        .get(`${config.endpoint}/printall`)
        .then(response => {
          const { data } = response;
          if (data.length === 0) {
            msg.channel.send("Ei lähetettyjä palautteita");
            return;
          }
          gatherFeedback(data)
            .then(feedback => {
              msg.channel.send("```" + feedback + "```");
            })
            .catch(e => console.log(`error: ${e}`));
        })
        .catch(e => console.log(`error: ${e}`));
      return;
    } else {
      msg.channel.send(`Väärä rooli, mee nyt vittuun ${config.tuukka}`);
    }
    return;
  }
});
