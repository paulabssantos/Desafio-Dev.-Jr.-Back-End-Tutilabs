import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ListUserDto } from "src/users/dto/list-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { User } from "src/users/entities/user.entity";

export abstract class UserRepository {
    abstract create(createUserDto: CreateUserDto): Promise<void>;
    abstract list(): Promise<User[]>;
    abstract find(listUserDto: ListUserDto): Promise<User>;
    abstract update(id: string, updateUserDto: UpdateUserDto): Promise<void>;
    abstract findByEmail(email: string): Promise<User>;
}