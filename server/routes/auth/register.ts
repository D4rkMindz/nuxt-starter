import {ServerResult} from "~~/server/utils/serverResult";
import {UserService} from "~~/server/utils/user";

export default defineEventHandler(async (event) => {
    const result = new ServerResult("Registration failed");
    try {
        // fallback: disable create operation for default role and prevent any further user registrations
        const body = await readBody(event)
        if (!body || !body.username || !body.password) {
            throw new Error("Username or password invalid");
        }

        const service = new UserService(event.context.abilities, Executor.SYSTEM)
        let user = await service.register(body.username)
        if (body?.password) {
            user = await service.setPassword(user.username, body.password, null); // ignore promise...
        }
        await setUserSession(event, {
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
            },
        })
        setResponseStatus(event, 200);
        result.success("Registered successfully");

        return result;
    } catch (e: Error | any) {
        console.error(e);
        setResponseStatus(event, 401);
        result.error(e.message)
    }

    return result;
});