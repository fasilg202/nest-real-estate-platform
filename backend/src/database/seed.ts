import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { PropertiesService } from '../properties/properties.service';
import * as bcrypt from 'bcryptjs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const usersService = app.get(UsersService);
  const propertiesService = app.get(PropertiesService);

  try {
    console.log('🌱 Seeding database...');

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    const user1 = await usersService.create({
      email: 'john.doe@example.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      role: 'USER'
    });

    const user2 = await usersService.create({
      email: 'jane.smith@example.com',
      password: hashedPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1987654321',
      role: 'USER'
    });

    const admin = await usersService.create({
      email: 'admin@nest.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1555000000',
      role: 'ADMIN'
    });

    // Create sample properties
    const sampleProperties = [
      {
        title: 'Beautiful Modern Home in Downtown',
        description: 'Stunning 3-bedroom, 2-bathroom modern home with open floor plan, gourmet kitchen, and beautiful city views. Perfect for families or professionals.',
        price: 750000,
        address: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        latitude: 37.7749,
        longitude: -122.4194,
        propertyType: 'HOUSE',
        listingType: 'SALE',
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 2200,
        yearBuilt: 2020,
        parkingSpots: 2,
        features: ['Modern Kitchen', 'Hardwood Floors', 'City Views', 'Walk-in Closets'],
        amenities: ['Garage', 'Garden', 'Security System'],
        status: 'ACTIVE',
        owner: user1.id
      },
      {
        title: 'Luxury Apartment with Bay Views',
        description: 'Spectacular 2-bedroom luxury apartment with panoramic bay views, high-end finishes, and premium amenities.',
        price: 4500,
        address: '456 Bay Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94133',
        latitude: 37.8015,
        longitude: -122.4156,
        propertyType: 'APARTMENT',
        listingType: 'RENT',
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1800,
        yearBuilt: 2019,
        parkingSpots: 1,
        monthlyRent: 4500,
        securityDeposit: 9000,
        leaseTermMonths: 12,
        petsAllowed: true,
        utilitiesIncluded: false,
        features: ['Bay Views', 'Balcony', 'In-unit Laundry', 'High Ceilings'],
        amenities: ['Gym', 'Pool', 'Concierge', 'Rooftop Deck'],
        status: 'ACTIVE',
        owner: user2.id
      },
      {
        title: 'Cozy Studio in Tech Hub',
        description: 'Perfect studio apartment for young professionals. Located in the heart of the tech district with easy access to public transportation.',
        price: 2800,
        address: '789 Tech Avenue',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94107',
        propertyType: 'STUDIO',
        listingType: 'RENT',
        bedrooms: 0,
        bathrooms: 1,
        squareFeet: 600,
        yearBuilt: 2018,
        parkingSpots: 0,
        monthlyRent: 2800,
        securityDeposit: 2800,
        leaseTermMonths: 12,
        petsAllowed: false,
        utilitiesIncluded: true,
        features: ['Open Layout', 'Modern Appliances', 'Natural Light'],
        amenities: ['24/7 Security', 'Bike Storage'],
        status: 'ACTIVE',
        owner: user1.id
      },
      {
        title: 'Family Home with Large Yard',
        description: 'Spacious 4-bedroom family home with large backyard, perfect for kids and pets. Quiet residential neighborhood.',
        price: 950000,
        address: '321 Family Lane',
        city: 'Oakland',
        state: 'CA',
        zipCode: '94610',
        latitude: 37.8044,
        longitude: -122.2712,
        propertyType: 'HOUSE',
        listingType: 'SALE',
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2800,
        lotSize: 7200,
        yearBuilt: 1995,
        parkingSpots: 2,
        features: ['Large Yard', 'Updated Kitchen', 'Fireplace', 'Master Suite'],
        amenities: ['Garage', 'Storage', 'Patio'],
        status: 'ACTIVE',
        owner: user2.id
      }
    ];

    for (const propertyData of sampleProperties) {
      await propertiesService.create(propertyData, propertyData.owner);
    }

    console.log('✅ Database seeded successfully!');
    console.log('📧 Sample user accounts:');
    console.log('   - john.doe@example.com / password123');
    console.log('   - jane.smith@example.com / password123');
    console.log('   - admin@nest.com / password123');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await app.close();
  }
}

bootstrap(); 