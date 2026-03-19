import { Document, Types } from 'mongoose';
export type PropertyDocument = Property & Document;
export declare class PropertyImage {
    url: string;
    publicId?: string;
    caption?: string;
    order: number;
}
export declare const PropertyImageSchema: import("mongoose").Schema<PropertyImage, import("mongoose").Model<PropertyImage, any, any, any, Document<unknown, any, PropertyImage, any> & PropertyImage & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PropertyImage, Document<unknown, {}, import("mongoose").FlatRecord<PropertyImage>, {}> & import("mongoose").FlatRecord<PropertyImage> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Property {
    title: string;
    description: string;
    price: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude?: number;
    longitude?: number;
    propertyType: string;
    listingType: string;
    bedrooms?: number;
    bathrooms?: number;
    squareFeet?: number;
    lotSize?: number;
    yearBuilt?: number;
    parkingSpots: number;
    monthlyRent?: number;
    securityDeposit?: number;
    leaseTermMonths?: number;
    petsAllowed: boolean;
    utilitiesIncluded: boolean;
    images: PropertyImage[];
    features: string[];
    amenities: string[];
    status: string;
    featuredUntil?: Date;
    owner: Types.ObjectId;
}
export declare const PropertySchema: import("mongoose").Schema<Property, import("mongoose").Model<Property, any, any, any, Document<unknown, any, Property, any> & Property & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Property, Document<unknown, {}, import("mongoose").FlatRecord<Property>, {}> & import("mongoose").FlatRecord<Property> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
