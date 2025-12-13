import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
        full_name: string;
        dob: Date;
        gender: string;
        id: string;
        created_at: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        email: string;
        password: string;
        full_name: string;
        dob: Date;
        gender: string;
        id: string;
        created_at: Date;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        full_name: string;
        dob: Date;
        gender: string;
        id: string;
        created_at: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findOneByEmail(email: string): Promise<{
        email: string;
        password: string;
        full_name: string;
        dob: Date;
        gender: string;
        id: string;
        created_at: Date;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        full_name: string;
        dob: Date;
        gender: string;
        id: string;
        created_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        full_name: string;
        dob: Date;
        gender: string;
        id: string;
        created_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
