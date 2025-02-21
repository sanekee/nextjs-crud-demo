import { CreateUserContract, UpdateUserContract } from "../contracts/user"

export const UserNameRule = /^[a-zA-Z0-9]+$/
export const EmailRule = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const PhoneRule = /^[+]?[0-9]+$/

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

export const ValidateCreateUserContract = (user: CreateUserContract) => {
    if (!UserNameRule.test(user.username)) {
        throw new ValidationError("invalid username. Only letters and numbers are allowed.")
    }
    if (!EmailRule.test(user.email)) {
        throw new ValidationError("invalid email address")
    }
    if (!PhoneRule.test(user.phone)) {
        throw new ValidationError("invalid phone")
    }
}

export const ValidateUpdateUserContract = (user: UpdateUserContract) => {
    if (!EmailRule.test(user.email)) {
        throw new ValidationError("invalid email address")
    }
    if (!PhoneRule.test(user.phone)) {
        throw new ValidationError("invalid phone")
    }
}