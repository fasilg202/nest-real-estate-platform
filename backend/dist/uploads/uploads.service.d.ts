import { ConfigService } from '@nestjs/config';
export declare class UploadsService {
    private configService;
    constructor(configService: ConfigService);
    uploadImage(file: Express.Multer.File, folder?: string): Promise<{
        url: string;
        publicId: string;
    }>;
    uploadMultipleImages(files: Express.Multer.File[], folder?: string): Promise<{
        url: string;
        publicId: string;
    }[]>;
    deleteImage(publicId: string): Promise<void>;
    deleteMultipleImages(publicIds: string[]): Promise<void>;
}
