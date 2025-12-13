import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        password: string;
        full_name: string;
        dob: Date;
        gender: string;
        created_at: Date;
        refresh_token: string | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        password: string;
        full_name: string;
        dob: Date;
        gender: string;
        created_at: Date;
        refresh_token: string | null;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        password: string;
        full_name: string;
        dob: Date;
        gender: string;
        created_at: Date;
        refresh_token: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateUserDto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        password: string;
        full_name: string;
        dob: Date;
        gender: string;
        created_at: Date;
        refresh_token: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        password: string;
        full_name: string;
        dob: Date;
        gender: string;
        created_at: Date;
        refresh_token: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
