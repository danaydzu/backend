import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class createUserDTO {

    @ApiProperty()
    @IsString()
    firstName: string
    
    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    password: string
}

export class UpdateUserDTO {
    @ApiProperty()
    @IsString()
    firstName: string
    @ApiProperty()
    @IsString()
    username: string
    @ApiProperty()
    @IsString()
    email: string
}