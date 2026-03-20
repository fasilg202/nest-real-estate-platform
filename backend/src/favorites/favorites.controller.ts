import { Controller, Post, Delete, Get, Param, UseGuards, Request } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':propertyId')
  addFavorite(@Param('propertyId') propertyId: string, @Request() req) {
    return this.favoritesService.addFavorite(req.user.id, propertyId);
  }

  @Delete(':propertyId')
  removeFavorite(@Param('propertyId') propertyId: string, @Request() req) {
    return this.favoritesService.removeFavorite(req.user.id, propertyId);
  }

  @Get()
  getFavorites(@Request() req) {
    return this.favoritesService.getFavorites(req.user.id);
  }

  @Get(':propertyId/status')
  isFavorite(@Param('propertyId') propertyId: string, @Request() req) {
    return this.favoritesService.isFavorite(req.user.id, propertyId);
  }
}
