# Nest - Real Estate Platform

A comprehensive real estate platform inspired by Zillow, built with modern web technologies.

## 🏠 Features

### Core Functionality
- **Buy Properties**: Browse and search properties for sale with detailed listings
- **Rent Properties**: Discover rental properties with comprehensive rental information
- **Sell Properties**: Create and manage property listings as a seller/landlord

### Key Features
- ✅ User registration and authentication
- ✅ Advanced property search and filtering
- ✅ Property detail pages with image galleries
- ✅ Listing management dashboard
- ✅ Contact functionality between users
- ✅ Responsive design for all devices
- ✅ Image upload and management
- ✅ Real-time search and filtering

### Optional Enhancements
- 🚀 Map-based property search
- ⭐ Favorites and saved searches
- 🔔 Property notifications and alerts
- 👨‍💼 Admin panel for platform management

## 🛠 Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication
- **Cloudinary** - Image storage and optimization

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe frontend development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 6+
- npm or yarn

### Installation

1. **Clone and install dependencies**
```bash
git clone <your-repo>
cd nest-app
npm run install:all
```

2. **Set up environment variables**
```bash
# Backend (.env in backend folder)
MONGODB_URI="mongodb://localhost:27017/nest-real-estate"
JWT_SECRET="your-super-secret-jwt-key"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# Frontend (.env in frontend folder)
VITE_API_URL="http://localhost:3001"
```

3. **Set up the database**
```bash
# Seed the database with sample data
npm run db:seed

# Reset database (optional)
npm run db:reset
```

4. **Start the development servers**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📝 API Documentation

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Property Endpoints
- `GET /properties` - Get all properties with filtering
- `GET /properties/:id` - Get property by ID
- `POST /properties` - Create new property (authenticated)
- `PATCH /properties/:id` - Update property (owner only)
- `DELETE /properties/:id` - Delete property (owner only)
- `GET /properties/my-properties` - Get user's properties

### User Endpoints
- `GET /users/profile` - Get user profile
- `PATCH /users/profile` - Update user profile

### Upload Endpoints
- `POST /uploads/image` - Upload single image
- `POST /uploads/images` - Upload multiple images

## 🎨 UI/UX Design

The platform features a clean, modern interface inspired by Zillow with:
- Intuitive property search and filtering
- High-quality image galleries
- Mobile-responsive design
- Clear navigation and user flows
- Professional listing management tools

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- File upload security measures
- CORS protection
- Rate limiting

## 📱 Mobile Responsive

Fully responsive design that works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🌟 Future Enhancements

- Integration with mapping services
- Advanced search algorithms
- Payment processing
- Virtual property tours
- AI-powered property recommendations
- Mobile applications (iOS/Android)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

---

Built with ❤️ for modern real estate needs. 
