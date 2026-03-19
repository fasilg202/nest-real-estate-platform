import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
