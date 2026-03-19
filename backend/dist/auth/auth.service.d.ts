import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<{
        user: {
            id: any;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            role: string;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: any;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            role: string;
        };
        token: string;
    }>;
    validateUser(email: string, password: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/user.schema").UserDocument, {}> & import("../schemas/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    validateUserById(userId: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/user.schema").UserDocument, {}> & import("../schemas/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
