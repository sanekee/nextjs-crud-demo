"use client"

import React, { FC } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createUser as createUserApi } from '@/app/service/user'
import { ApiResponse } from '../../contracts/response'
import { CreateUserContract } from '../../contracts/user'
import { Button } from '@/components/ui/button'
import { EmailRule, PhoneRule, UserNameRule } from '@/app/validations/user'
import { Input } from '@/components/ui/input'
import { CreateUserFieldNames } from '@/app/models/user'

const AddUser: FC = () => {
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<CreateUserContract>({
        mode: "onChange"
    });
    const redirect = useRouter()
    const createUser = async (data: FieldValues) => {
        createUserApi(data as CreateUserContract)
            .then(() => {
                reset()
                redirect.push('/user/list')
            })
            .catch((err: ApiResponse) => {
                if (err.message === 'duplicated field error' && err.field) {
                    setError(err.field as CreateUserFieldNames, {
                        type: "manual",
                        message: `${err.value} already exists`
                    })
                } else {
                    alert(err.message)
                }
                console.log(err)
            })
    };

    return (
        <>
            <div className="lg:w-1/4 mx-auto my-5 p-5 shadow-md rounded-lg">
                <form action="" method="post" onSubmit={handleSubmit(createUser)} >
                    <div className="mt-4 space-y-4" >
                        <label className='block font-medium'>Username</label>
                        <Input type="text"
                            {...register('username',
                                {
                                    required: "Please input username",
                                    pattern: {
                                        value: UserNameRule,
                                        message: "Invalid username, only letters and numbers are allowed."
                                    }
                                }
                            )}
                            placeholder='Username' className='form-control' />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>
                    < div className="mt-4" >
                        <label className='block font-medium'>Email</label>
                        <Input type="text"
                            {...register('email',
                                {
                                    required: "Please input email",
                                    pattern: {
                                        value: EmailRule,
                                        message: "Invalid email address format",
                                    }
                                }
                            )}
                            placeholder='Email Address' className='form-control' />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    < div className="mt-4" >
                        <label className='block font-medium'>Phone</label>
                        <Input type="text"
                            {...register('phone',
                                {
                                    required: "Please input phone number",
                                    pattern: {
                                        value: PhoneRule,
                                        message: "Invalid phone number format",
                                    }
                                }
                            )}
                            placeholder='Phone number' className='form-control' />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                    < div className="mt-4" >
                        <Button>submit</Button>
                    </div>
                </form>
            </div >
        </>
    )
}

export default AddUser