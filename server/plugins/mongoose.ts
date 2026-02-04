import {defineMongooseConnection} from "~~/server/models/connection";

export default defineNitroPlugin(async () => {
    await defineMongooseConnection();
});