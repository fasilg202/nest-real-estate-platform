import { Document, Types } from 'mongoose';
export type FavoriteDocument = Favorite & Document;
export declare class Favorite {
    user: Types.ObjectId;
    property: Types.ObjectId;
}
export declare const FavoriteSchema: import("mongoose").Schema<Favorite, import("mongoose").Model<Favorite, any, any, any, Document<unknown, any, Favorite, any> & Favorite & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Favorite, Document<unknown, {}, import("mongoose").FlatRecord<Favorite>, {}> & import("mongoose").FlatRecord<Favorite> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
