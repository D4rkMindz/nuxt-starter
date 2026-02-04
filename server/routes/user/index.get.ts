export default defineEventHandler(async (event) => {
    const result = new ServerResult();
    try {
        const session = await getUserSession(event)
        result.data = await new UserService(Executor.SYSTEM).getAll();

        return result.success("Found users");
    } catch (error: Error | any) {
        console.error(error);
        return result.error(error?.message || "An unexpected error occurred.");
    }
});