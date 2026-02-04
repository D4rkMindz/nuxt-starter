export async function ha(
    apiPath: string,
    init?: RequestInit,
): Promise<Response | null> {
    const path = `/${['homeassistant'].concat(...apiPath.split('/').filter(i => i != "")).join('/')}`;
    console.log("HA", path, init);
    try {
        const response = await fetch(path, init)
        if (response.status == 401) {
            // shouldnt happen...
            console.error("Unauthorized", response);
        }
        return response;
    } catch (e: Error | any) {
        console.error(e);
        return null;
    }
}

export async function api(apiPath: string, init?: RequestInit): Promise<Response | null> {
    console.log("API", apiPath, init);
    try {
        const response = await fetch(apiPath, init);
        if (response.status == 401) {
            console.error("Unauthorized", response);
        }
        return response;
    } catch (e: Error | any) {
        console.error(e);
        return null;
    }
}