"use client"

import { FC, useCallback } from 'react'
import { useEffect, useState } from 'react'
import { listUsers, deleteUser } from '../../service/user'
import { UserContract, UsersResponse } from '../../contracts/user'
import { ApiResponse } from '../../contracts/response'

import { getColumns } from "./columns"
import { DataTable } from './data-table'
import { useRouter } from 'next/navigation'
import { Loading } from '@/app/components/loading'
import { Pagination } from '../../contracts/metadata'


const DEFAULT_PAGE_LIMIT = 10
const ListUsers: FC = () => {
    const [users, setUsers] = useState<UserContract[]>([])
    const [pagination, setPagination] = useState<Pagination>({
        page: 0, limit: DEFAULT_PAGE_LIMIT, total: 0,
    })
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [currentLimit, setCurrentLimit] = useState<number>(DEFAULT_PAGE_LIMIT)

    const router = useRouter()

    const fetchUsers = useCallback(async (page: number, limit: number) => {
        setIsLoading(true)
        listUsers(page, limit).then((resp: UsersResponse) => {
            setUsers(resp.users)
            setPagination(resp.pagination)
        }).catch((err: ApiResponse) => {
            alert(err.message)
        }).finally(() => {
            setIsLoading(false)
        });
    }, [])

    useEffect(() => {
        fetchUsers(currentPage, currentLimit)
    }, [fetchUsers, currentPage, currentLimit])

    const handleDelete = async (userId: string) => {
        deleteUser(userId).then(() => {
            fetchUsers(currentPage, currentLimit)
        }).catch((err) => {
            alert(err.message)
        })
    }

    const handleCreate = async () => {
        router.push("/user/add")
    }

    const handlePage = (page: number, limit: number) => {
        setCurrentPage(page)
        setCurrentLimit(limit)
    }

    return (
        <>
            <div className="container px-1 lg:px-[150px] mx-auto flex justify-between items-center py-5">
                {isLoading ? (
                    <div className="h-screen w-full flex justify-content-center">
                        <Loading />
                    </div>
                ) : (
                    <>
                        <DataTable columns={getColumns({ handleDelete })} data={users} pagination={pagination} handleCreate={handleCreate} handlePage={handlePage} />
                    </>
                )}
            </div>
        </>
    );
};

export default ListUsers;