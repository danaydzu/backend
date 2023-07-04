import {Injectable} from '@nestjs/common';
import {users} from '../../moks';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import * as bcrypt from 'bcrypt'
import {createUserDTO} from "./dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) {

    }

    getUsers() {
        return users;
    }

    async hashPassword(password) {
        return bcrypt.hash(password, 10)

    }

    // @ts-ignore
    async createUser(dto): Promise<createUserDTO> {
        dto.password = await this.hashPassword(dto.password)
        await this.userRepository.create(dto)
        return dto
    }
}
