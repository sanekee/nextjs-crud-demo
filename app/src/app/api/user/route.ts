import dbConnect, { getMongoServerError } from "@/lib/mongodb"
import User from "@/app/models/user"
import { CreateUserContract, mapUserContract, UsersResponse } from "@/app/contracts/user"
import { NextRequest, NextResponse } from "next/server"
import { ApiResponse } from "@/app/contracts/response"
import { ValidateCreateUserContract, ValidationError } from "@/app/validations/user"

export const POST = async (request: NextRequest): Promise<NextResponse<ApiResponse>> => {
    try {
        await dbConnect()

        const createUserContract: CreateUserContract = await request.json()

        try {
            ValidateCreateUserContract(createUserContract)
        } catch (err: unknown) {
            if (err instanceof ValidationError) {
                return NextResponse.json({
                    "message": err.toString()
                }, { status: 400 })
            }
            if (err instanceof ValidationError) {
                return NextResponse.json({
                    "message": err.toString()
                }, { status: 500 })
            }
        }

        await User.create(createUserContract);

        return NextResponse.json({
            message: "record has been inserted!"
        }, {
            status: 201
        });
    } catch (err: unknown) {
        console.error('failed to create new user', err)
        const mErr = getMongoServerError(err)
        console.log('mongserver server error', mErr)
        if (mErr && mErr.code === 11000) {
            const field = Object.keys(mErr.keyPattern)[0];
            const value = mErr.keyValue[field];

            return NextResponse.json({
                message: "duplicated field error",
                field: field,
                value: value
            }, {
                status: 409
            })
        }
    }

    return NextResponse.json({
        message: "internal server error"
    }, {
        status: 500
    })
}

export const GET = async (request: NextRequest): Promise<NextResponse<UsersResponse | ApiResponse>> => {
    try {
        await dbConnect();

        const url = new URL(request.url)
        const page = parseInt(await url.searchParams.get('page') || '0', 10);
        const limit = parseInt(await url.searchParams.get('limit') || '10', 10);
        const skip = page * limit;

        const users = (await User.find()
            .skip(skip)
            .limit(limit)
            .lean()
            .sort({ username: 'asc' })
        ).map(mapUserContract);

        const total = await User.countDocuments();

        return NextResponse.json({
            users: users,
            pagination: {
                page,
                limit,
                total,
            }
        }, {
            status: 200
        })
    } catch (err) {
        console.log('failed to get user', err)
        return NextResponse.json({
            message: "get user fail"
        }, {
            status: 500
        })
    }
}
