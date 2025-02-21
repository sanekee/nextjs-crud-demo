import { FC } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export const Loading: FC = () => (
    <div className="flex items-top space-x-4 mt-5 w-full">
        <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-[100%]" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-4 w-[40%]" />
        </div>
    </div>
)