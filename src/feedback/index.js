import axios from 'axios';
import config from '../config';

const restructureFeedback = feedback => {
  const feedbackArray = [];
  feedback.forEach(f => {
    feedbackArray.push(f.text);
  });
  return feedbackArray;
};

const gatherFeedback = option => {
  return axios
    .get(`${config.endpoint}/${option}`)
    .then(response => {
      const { data } = response;
      const feedbackArray = restructureFeedback(data);
      return feedbackArray;
    })
    .catch(e => console.log(`error: ${e}`));
};

export const getUnreadFeedback = () => {
  return gatherFeedback('printunread').catch(e => console.log(`error: ${e}`));
};

export const getAllFeedback = () => {
  return gatherFeedback('printall').catch(e => console.log(`error: ${e}`));
};
