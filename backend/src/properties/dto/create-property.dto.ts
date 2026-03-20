import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsEnum,
  IsArray,
  IsBoolean,
  Min,
  MaxLength,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

class PropertyImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  publicId: string;
}

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsEnum(['HOUSE', 'APARTMENT', 'CONDO', 'TOWNHOUSE', 'LOFT', 'STUDIO', 'DUPLEX', 'MOBILE_HOME', 'LAND', 'COMMERCIAL'])
  propertyType: string;

  @IsEnum(['SALE', 'RENT'])
  listingType: string;

  @IsOptional()
  @IsNumber()
  bedrooms?: number;

  @IsOptional()
  @IsNumber()
  bathrooms?: number;

  @IsOptional()
  @IsNumber()
  squareFeet?: number;

  @IsOptional()
  @IsNumber()
  lotSize?: number;

  @IsOptional()
  @IsNumber()
  yearBuilt?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  parkingSpots?: number;

  // Rental specific
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyRent?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  securityDeposit?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  leaseTermMonths?: number;

  @IsOptional()
  @IsBoolean()
  petsAllowed?: boolean;

  @IsOptional()
  @IsBoolean()
  utilitiesIncluded?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PropertyImageDto)
  images?: PropertyImageDto[];
} 