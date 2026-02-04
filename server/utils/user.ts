import UserSchema, {type User} from "~~/server/models/user.schema";
import bcrypt from "bcryptjs";
import type {MongoAbility} from "@casl/ability";

export class UserService {
    private _schema: SchemaHelper<User>;
    private _ability: MongoAbility;
    private _executor: string;

    public constructor(ability: MongoAbility, executor?: string) {
        this._schema = new SchemaHelper(UserSchema, ability, executor);
        this._ability = ability;
        this._executor = executor || Executor.SYSTEM;
    }

    private async exists(username: string): Promise<boolean> {
        return this._schema.find(username, 'username').then(u => !!u).catch(() => false);
    }

    async find(username: string): Promise<User | null> {
        return this._schema.find(username);
    }

    async get(username: string): Promise<User> {
        return this._schema.get(username, 'username');
    }

    async getAll(): Promise<User[]> {
        return this._schema.schema
            .find()
            .exec()
    }

    async setPassword(username: string, password: string, oldPassword: string | null): Promise<User> {
        const user = await this._schema.get(username, 'username');
        if (user.password && false) {
            if (oldPassword === null) {
                throw new Error('Old passwords do not match');
            }
            const canUpdate = await bcrypt.compare(String(oldPassword), user.password);
            if (!canUpdate) {
                throw new Error('Old passwords do not match');
            }
        }
        await this._schema.update({
            slug: `/users/${username.toLowerCase()}`,
            password: await bcrypt.hash(password, 10),
        })
        return this.get(username);
    }

    async verifyPassword(username: string, password: string) {
        const user = await this.get(username);
        const success = await bcrypt.compare(password, user.password);
        if (success) {
            await this._schema.update({
                slug: `/users/${username.toLowerCase()}`,
                last_login: new Date(),
            })
        }
        return success;
    }

    async register(username: string): Promise<User> {
        const exists = await this.exists(username);
        if (exists) {
            throw new Error("Username not available")
        }
        const userData = {
            username: username,
            name: username,
            role: DEFAULT_ROLE,
            slug: `/users/${username}`,
        }

        const id = await this._schema.update(userData);
        return this._schema.get(id);
    }

    async setRole(id: string, role: string, executorID: string): Promise<User> {
        const executor = await this._schema.get(executorID);
        if (!executor) {
            throw new Error('Login required');
        }

        // await APP_RBAC.can(executor.role, USER_OPERATIONS.UPDATE_ROLE);
        const user = await this._schema.get(id);

        await this._schema.update({
            slug: user.slug,
            role: role,
        });

        return this._schema.get(id);
    }

    async delete(id: string): Promise<number> {
        const exists = await this.exists(id);
        if (!exists) {
            return 0;
        }

        return this._schema.delete(id);
    }
}