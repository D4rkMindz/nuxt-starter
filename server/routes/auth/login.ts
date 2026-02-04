import {ServerResult} from "~~/server/utils/serverResult";
import {UserService} from "~~/server/utils/user";

export default defineEventHandler(async (event) => {
    const result = new ServerResult("Authentication failed");
    try {
        const body = await readBody(event)
        if (!body || !body?.username || !body?.password) {
            throw new Error("Username or password missing");
        }

        const service = new UserService(event.context.abilities, body.username);
        const canLogin = await service.verifyPassword(body.username, body.password);
        if (!canLogin) {
            throw new Error("Username or password invalid");
        }
        const user = await service.get(body.username);

        // fallback: disable create operation for default role and prevent any further user logins
        // await APP_RBAC.can(user.role, APP_OPERATIONS.LOGIN);

        await replaceUserSession(event, {
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                username: user.username,
                last_login: Date.now(),
            },
        })
        setResponseStatus(event, 200);
        return result.success("Authenticated successfully");
    } catch (e: Error | any) {
        console.error(e);

        setResponseStatus(event, 401);

        return result.error(e.message);
    }
});