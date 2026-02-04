import UserSchema from "~~/server/models/user.schema";
import {UserService} from "~~/server/utils/user";
import dayjs from "dayjs";
import {DEFAULT_ROLE, getSystemAbilities} from "~~/server/utils/rbac.ability";

export default defineTask({
    meta: {
        name: "db:cleanup",
        description: "Clean up old data",
    },
    run({payload, context}) {
        console.log("Running User Cleanup...");
        const now = dayjs();
        const userService = new UserService(getSystemAbilities(), Executor.SYSTEM);
        UserSchema.find({
            created: {$lte: now.subtract(2, "weeks").startOf('day').toDate()},
            last_login: {$lte: now.subtract(1, "week").startOf('day').toDate()},
            role: DEFAULT_ROLE, // means they didn't sign up actually -> can be archived since most probably the user is already using another guest account
        }).then((users) => {
            users.forEach(user => {
                userService.delete(user.id);
            })
        })
        return {result: "Success"};
    },
});
