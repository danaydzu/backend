import {isString} from "@nestjs/common/utils/shared.utils";

export class createUserDTO {
    // @ts-ignore
    @isString()
    firstName: string

    // @ts-ignore
    @isString()
    username: string

    // @ts-ignore
    @isString()
    email: string

    // @ts-ignore
    @isString()
    password: string
}

