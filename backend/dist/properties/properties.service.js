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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const property_schema_1 = require("../schemas/property.schema");
let PropertiesService = class PropertiesService {
    constructor(propertyModel) {
        this.propertyModel = propertyModel;
    }
    async create(createPropertyDto, userId) {
        const property = new this.propertyModel({
            ...createPropertyDto,
            owner: userId,
        });
        return property.save();
    }
    async findAll(query = {}) {
        const { city, state, propertyType, listingType, minPrice, maxPrice, bedrooms, bathrooms, limit = 20, offset = 0 } = query;
        const filter = { status: 'ACTIVE' };
        if (city)
            filter.city = new RegExp(city, 'i');
        if (state)
            filter.state = new RegExp(state, 'i');
        if (propertyType)
            filter.propertyType = propertyType;
        if (listingType)
            filter.listingType = listingType;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice)
                filter.price.$gte = Number(minPrice);
            if (maxPrice)
                filter.price.$lte = Number(maxPrice);
        }
        if (bedrooms)
            filter.bedrooms = Number(bedrooms);
        if (bathrooms)
            filter.bathrooms = Number(bathrooms);
        return this.propertyModel
            .find(filter)
            .populate('owner', 'firstName lastName email phone')
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip(Number(offset))
            .exec();
    }
    async findOne(id) {
        const property = await this.propertyModel
            .findById(id)
            .populate('owner', 'firstName lastName email phone')
            .exec();
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        return property;
    }
    async update(id, updatePropertyDto, userId) {
        const property = await this.propertyModel.findById(id);
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        if (property.owner.toString() !== userId) {
            throw new common_1.ForbiddenException('You can only update your own properties');
        }
        return this.propertyModel
            .findByIdAndUpdate(id, updatePropertyDto, { new: true })
            .populate('owner', 'firstName lastName email phone')
            .exec();
    }
    async remove(id, userId) {
        const property = await this.propertyModel.findById(id);
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        if (property.owner.toString() !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own properties');
        }
        return this.propertyModel.findByIdAndDelete(id).exec();
    }
    async findByOwner(userId) {
        return this.propertyModel
            .find({ owner: userId })
            .populate('owner', 'firstName lastName email phone')
            .sort({ createdAt: -1 })
            .exec();
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(property_schema_1.Property.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map