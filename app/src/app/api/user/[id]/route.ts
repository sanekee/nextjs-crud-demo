import { ApiResponse } from "@/app/contracts/response";
import { UpdateUserContract } from "@/app/contracts/user";
import dbConnect, { getMongoServerError } from "@/lib/mongodb";
import User from "@/app/models/user";
import { ValidateUpdateUserContract, ValidationError } from "@/app/validations/user";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{ id: string }>
}

export const PUT = async (request: NextRequest, { params }: RouteParams): Promise<NextResponse<ApiResponse>> => {
    const id = (await params).id;

    try {
        await dbConnect();
        const updateUser: UpdateUserContract = await request.json()

        try {
            ValidateUpdateUserContract(updateUser)
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
        await User.findByIdAndUpdate(id, updateUser)
        return NextResponse.json(
            {
                message: "record has been updated!"
            },
            {
                status: 200
            }
        )
    } catch (err) {
        console.error('failed to update user', err)
        const mErr = getMongoServerError(err)
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
        return NextResponse.json({
            "message": "update user failed"
        }, {
            status: 500
        })
    }
}

export const GET = async (_: NextRequest, { params }: RouteParams): Promise<NextResponse> => {
    const id = (await params).id;
    try {
        await dbConnect();

        const user = await User.findById(id)
        return NextResponse.json(
            {
                success: true,
                user
            },
            {
                status: 200
            }
        )
    } catch (err) {
        // here we can check error like not found to return 404
        console.error('failed to get user', id, err)
        return NextResponse.json({
            message: "get user failed"
        }, {
            status: 500
        })
    }
}

export const DELETE = async (_: NextRequest, { params }: RouteParams): Promise<NextResponse<ApiResponse>> => {
    const id = (await params).id;
    try {
        await dbConnect()

        await User.findByIdAndDelete(id)

        return NextResponse.json({
            message: "record deleted"
        }, {
            status: 200
        })
    } catch (err) {
        console.error('failed to delete user', err)
        return NextResponse.json({
            message: "delete user failed"
        }, {
            status: 500
        })
    }
}