import axios from 'axios';

require('dotenv').config();

const findUserId = username => {
  return axios
    .get(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: {
        'Client-ID': process.env.CLIENT_ID,
      },
    })
    .catch(e => console.log(`error: ${e}`));
};

const addUserIdToDatabase = (userId, username) => {
  return axios.post(`${process.env.ENDPOINT_TWITCH}/adduser`, {
    userId,
    username,
  });
};

export const addTwitchUser = username => {
  findUserId(username).then(response => {
    const { id, login } = response.data.data[0];
    addUserIdToDatabase(id, login).catch(e => console.log(`error: ${e}`));
  });
};
