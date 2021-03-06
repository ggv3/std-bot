const replies = [
  'Lopeta, vittu',
  'Mee nyt vittuun',
  'Voitko lopettaa',
  'Revin sulta pään irti',
  'Mä tapan vielä',
];

export const pickRandomReply = () => replies[Math.floor(Math.random() * replies.length)];

export const getUserDisplayName = (memberCache, username) => {
  const member = memberCache.find(m => m.user.username === username);
  return member.nickname ? member.nickname : member.user.username;
};
