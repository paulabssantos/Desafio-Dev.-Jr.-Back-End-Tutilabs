import { CreateUserDto } from "../dto/create-user.dto";

export abstract class UserRepository{
    abstract create(createUserDTO: CreateUserDto):Promise<void>;
}