/* eslint-disable no-underscore-dangle */
import { protectedRoleNames } from '../../utils/constants';

export const getProtectedMembers = guild => {
  const protectedRoles = guild.roles.cache.filter(role => protectedRoleNames.includes(role.name));
  const roleIds = protectedRoles.map(r => r.id);
  return guild.members.cache.filter(member => roleIds.some(r => member._roles.includes(r)));
};
