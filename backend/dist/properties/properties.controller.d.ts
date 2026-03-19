import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
export declare class PropertiesController {
    private readonly propertiesService;
    constructor(propertiesService: PropertiesService);
    create(createPropertyDto: CreatePropertyDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/property.schema").PropertyDocument, {}> & import("../schemas/property.schema").Property & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(query: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/property.schema").PropertyDocument, {}> & import("../schemas/property.schema").Property & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findMyProperties(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/property.schema").PropertyDocument, {}> & import("../schemas/property.schema").Property & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/property.schema").PropertyDocument, {}> & import("../schemas/property.schema").Property & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updatePropertyDto: UpdatePropertyDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/property.schema").PropertyDocument, {}> & import("../schemas/property.schema").Property & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string, req: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/property.schema").PropertyDocument, {}> & import("../schemas/property.schema").Property & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
