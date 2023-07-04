import {Body,Controller, Get, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {createUserDTO} from "./dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get('get-all-users')
    getUsers() {
        return this.userService.getUsers();
    }
    @Post('create-user')
    createUsers (@Body() dto: createUserDTO) {
        console.log(dto)
        return this.userService.createUser(dto)
    }

}
