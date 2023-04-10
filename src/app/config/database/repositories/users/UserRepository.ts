import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { ListUserDto } from "src/modules/users/dto/list-user.dto";
import { UpdateUserDto } from "src/modules/users/dto/update-user.dto";
import { User } from "src/modules/users/entities/user.entity";

export abstract class UserRepository {
    abstract create(createUserDto: CreateUserDto): Promise<Omit<User, "password">>;
    abstract list(): Promise<User[]>;
    abstract find(listUserDto: ListUserDto): Promise<User>;
    abstract update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    abstract findByEmail(email: string): Promise<User>;
    abstract delete(id: string): Promise<void>
    abstract filter(listUserDto: ListUserDto): Promise<Omit<User, "password">[]>
}