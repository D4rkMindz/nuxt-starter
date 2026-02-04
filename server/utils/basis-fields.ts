import {randomUUID} from "node:crypto";
import {Schema} from "mongoose";

export const BasisFields = {
    uuid: {
        type: String,
        unique: true,
        required: true,
        default: () => randomUUID()
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    created: {
        type: Schema.Types.Date,
        required: false,
        default: () => Date.now(),
    },
    created_by: {
        type: String,
        required: false,
        default: () => "_none_",
    },
    updated: {
        type: Schema.Types.Date,
        required: false,
        default: () => Date.now(),
    },
    updated_by: {
        type: String,
        required: false,
        default: () => "_none_",
    },
}