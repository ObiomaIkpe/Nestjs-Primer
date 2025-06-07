import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/users/utils/types';

@Injectable()
export class UsersService {
    private dummyUsers = [{"username": "youngtee", "email": "youngtee@gmail.com"},
        {"username": "youngtee1", "email": "youngtee1@gmail.com"},
        {"username": "youngtee100", "email": "youngtee100@gmail.com"}
    ]
    fetchAllUsers(){
        return this.dummyUsers
    }

    createUser(userDetails: CreateUserType) {
        this.dummyUsers.push(userDetails)
        return;
    }

    fetchUserById(id: number) {
        return {id: 1, username: "youngtee"}
    }
}
