export declare class CreatePropertyDto {
    title: string;
    description: string;
    price: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude?: number;
    longitude?: number;
    propertyType: string;
    listingType: string;
    bedrooms?: number;
    bathrooms?: number;
    squareFeet?: number;
    lotSize?: number;
    yearBuilt?: number;
    parkingSpots?: number;
    monthlyRent?: number;
    securityDeposit?: number;
    leaseTermMonths?: number;
    petsAllowed?: boolean;
    utilitiesIncluded?: boolean;
    features?: string[];
    amenities?: string[];
}
