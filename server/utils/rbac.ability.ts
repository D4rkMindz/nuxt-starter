import {AbilityBuilder, createMongoAbility, type MongoAbility,} from '@casl/ability';
import {type User, UserSchema} from "~~/server/models/user.schema";

export const RBAC_ROLES = {
    ANYONE: "anyone",
    GUEST: "guest",
    RENAMED: "renamed",
    VERIFIED: "verified",
    OWNER: "owner",
    ADMIN: "admin",
}

const CONTAINED_ROLES = {
    ANYONE: [RBAC_ROLES.ANYONE, RBAC_ROLES.GUEST, RBAC_ROLES.RENAMED, RBAC_ROLES.VERIFIED, RBAC_ROLES.OWNER, RBAC_ROLES.ADMIN],
    GUEST: [RBAC_ROLES.GUEST, RBAC_ROLES.RENAMED, RBAC_ROLES.VERIFIED, RBAC_ROLES.OWNER, RBAC_ROLES.ADMIN],
    RENAMED: [RBAC_ROLES.RENAMED, RBAC_ROLES.VERIFIED, RBAC_ROLES.OWNER, RBAC_ROLES.ADMIN],
    VERIFIED: [RBAC_ROLES.VERIFIED, RBAC_ROLES.OWNER, RBAC_ROLES.ADMIN],
    OWNER: [RBAC_ROLES.OWNER, RBAC_ROLES.ADMIN],
    ADMIN: [RBAC_ROLES.ADMIN],
}

export const DEFAULT_ROLE = RBAC_ROLES.ANYONE

export enum ACT {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    RESTORE = 'restore',
    DELETE = 'delete',
}

const ACT_CONTAINED = {
    READ: [ACT.READ],
    CREATE: [ACT.READ, ACT.CREATE],
    UPDATE: [ACT.READ, ACT.CREATE, ACT.UPDATE],
    DELETE: [ACT.READ, ACT.CREATE, ACT.UPDATE, ACT.DELETE],
    RESTORE: [ACT.READ, ACT.CREATE, ACT.UPDATE, ACT.DELETE, ACT.RESTORE],
}

export type Action = ACT.CREATE | ACT.READ | ACT.UPDATE | ACT.RESTORE | ACT.DELETE;
export type Subject = User;

// export const ability = createMongoAbility<[Action, Subject]>();

export function getSystemAbilities() {
    return getAbilities({role: "admin"} as User);
}

export default function getAbilities(user: User | null): MongoAbility {
    const {can, rules} = new AbilityBuilder(createMongoAbility);
    function can_contained(actions: Action[], name: string, ...rest: any[]) {
        actions.forEach(a => can(a, name, ...rest));
    }

    can_contained(ACT_CONTAINED.READ, UserSchema.name, ['username']);
    can_contained(ACT_CONTAINED.UPDATE, UserSchema.name, ['last_login']);
    if (!user) {
        return createMongoAbility(rules);
    }

    if (user.role in CONTAINED_ROLES.ANYONE) {
        can_contained(ACT_CONTAINED.UPDATE, UserSchema.name, {created_by: user._id});
    }
    if (user.role in CONTAINED_ROLES.GUEST) {
        // nothing
    }
    if (user.role in CONTAINED_ROLES.RENAMED) {
        can_contained(ACT_CONTAINED.DELETE, UserSchema.name, {created_by: user._id})
    }
    if (user.role in CONTAINED_ROLES.VERIFIED) {
        // nothing
    }
    if (user.role in CONTAINED_ROLES.OWNER) {
        can_contained(ACT_CONTAINED.READ, UserSchema.name, ['name', 'username', 'last_login', 'role', 'created_at', 'created_by', 'updated_at', 'updated_by']);
    }
    if (user.role in CONTAINED_ROLES.ADMIN) {
        can_contained(ACT_CONTAINED.DELETE, UserSchema.name)
    }

    return createMongoAbility(rules);
}
