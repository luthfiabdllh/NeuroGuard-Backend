import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
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
    logout(userId: string): Promise<{
        id: string;
        email: string;
        password: string;
        full_name: string;
        dob: Date;
        gender: string;
        created_at: Date;
        refresh_token: string | null;
    }>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRefreshToken(userId: string, refreshToken: string): Promise<void>;
    getTokens(userId: string, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
