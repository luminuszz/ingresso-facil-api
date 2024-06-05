import { Roles } from '@app/users/permissions/roles';
import { UserModel } from '@app/users/permissions/models/user';
import { AbilityBuilder } from '@casl/ability';
import { AppAbility } from '@app/users/permissions/index';

type PermissionsByRole = (
  user: UserModel,
  builder: AbilityBuilder<AppAbility>,
) => void;

export const permissions: Record<Roles, PermissionsByRole> = {
  USER(user, { can, cannot }) {
    can('get', 'User', { id: { $eq: user.id } });
    can('update', 'User', { id: { $eq: user.id } });
    can('delete', 'User', { id: { $eq: user.id } });
    can('create', 'Ticket');
    can('transfer-owner', 'Ticket', { ownerTo: { $eq: user.id } });
    can('change-seat', 'Ticket', { ownerTo: { $eq: user.id } });
    can('cancel', 'Ticket', { ownerTo: { $eq: user.id } });
    can('get', 'Ticket', { ownerTo: { $eq: user.id } });
    cannot('change-role', 'User');
  },
  ADMIN(user, { can }) {
    can('manage', 'all');
  },

  MANAGER(user, { can }) {
    can('create', 'Room');
    can('delete', 'Room');
    can('update', 'Room');
    can('get', 'Room');

    can('create', 'Seat');
    can('update', 'Seat');
  },
};
