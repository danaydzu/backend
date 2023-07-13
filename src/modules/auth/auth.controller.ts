import {Body, Controller, Delete, Post, Req, UseGuards} from '@nestjs/common';

import {createUserDTO} from "../user/dto";

import {AuthService} from "./auth.service";
import {UserLoginDTO} from "./dto";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthUserResponse} from "./response";
import {JwtAuthGuard} from "../../guards/jwt-guard";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {


    }

    @ApiTags('API')
    @ApiResponse({status: 201, type: createUserDTO})
    @Post('registration')
    register(@Body() dto: createUserDTO): Promise<createUserDTO> {
        return this.authService.registerUser(dto)

    }

    @ApiTags('API')
    @ApiResponse({status: 200, type: AuthUserResponse})
    @Post('login')
    login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
        return this.authService.loginUser(dto)

    }

    @UseGuards(JwtAuthGuard)
    @Post('test')
    test() {
        return true
    }

}
