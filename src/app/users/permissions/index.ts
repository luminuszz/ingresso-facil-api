import { z } from 'zod';
import { movieSubject } from '@app/users/permissions/subjects/movie';
import { roomSubject } from '@app/users/permissions/subjects/room';
import { userSubject } from '@app/users/permissions/subjects/user';
import { ticketSubject } from '@app/users/permissions/subjects/ticket';
import { seatSubject } from '@app/users/permissions/subjects/seat';
import { movieSessionSubject } from '@app/users/permissions/subjects/movie-session';
import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability';
import { UserModel } from '@app/users/permissions/models/user';
import { permissions } from '@app/users/permissions/permissions';

const appAbilitySchema = z.union([
  z.tuple([z.literal('manage'), z.literal('all')]),
  movieSubject,
  userSubject,
  ticketSubject,
  seatSubject,
  movieSessionSubject,
  roomSubject,
]);

export type AppAbilities = z.infer<typeof appAbilitySchema>;

export type AppAbility = MongoAbility<AppAbilities>;

export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(user: UserModel) {
  const builder = new AbilityBuilder(createAppAbility);

  const hasPermissions = typeof permissions[user.role] === 'function';

  if (!hasPermissions) {
    throw new Error('has not permissions for this role');
  }

  permissions[user.role](user, builder);

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename;
    },
  });

  ability.can = ability.can.bind(ability);
  ability.cannot = ability.cannot.bind(ability);

  return ability;
}
