import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Property, PropertyDocument } from '../schemas/property.schema';
import { Contact, ContactDocument } from '../schemas/contact.schema';
import { Favorite, FavoriteDocument } from '../schemas/favorite.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    console.log('🗑️  Resetting database...');

    // Get all models
    const userModel = app.get<Model<UserDocument>>('UserModel');
    const propertyModel = app.get<Model<PropertyDocument>>('PropertyModel');
    
    // Clear all collections
    await userModel.deleteMany({});
    await propertyModel.deleteMany({});
    
    // Try to clear other collections if they exist
    try {
      const contactModel = app.get<Model<ContactDocument>>('ContactModel');
      await contactModel.deleteMany({});
    } catch (e) {
      // Collection might not exist yet
    }
    
    try {
      const favoriteModel = app.get<Model<FavoriteDocument>>('FavoriteModel');
      await favoriteModel.deleteMany({});
    } catch (e) {
      // Collection might not exist yet
    }

    console.log('✅ Database reset successfully!');
    
  } catch (error) {
    console.error('❌ Error resetting database:', error);
  } finally {
    await app.close();
  }
}

bootstrap(); 