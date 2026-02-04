import type {SchemaDefinition, SchemaOptions} from 'mongoose';
import * as mongoose from "mongoose";
import mongooseDelete from 'mongoose-delete';
import {accessibleFieldsPlugin, accessibleRecordsPlugin} from "@casl/mongoose";
import type {ModelWithCASL} from "~~/server/utils/base";

export function defineMongooseModel<T extends BasisModel>(
    nameOrOptions: string | {
        name: string;
        schema: SchemaDefinition;
        options?: SchemaOptions;
        hooks?: (schema: mongoose.Schema<T>) => void;
    },
    schema?: SchemaDefinition,
    options?: SchemaOptions,
    hooks?: (schema: mongoose.Schema<T>) => void,
): ModelWithCASL<T> {
    let name;
    if (typeof nameOrOptions === "string") {
        name = nameOrOptions;
    } else {
        name = nameOrOptions.name;
        schema = nameOrOptions.schema;
        options = nameOrOptions.options;
        hooks = nameOrOptions.hooks;
    }
    const newSchema = new mongoose.Schema(schema, options);
    newSchema.plugin(accessibleFieldsPlugin);
    newSchema.plugin(accessibleRecordsPlugin);
    newSchema.plugin(mongooseDelete, {deletedBy: true, deletedByType: String, indexFields: true});
    if (hooks) {
        hooks(newSchema);
    }
    return mongoose.model<T, ModelWithCASL<T>>(name, newSchema);
}