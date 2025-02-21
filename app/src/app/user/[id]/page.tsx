"use client"

import React, { FC, useCallback, useEffect, useState } from 'react'
import { getUser as getUserApi } from '../../service/user'
import { UserContract, UserResponse } from '../../contracts/user'
import { Loading } from '@/app/components/loading'
import { useParams } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'


const ViewUser: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [user, setUser] = useState<UserContract | undefined>(undefined)

    const params = useParams<{ id: string }>()

    const getUser = useCallback(async () => {
        setIsLoading(true)
        getUserApi(params.id).then((resp: UserResponse) => {
            setUser(resp.user)
        }).catch((err) => {
            alert(err.message)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [params.id])

    useEffect(() => {
        getUser()
    }, [getUser])

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="lg:w-1/4 mx-auto my-5 p-5 shadow-md rounded-lg">
                    < div className="mt-4" >
                        <label className='block font-medium'>User Name</label>
                        <label className='block font-extrabold'>{user!.username}</label>
                    </div>
                    < div className="mt-4" >
                        <label className='block font-medium'>Email</label>
                        <label className='block font-extrabold'>{user!.email}</label>
                    </div>
                    < div className="mt-4" >
                        <label className='block font-medium'>phone</label>
                        <label className='block font-extrabold'>{user!.phone}</label>
                    </div>
                    < div className="mt-4" >
                        <Link href="/" className={buttonVariants({ variant: "outline" })}><ChevronLeft />Back</Link>
                    </div>
                </div >
            )}
        </>
    )
}

export default ViewUser