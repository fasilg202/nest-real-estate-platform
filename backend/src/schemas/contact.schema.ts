import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop({ required: true })
  message: string;

  @Prop()
  subject?: string;

  @Prop({ default: 'NEW', enum: ['NEW', 'READ', 'REPLIED', 'ARCHIVED'] })
  status: string;

  // Relationships
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user?: Types.ObjectId; // Optional for anonymous users

  @Prop({ type: Types.ObjectId, ref: 'Property', required: true })
  property: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId; // Property owner who receives the inquiry
}

export const ContactSchema = SchemaFactory.createForClass(Contact); 