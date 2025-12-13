import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        user: any;
        access_token: string;
        refresh_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        password: string;
        full_name: string;
        dob: Date;
        gender: string;
        created_at: Date;
        refresh_token: string | null;
    }>;
    logout(req: any): Promise<{
        id: string;
        email: string;
        password: string;
        full_name: string;
        dob: Date;
        gender: string;
        created_at: Date;
        refresh_token: string | null;
    }>;
    refreshTokens(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
