import { Model } from 'mongoose';
import { Property, PropertyDocument } from '../schemas/property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
export declare class PropertiesService {
    private propertyModel;
    constructor(propertyModel: Model<PropertyDocument>);
    create(createPropertyDto: CreatePropertyDto, userId: string): Promise<import("mongoose").Document<unknown, {}, PropertyDocument, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(query?: any): Promise<(import("mongoose").Document<unknown, {}, PropertyDocument, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, PropertyDocument, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updatePropertyDto: UpdatePropertyDto, userId: string): Promise<import("mongoose").Document<unknown, {}, PropertyDocument, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, PropertyDocument, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByOwner(userId: string): Promise<(import("mongoose").Document<unknown, {}, PropertyDocument, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
