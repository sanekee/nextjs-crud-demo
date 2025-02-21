"use client"

import { useRouter } from 'next/navigation'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { getUser as getUserApi, updateUser as updateUserApi } from '../../../service/user'
import { UpdateUserContract, UserContract, UserResponse } from '../../../contracts/user'
import { Button } from '@/components/ui/button'
import { Loading } from '@/app/components/loading'
import { useParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { UpdateUserFieldNames } from '@/app/models/user'


const EditUser: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [user, setUser] = useState<UserContract | undefined>(undefined)

    const params = useParams<{ id: string }>()

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<UpdateUserContract>({
        mode: "onChange"
    });
    const redirect = useRouter()

    const getUser = useCallback(async () => {
        setIsLoading(true)
        getUserApi(params.id).then((resp: UserResponse) => {
            reset(resp.user)
            setUser(resp.user)
        }).catch((err) => {
            alert(err.message)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [params.id, reset])

    useEffect(() => {
        getUser()
    }, [getUser])

    const updateUser = async (data: FieldValues) => {
        updateUserApi(params.id, data as UpdateUserContract)
            .then(() => {
                redirect.push('/user/list');
            })
            .catch((err) => {
                if (err.message === 'duplicated field error' && err.field) {
                    setError(err.field as UpdateUserFieldNames, {
                        type: "manual",
                        message: `${err.value} already exists`
                    })
                } else {
                    alert(err.message)
                }
                console.log(err)
            })
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="lg:w-1/4 mx-auto my-5 p-5 shadow-md rounded-lg">
                    <form action="" method="post" onSubmit={handleSubmit(updateUser)} >
                        < div className="mt-4" >
                            <label className='block font-medium'>User Name</label>
                            <label className='block font-extrabold'>{user!.username}</label>
                        </div>
                        < div className="mt-4" >
                            <label className='block font-medium'>Email</label>
                            <Input type="text"
                                {...register('email',
                                    {
                                        required: "Please input email",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email format",
                                        }
                                    }
                                )}
                                placeholder='Email Address' />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        < div className="mt-4" >
                            <label className='block font-medium'>Phone</label>
                            <Input type="text"
                                {...register('phone',
                                    {
                                        required: "Please input phone number",
                                        pattern: {
                                            value: /^[+]?[0-9]+$/,
                                            message: "Invalid phone format",
                                        }
                                    }
                                )}
                                placeholder='Phone number' />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                        </div>
                        < div className="mt-4" >
                            <Button>submit</Button>
                        </div>
                    </form >
                </div >
            )}
        </>
    )
}

export default EditUser