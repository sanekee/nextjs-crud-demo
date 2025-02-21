"use client"

import { ColumnDef, RowData } from "@tanstack/react-table"
import { UserContract } from "../../contracts/user"
import {
    MoreHorizontal,
    HashIcon,
    PhoneIcon,
    PencilIcon,
    XSquareIcon,
    SearchIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

import { ArrowUp } from 'lucide-react'

interface ColumnAction {
    handleDelete: (id: string) => void
}

declare module "@tanstack/table-core" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        className?: string;
    }
}

export const getColumns = ({ handleDelete }: ColumnAction): ColumnDef<UserContract>[] => [
    {
        accessorKey: "id",
        header: "ID",
        meta: { className: "hidden md:table-cell" },
    },
    {
        accessorKey: "username",
        meta: { className: "md:w-1/4 w-1/2" },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Username
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const user = row.original;
            return <Link href={`/user/${user.id}`}>{user.username}</Link>;
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        meta: { className: "md:w-1/4 w-1/2" },
    },
    {
        accessorKey: "phone",
        header: "Phone",
        meta: { className: "hidden md:table-cell" },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="md:hidden flex items-center gap-3"><HashIcon />{row.original.id}</DropdownMenuItem>
                        <DropdownMenuItem className="md:hidden flex items-center gap-3"><PhoneIcon />{row.original.phone}</DropdownMenuItem>
                        <DropdownMenuSeparator className="md:hidden" />
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={`/user/${user.id}`} className="flex items-center gap-3">
                                <SearchIcon className="w-5 h-5" />View
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/user/${user.id}/edit`} className="flex items-center gap-3">
                                <PencilIcon className="w-5 h-5" />Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 flex items-center gap-3">
                            <Link href="#" className="flex items-center gap-3" onClick={() => handleDelete(user.id)}>
                                <XSquareIcon className="w-5 h-5" />Delete
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        meta: { className: "md:w-1/4 w-full text-end" },
    },
]
