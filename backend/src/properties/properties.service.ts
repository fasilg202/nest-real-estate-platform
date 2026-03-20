import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from '../schemas/property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, userId: string) {
    const property = new this.propertyModel({
      ...createPropertyDto,
      owner: userId,
    });
    
    return property.save();
  }

  async findAll(query: any = {}) {
    const { 
      city, 
      state,
      address,
      neighborhood,
      propertyType, 
      listingType, 
      minPrice, 
      maxPrice,
      bedrooms,
      bathrooms,
      sort,
      limit = 20,
      offset = 0 
    } = query;

    const filter: any = { status: 'ACTIVE' };

    if (city) filter.city = new RegExp(city, 'i');
    if (state) filter.state = new RegExp(state, 'i');
    if (address) filter.address = new RegExp(address, 'i');
    if (neighborhood) filter.address = new RegExp(neighborhood, 'i');
    if (propertyType) filter.propertyType = propertyType;
    if (listingType) filter.listingType = listingType;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (bedrooms) filter.bedrooms = { $gte: Number(bedrooms) };
    if (bathrooms) filter.bathrooms = { $gte: Number(bathrooms) };

    let sortOption: any = { createdAt: -1 }; // default: newest first
    
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };
    else if (sort === 'date-asc') sortOption = { createdAt: 1 };
    else if (sort === 'date-desc') sortOption = { createdAt: -1 };

    const [properties, total] = await Promise.all([
      this.propertyModel
        .find(filter)
        .populate('owner', 'firstName lastName email phone')
        .sort(sortOption)
        .limit(Number(limit))
        .skip(Number(offset))
        .exec(),
      this.propertyModel.countDocuments(filter).exec()
    ]);

    return {
      properties,
      total,
      limit: Number(limit),
      offset: Number(offset),
      hasMore: offset + properties.length < total
    };
  }

  async findOne(id: string) {
    const property = await this.propertyModel
      .findById(id)
      .populate('owner', 'firstName lastName email phone')
      .exec();

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto, userId: string) {
    const property = await this.propertyModel.findById(id);
    
    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.owner.toString() !== userId) {
      throw new ForbiddenException('You can only update your own properties');
    }

    return this.propertyModel
      .findByIdAndUpdate(id, updatePropertyDto, { new: true })
      .populate('owner', 'firstName lastName email phone')
      .exec();
  }

  async remove(id: string, userId: string) {
    const property = await this.propertyModel.findById(id);
    
    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.owner.toString() !== userId) {
      throw new ForbiddenException('You can only delete your own properties');
    }

    return this.propertyModel.findByIdAndDelete(id).exec();
  }

  async findByOwner(userId: string) {
    return this.propertyModel
      .find({ owner: userId })
      .populate('owner', 'firstName lastName email phone')
      .sort({ createdAt: -1 })
      .exec();
  }
} 