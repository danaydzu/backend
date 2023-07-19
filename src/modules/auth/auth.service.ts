import {BadRequestException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {createUserDTO} from "../user/dto";
import {AppError} from "../../common/constants/errors";
import {UserLoginDTO} from "./dto";
import * as bcrypt from "bcrypt"
import {AuthUserResponse} from "./response";
import {AST} from "eslint";
import Token = AST.Token;
import {TokenService} from "../token/token.service";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {
    }

    async registerUser(dto: createUserDTO): Promise<createUserDTO> {
        try {
            const existUser = await this.userService.findUserByEmail(dto.email)
            if (existUser) throw new BadRequestException(AppError.USER_EXIST)
            return this.userService.createUser(dto)
        } catch (e) {
            throw new Error(e)
        }
    }

    async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
        try {

            const existUser = await this.userService.findUserByEmail(dto.email)
            if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST)

            const validatePassword = await bcrypt.compare(dto.password, existUser.password)
            if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)

            const user = await this.userService.publicUser(dto.email)
            const token = await this.tokenService.generateJwtToken(user)
            return {user, token}
        } catch (e) {
            throw new Error(e)
        }
    }
}
