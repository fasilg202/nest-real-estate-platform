import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { Contact, ContactSchema } from '../schemas/contact.schema';
import { Property, PropertySchema } from '../schemas/property.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contact.name, schema: ContactSchema },
      { name: Property.name, schema: PropertySchema }
    ])
  ],
  controllers: [ContactsController],
  providers: [ContactsService]
})
export class ContactsModule {}
