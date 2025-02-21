import { Pagination } from "./metadata"

export interface CreateUserContract {
    username: string
    email: string
    phone: string
}

export interface UpdateUserContract {
    email: string
    phone: string
}

export interface UserContract {
    id: string
    username: string
    email: string
    phone: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapUserContract = (user: any): UserContract => ({
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    phone: user.phone,
})

export interface UserResponse {
    user: UserContract
}

export interface UsersResponse {
    users: UserContract[]
    pagination: Pagination
}