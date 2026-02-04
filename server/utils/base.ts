import {Document, Schema} from "mongoose"
import {MongoAbility} from '@casl/ability';
import {accessibleBy, type AccessibleModel} from '@casl/mongoose';
import mongooseDelete from "mongoose-delete";
// Define valid actions and subjects
// export type Actions = 'create' | 'read' | 'update' | 'archive' | 'delete' | 'manage';
// // Use 'all' for admins, and the string name of your models for others
// export type Subjects = 'Trigger' | 'Entity' | 'Service' | 'State' | 'SystemRoleGroup' | 'User' | 'all';

// export type AppAbility = MongoAbility<[Actions, Subjects]>;

export interface BasisModel {
    _id?: string;
    created?: Date;
    created_by?: Date;
    updated?: Date;
    updated_by?: Date;
    uuid?: string;
    slug: string;
}

export type DocWithCASL<T> = T & Document & mongooseDelete.SoftDeleteDocument & BasisModel;

// 2. The Model: What the "Class" (Post, User, etc.) looks like
export type ModelWithCASL<T> = AccessibleModel<DocWithCASL<T>> & mongooseDelete.SoftDeleteModel<DocWithCASL<T>>;


export class SchemaHelper<T extends BasisModel> {
    private _schema: ModelWithCASL<T>;
    private _ability: MongoAbility;
    private _executor: string;

    constructor(schema: ModelWithCASL<T>, ability: MongoAbility, executor: string = Executor.SYSTEM) {
        this._schema = schema;
        this._ability = ability;
        this._executor = executor;
    }

    async insert(data: Partial<T> & { slug: string }): Promise<Schema.Types.ObjectId> {
        const newRecord = await this._schema.create(data);
        return newRecord?._id;
    }

    async update(data: Partial<T> & { slug: string } | Partial<T> & { _id: string }): Promise<Schema.Types.ObjectId> {
        let query: any = {};
        if (data?.slug) {
            query['slug'] = data.slug;
        } else {
            query['_id'] = data._id;
        }
        const updated = await this._schema
            .findOneAndUpdate(
                {
                    $and: [
                        accessibleBy(this._ability, ACT.UPDATE).ofType(this._schema.name),
                        query,
                    ],
                },
                data,
                {
                    includeResultMetadata: true,
                }
            );
        if (updated) {
            return updated._id;
        }
        try {
            // Optional: Check explicit create permission here if needed
            // if (!this._ability.can(ACT.CREATE, this._schema.name)) throw new Error("Cannot create");

            const newRecord = await this._schema.create(data);
            return newRecord._id;
        } catch (e: any) {
            // 4. Handle Race Condition / Forbidden
            // If create fails with Duplicate Key (E11000), it means the slug ALREADY EXISTED.
            // Since step #1 failed to update it, it means the user lacks permission to update that existing record.
            if (e.code === 11000) {
                throw new Error("You do not have permission to update this resource.");
            }
            throw e;
        }
    }

    async find(id: string | Schema.Types.ObjectId, field: keyof T | string = '_id'): Promise<DocWithCASL<T> | null> {
        return this._schema
            .findOne<DocWithCASL<T>>({
                $and: [
                    accessibleBy(this._ability, ACT.READ).ofType(this._schema.name),
                    {[field]: id}
                ]
            });
    }

    async get(id: string | Schema.Types.ObjectId, field: keyof T | string = '_id'): Promise<DocWithCASL<T>> {
        const doc = await this.find(id, field);
        if (!doc) {
            throw new Error(`${id} in ${String(field)} not found`);
        }

        return doc;
    }

    async restore(id: string): Promise<DocWithCASL<T>> {
        const result = await this._schema.restore({
            $and: [
                accessibleBy(this._ability, ACT.RESTORE).ofType(this._schema.name),
                {_id: id}
            ]
        });
        return this.get(String(result.upsertedId));
    }

    async delete(id: string): Promise<number> {
        const r = await this._schema.delete({
            $and: [
                accessibleBy(this._ability, ACT.DELETE).ofType(this._schema.name),
                {_id: id}
            ],
        }, this._executor);
        return r.deletedCount
    }

    async getReference(id: any, field: string = '_id'): Promise<Schema.Types.ObjectId> {
        return this.get(id, field).then(doc => doc._id);
    }

    get schema(): ModelWithCASL<T> {
        return this._schema;
    }
}