import {pathMatch} from "#shared/utils/pathmatch";
import {User} from "~~/server/models/user.schema";
import getAbilities from "~~/server/utils/rbac.ability";
import {MongoAbility} from "@casl/ability";

export default defineEventHandler(async (event) => {
    const excludedRoutes: string[] = useRuntimeConfig(event).public.publicRoutes;
    const matches = pathMatch(event.path, excludedRoutes);
    let abilities: MongoAbility;
    if (!matches) {
        console.log(`AUTH.server: running. path=${event.path}`)
        try {
            const session = await getUserSession(event)
            if (!session.user?.username) {
                await replaceUserSession(event, {user: {}});
                throw new Error("Not authorized");
            }
            const nullAbilities = getAbilities(null);
            const service = new UserService(nullAbilities, Executor.ANONYMOUS);
            const user: User | null = await service.get(session.user.username);
            abilities = getAbilities(user);
            console.log('AUTH.server: success!')
        } catch (e) {
            console.log("AUTH.server: Invalid access token. redirecting to login...", e);
            return sendRedirect(event, "/login");
        }
    } else {
        abilities = getAbilities(null);
    }

    event.context.abilities = abilities;
})