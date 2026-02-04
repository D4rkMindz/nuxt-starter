import {defineMongooseModel} from "~~/server/models/model";
import {Schema, ValidatorProps} from "mongoose";
import {BasisFields} from "~~/server/utils/basis-fields";

export interface User extends BasisModel {
    name: string;
    username: string;
    password: string;
    last_login: Date;
    role: string;
}

export const UserSchema = defineMongooseModel<User>({
    name: 'User',
    schema: {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: false,
            default: () => null,
        },
        last_login: {
            type: Schema.Types.Date,
            required: false,
            default: () => null,
        },
        role: {
            type: String,
            required: true,
            default: () => DEFAULT_ROLE,
        },
        ...BasisFields,
    },
})

export default UserSchema;