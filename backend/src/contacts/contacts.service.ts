import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from '../schemas/contact.schema';
import { Property, PropertyDocument } from '../schemas/property.schema';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    const property = await this.propertyModel.findById(createContactDto.propertyId);
    
    if (!property) {
      throw new NotFoundException('Property not found');
    }

    const contact = new this.contactModel({
      name: createContactDto.name,
      email: createContactDto.email,
      phone: createContactDto.phone,
      message: createContactDto.message,
      subject: createContactDto.subject,
      property: property._id,
      owner: property.owner,
      status: 'NEW'
    });

    return contact.save();
  }

  async findByOwner(ownerId: string) {
    return this.contactModel
      .find({ owner: ownerId })
      .populate('property', 'title address city state')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    return this.contactModel
      .findById(id)
      .populate('property', 'title address city state')
      .exec();
  }

  async updateStatus(id: string, status: string, ownerId: string) {
    const contact = await this.contactModel.findById(id);
    
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    if (contact.owner.toString() !== ownerId) {
      throw new NotFoundException('Contact not found');
    }

    contact.status = status;
    return contact.save();
  }
}
