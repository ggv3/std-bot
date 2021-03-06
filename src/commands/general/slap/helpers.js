const replies = [
  'Lopeta, vittu',
  'Mee nyt vittuun',
  'Voitko lopettaa',
  'Revin sulta pään irti',
  'Mä tapan vielä',
];

export const pickRandomReply = () => replies[Math.floor(Math.random() * replies.length)];
