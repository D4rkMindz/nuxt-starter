import {pathMatch} from "#shared/utils/pathmatch";
import type {RouteLocation} from "vue-router";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.server) {
        await server(to, from);
    } else {
        await client(to, from)
    }
    console.log(`AUTH: done. path=${to.fullPath}`)
})

async function server(to: RouteLocation, from: RouteLocation) {
    console.log(`AUTH.server.global: running. path=${to.fullPath}`)
    try {
        // const event = useRequestEvent()
        // if (!event) {
        //     throw new Error('???!?????');
        // }
        // const excludedRoutes: string[] = useRuntimeConfig(event).public.publicRoutes;
        const excludedRoutes: string[] = useRuntimeConfig().public.publicRoutes;
        const matches = pathMatch(to.path, excludedRoutes);
        if (matches) {
            console.log(`AUTH.server.global: matched excluded route ${to.path}`);
            return;
        }
        const {session, clear: clearSession} = useUserSession()
        if (!session.value?.user?.username) {
            await clearSession();
            throw new Error("Not authorized");
        }
        console.log('AUTH.server.global: success!')
    } catch (e) {
        console.log("AUTH.server.global: Invalid access token. redirecting to login...", e);
        if (to.path == '/login') {
            return
        }
        return navigateTo("/login");
    }
}

async function client(to: RouteLocation, from: RouteLocation) {
    console.log('AUTH.client.global: running!')
    try {
        const excludedRoutes = useRuntimeConfig().public.publicRoutes
        const matches = <boolean>pathMatch(to.path, excludedRoutes);
        if (matches) {
            return;
        }
        const {user, clear: clearSession} = useUserSession()
        if (!user || !user.value?.username) {
            await clearSession()
            throw new Error("Not authorized");
        }
        console.log('AUTH.client.global: success!')
    } catch (e) {
        console.log("AUTH: _client_ Invalid access token. redirecting to login...", e);
        if (to.path != '/login') {
            return navigateTo("/login");
        }
        return;
    }
}