import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PropertyDocument = Property & Document;

@Schema()
export class PropertyImage {
  @Prop({ required: true })
  url: string;

  @Prop()
  publicId?: string;

  @Prop()
  caption?: string;

  @Prop({ default: 0 })
  order: number;
}

export const PropertyImageSchema = SchemaFactory.createForClass(PropertyImage);

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop()
  latitude?: number;

  @Prop()
  longitude?: number;

  // Property Details
  @Prop({ 
    required: true, 
    enum: ['HOUSE', 'APARTMENT', 'CONDO', 'TOWNHOUSE', 'LOFT', 'STUDIO', 'DUPLEX', 'MOBILE_HOME', 'LAND', 'COMMERCIAL'] 
  })
  propertyType: string;

  @Prop({ required: true, enum: ['SALE', 'RENT'] })
  listingType: string;

  @Prop()
  bedrooms?: number;

  @Prop()
  bathrooms?: number;

  @Prop()
  squareFeet?: number;

  @Prop()
  lotSize?: number;

  @Prop()
  yearBuilt?: number;

  @Prop({ default: 0 })
  parkingSpots: number;

  // Rental specific
  @Prop()
  monthlyRent?: number;

  @Prop()
  securityDeposit?: number;

  @Prop()
  leaseTermMonths?: number;

  @Prop({ default: false })
  petsAllowed: boolean;

  @Prop({ default: false })
  utilitiesIncluded: boolean;

  // Media and Features
  @Prop({ type: [PropertyImageSchema], default: [] })
  images: PropertyImage[];

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ type: [String], default: [] })
  amenities: string[];

  // Status
  @Prop({ default: 'ACTIVE', enum: ['ACTIVE', 'PENDING', 'SOLD', 'RENTED', 'INACTIVE'] })
  status: string;

  @Prop()
  featuredUntil?: Date;

  // Owner reference
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;
}

export const PropertySchema = SchemaFactory.createForClass(Property); 