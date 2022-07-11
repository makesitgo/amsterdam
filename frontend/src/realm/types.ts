export interface AtlasService {
  db: (name: string) => AtlasDatabase;
}

export interface AtlasDatabase {
  collection: <T extends Document = any>(name: string) => AtlasCollection<T>;
}

export interface AtlasCollection<T extends Document> {
  find: (filter?: Filter, options?: FindOptions) => Promise<T[]>;
  findOne: (filter?: Filter, options?: FindOneOptions) => Promise<T | null>;
  findOneAndUpdate: (filter: Filter, update: Update, options?: FindOneAndModifyOptions) => Promise<T | null>;
  findOneAndReplace: (
    filter: Filter,
    replacement: NewDocument<T>,
    options?: FindOneAndModifyOptions,
  ) => Promise<T | null>;
  findOneAndDelete: (filter: Filter, options?: FindOneOptions) => Promise<T | null>;
  aggregate: (pipeline: AggregatePipelineStage[]) => Promise<any>;
  count: (filter?: Filter, options?: CountOptions) => Promise<number>;
  insertOne: (document: NewDocument<T>) => Promise<InsertOneResult<T['_id']>>;
  insertMany: (documents: NewDocument<T>[]) => Promise<InsertManyResult<T['_id']>>;
  deleteOne: (filter: Filter) => Promise<DeleteResult>;
  deleteMany: (filter: Filter) => Promise<DeleteResult>;
  updateOne: (filter: Filter, update: Update, options?: UpdateOptions) => Promise<UpdateResult<T['_id']>>;
  updateMany: (filter: Filter, update: Update, options?: UpdateOptions) => Promise<UpdateResult<T['_id']>>;
  watch: (options?: { ids: T['_id'][] } | { filter: Filter } | unknown) => AsyncGenerator<ChangeEvent<T>>;
  // watch: (options: { ids: T['_id'][] }) => AsyncGenerator<ChangeEvent<T>>;
  // watch: (options: { filter: Filter }) => AsyncGenerator<ChangeEvent<T>>;
}

export interface Document<ID = any> {
  _id: ID;
}

type NewDocument<T extends Document> = Omit<T, '_id'> & Partial<Pick<T, '_id'>>;

type AggregatePipelineStage = Record<string, unknown>;

export type Filter = Record<string, unknown>;

type Update = Record<string, unknown>;

interface FindOneOptions {
  projection?: Record<string, unknown>;
  sort?: Record<string, unknown>;
}

export interface FindOptions extends FindOneOptions {
  limit?: number;
}

interface FindOneAndModifyOptions extends FindOneOptions {
  upsert?: boolean;
  returnNewDocument?: boolean;
}

interface CountOptions {
  limit?: number;
}

interface UpdateOptions {
  upsert?: boolean;
  arrayFilters?: Filter[];
}

interface InsertOneResult<ID = any> {
  insertedId: ID;
}

interface InsertManyResult<ID = any> {
  insertedIds: ID[];
}

interface DeleteResult {
  deletedCount: number;
}

interface UpdateResult<ID = any> {
  matchedCount: number;
  modifiedCount: number;
  upsertedId?: ID;
}

type OperationType = 'insert' | 'delete' | 'replace' | 'update' | 'drop' | 'rename' | 'dropDatabase' | 'invalidate';

type DocumentNamespace = { db: string; coll: string };

type UpdateDescription = { updatedFields: Record<string, any>; removedFields: string[] };

type DocumentKey<IdType> = { _id: IdType } & Record<string, any>;

interface BaseChangeEvent<T extends OperationType, ID = any> {
  _id: ID;
  operationType: T;
  clusterTime: Timestamp;
  txnNumber?: Long;
  lsid?: Record<string, unknown>;
}

interface InsertEvent<T extends Document> extends BaseChangeEvent<'insert'> {
  ns: DocumentNamespace;
  documentKey: DocumentKey<T['_id']>;
  fullDocument: T;
}

interface UpdateEvent<T extends Document> extends BaseChangeEvent<'update'> {
  ns: DocumentNamespace;
  documentKey: DocumentKey<T['_id']>;
  updateDescription: UpdateDescription;
  fullDocument?: T;
}

interface ReplaceEvent<T extends Document> extends BaseChangeEvent<'replace'> {
  ns: DocumentNamespace;
  documentKey: DocumentKey<T['_id']>;
  fullDocument: T;
}

interface DeleteEvent<T extends Document> extends BaseChangeEvent<'delete'> {
  ns: DocumentNamespace;
  documentKey: DocumentKey<T['_id']>;
}

interface DropEvent extends BaseChangeEvent<'drop'> {
  ns: DocumentNamespace;
}

interface RenameEvent extends BaseChangeEvent<'rename'> {
  ns: DocumentNamespace;
  to: DocumentNamespace;
}

interface DropDatabaseEvent extends BaseChangeEvent<'dropDatabase'> {
  ns: Omit<DocumentNamespace, 'coll'>;
}

interface InvalidateEvent extends BaseChangeEvent<'invalidate'> {}

type ChangeEvent<T extends Document> =
  | InsertEvent<T>
  | UpdateEvent<T>
  | ReplaceEvent<T>
  | DeleteEvent<T>
  | DropEvent
  | RenameEvent
  | DropDatabaseEvent
  | InvalidateEvent;
