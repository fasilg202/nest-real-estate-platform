"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
let UploadsService = class UploadsService {
    constructor(configService) {
        this.configService = configService;
        cloudinary_1.v2.config({
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
        });
    }
    async uploadImage(file, folder = 'nest-properties') {
        try {
            if (!file.mimetype.startsWith('image/')) {
                throw new common_1.BadRequestException('Only image files are allowed');
            }
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                throw new common_1.BadRequestException('File size must be less than 5MB');
            }
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary_1.v2.uploader.upload_stream({
                    folder,
                    resource_type: 'image',
                    transformation: [
                        { width: 1200, height: 800, crop: 'limit' },
                        { quality: 'auto' },
                        { format: 'webp' }
                    ]
                }, (error, result) => {
                    if (error)
                        reject(error);
                    else
                        resolve(result);
                }).end(file.buffer);
            });
            return {
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to upload image');
        }
    }
    async uploadMultipleImages(files, folder = 'nest-properties') {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('No files provided');
        }
        if (files.length > 10) {
            throw new common_1.BadRequestException('Maximum 10 images allowed');
        }
        const uploadPromises = files.map(file => this.uploadImage(file, folder));
        try {
            return await Promise.all(uploadPromises);
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to upload one or more images');
        }
    }
    async deleteImage(publicId) {
        try {
            await cloudinary_1.v2.uploader.destroy(publicId);
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete image');
        }
    }
    async deleteMultipleImages(publicIds) {
        if (!publicIds || publicIds.length === 0) {
            return;
        }
        try {
            await cloudinary_1.v2.api.delete_resources(publicIds);
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete images');
        }
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadsService);
//# sourceMappingURL=uploads.service.js.map