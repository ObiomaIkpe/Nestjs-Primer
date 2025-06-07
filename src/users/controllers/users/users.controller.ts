import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
// import { Request, Response } from 'express';
import { createUserDto } from '../dtos/createUser.dto';
import { UsersService } from 'src/users/service/users/users.service';
import { CreateUserType } from 'src/users/utils/types';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    // @Get()
    // getUsers() {
    //     return {username: "tony", email: "tony@gmail.com"};
    // }

    @Get()
    getUsers(){
        return this.userService.fetchAllUsers()
    }

    @Get('posts')
    getUserPosts() {
        return [
            {username: "tony",
            email: "tony@gmail.com", 
            posts: [
                {
                id: 1,
                title: "post 1"
            },
            {
                id: 2,
                title: "post 2"
            },
        ],
        }
        ]}

    // @Post('register')
    // SignUp(@Req() request: Request, @Res() response: Response) {
    //     // console.log(request.body);
    //     response.send('created!')
    // }

    @Post('register')
    @UsePipes(new ValidationPipe())
    createUser(@Body() userData: CreateUserType){
        console.log(userData);
        this.userService.createUser(userData)
        return {}
    }

    // @Get(':id/:postId')
    // getUserById(@Param('id', ParseIntPipe) id: number, @Param('postId') postId: string) {
    //     console.log(id, postId)
    //     return {id, postId}
    //     }


    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number, @Param('postId') postId: string) {
        console.log(id, postId)
        return this.userService.fetchUserById(id)
        }

    // working with query params
    @Get('filteringUsers')
    getUserViaQuery(@Query('sortBy') sortBy: string){
        console.log(sortBy)
        return [{username: "young", password: "to the tee"}]
    }
    }