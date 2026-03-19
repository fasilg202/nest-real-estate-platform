import { Document, Types } from 'mongoose';
export type ContactDocument = Contact & Document;
export declare class Contact {
    name: string;
    email: string;
    phone?: string;
    message: string;
    subject?: string;
    status: string;
    user?: Types.ObjectId;
    property: Types.ObjectId;
    owner: Types.ObjectId;
}
export declare const ContactSchema: import("mongoose").Schema<Contact, import("mongoose").Model<Contact, any, any, any, Document<unknown, any, Contact, any> & Contact & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Contact, Document<unknown, {}, import("mongoose").FlatRecord<Contact>, {}> & import("mongoose").FlatRecord<Contact> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
