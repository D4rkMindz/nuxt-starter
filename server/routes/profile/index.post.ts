import {FetchError} from "ofetch";
import {SchemaHelper} from "~~/server/utils/base";
import UserSchema, {User} from "~~/server/models/user.schema";

export default defineEventHandler(async (event) => {
    const result = new ServerResult();
    result.data = {};
    try {
        const session = await getUserSession(event)
        // await APP_RBAC.can(session.user?.role, USER_OPERATIONS.UPDATE_PROFILE)
        const body = await readBody(event)
        const schema = new SchemaHelper(UserSchema, event.context.abilities, Executor.SYSTEM);
        // @ts-ignore
        const userID = session.user?.id;
        const user = await schema.get(userID);
        if (!user) {
            throw new Error("Not logged in!")
        }

        await schema.update({
            _id: userID,
            username: body?.username || user.username,
            name: body?.name || user.name,
        })

        result.data = await schema.get(userID);

        return result.success("Updated user successfully");
    } catch (error: FetchError | Error | any) {
        console.error(error);
        return result.error(error?.response?._data?.message || "An unexpected error occurred.");
    }
});