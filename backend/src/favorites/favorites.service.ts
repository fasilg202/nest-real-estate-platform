import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from '../schemas/favorite.schema';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
  ) {}

  async addFavorite(userId: string, propertyId: string) {
    const existing = await this.favoriteModel.findOne({ user: userId, property: propertyId });
    
    if (existing) {
      throw new ConflictException('Property already in favorites');
    }

    const favorite = new this.favoriteModel({
      user: userId,
      property: propertyId
    });

    return favorite.save();
  }

  async removeFavorite(userId: string, propertyId: string) {
    const result = await this.favoriteModel.deleteOne({ user: userId, property: propertyId });
    
    if (result.deletedCount === 0) {
      throw new NotFoundException('Favorite not found');
    }

    return { message: 'Removed from favorites' };
  }

  async getFavorites(userId: string) {
    return this.favoriteModel
      .find({ user: userId })
      .populate('property')
      .sort({ createdAt: -1 })
      .exec();
  }

  async isFavorite(userId: string, propertyId: string) {
    const favorite = await this.favoriteModel.findOne({ user: userId, property: propertyId });
    return { isFavorite: !!favorite };
  }
}
