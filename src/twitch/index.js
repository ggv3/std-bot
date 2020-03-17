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

const addUserIdToDatabase = userId => {
  return axios.post(`${process.env.ENDPOINT_TWITCH}/adduser`, {
    userId,
  });
};

export const addTwitchUser = async username => {
  let userId = '';
  await findUserId(username).then(response => {
    const { id } = response.data.data[0];
    userId = id;
  });
  await addUserIdToDatabase(userId).catch(e => console.log(`error: ${e}`));
};
