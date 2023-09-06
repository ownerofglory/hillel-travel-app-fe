import {User} from "../models/user";
import appConstants from "../constants/appConstants";

const getUserById = (id: number, onUser: (user: User) => void) => {
    fetch(`${appConstants.baseUrl}/users/${id}`).then(res => {
        if (res.ok) {
            return res.json()
        }
    }).then(onUser)
}

const userService = {
    getUserById: getUserById
}

export default userService