export const parseName = (user, len, possesive = true) => {
  if (user.is_current_user) return possesive ? 'Your ' : 'You ';
  const name = `${user.name?.split(' ')[0] || user.user_detail?.username}'s `;
  if (name.length < len) return name;
  return `${name.slice(0, len - 3)}... `;
};

export const parseProfile = (user, len) => {
  const name = `${user.name?.split(' ')[0] || user.user_detail?.username}`;
  if (name.length < len) return name;
  return `${name.slice(0, len - 3)}... `;
};

export const parseUsername = (user, len) => {
  const name = user.user_detail.username;
  if (name.length < len) return name;
  return `${name.slice(0, len - 3)}... `;
};
