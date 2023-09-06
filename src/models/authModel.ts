import {User} from "./user";

export interface AuthModel {
    token: string
    user: User
}