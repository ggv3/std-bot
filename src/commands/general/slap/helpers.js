/* eslint-disable no-underscore-dangle */
import { protectedRoleNames } from '../../../utils/constants';

export const getProtectedMembers = (roleCache, memberCache) => {
  const protectedRoles = roleCache.filter(role => protectedRoleNames.includes(role.name));
  const roleIds = protectedRoles.map(r => r.id);
  return memberCache.filter(member => roleIds.some(r => member._roles.includes(r)));
};
