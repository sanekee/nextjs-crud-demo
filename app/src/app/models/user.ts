import { Schema, models, model } from "mongoose"

const common = {
    type: String,
    required: true,
    trim: true
}

const userSchema = new Schema(
    {
        username: common,
        email: {
            ...common,
            unique: [true, "email already exist"]
        },
        phone: {
            ...common,
            unique: [true, "phone number already exist"]
        }
    },
    {
        timestamps: true
    }
)

const User = models.User || model('User', userSchema)

export type CreateUserFieldNames = 'username' | 'email' | 'phone'
export type UpdateUserFieldNames = 'email' | 'phone'

export default User