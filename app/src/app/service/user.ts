import { ApiResponse } from "../contracts/response"
import { CreateUserContract, UpdateUserContract, UserResponse, UsersResponse } from "../contracts/user"

export const createUser = async (data: CreateUserContract): Promise<CreateUserContract | ApiResponse> => {
    return new Promise(async (resolve, reject) => {
        fetch(`/api/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(async (res) => {

            const result = await res.json()

            if (res.status < 299) {
                resolve(result)
            } else {
                reject({
                    ...result,
                    message: result.message || "Failed to create user"
                })
            }
        }).catch((err) => {
            reject({ message: "error fetching from api " + err })
        })
    })
}

export const listUsers = async (page: number, limit: number): Promise<UsersResponse> => {
    return new Promise(async (resolve, reject) => {
        const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() })

        fetch(`/api/user?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (res) => {
            const result = await res.json()

            if (res.status < 299) {
                resolve(result)
            } else {
                reject({ message: result.message || "Failed to list users" } as ApiResponse)
            }
        }).catch((err) => {
            reject({ message: "error fetching from api, err: " + err } as ApiResponse)
        })
    })
}

export const deleteUser = async (id: string): Promise<ApiResponse> => {
    return new Promise(async (resolve, reject) => {
        fetch(`/api/user/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (res) => {
            const result = await res.json()

            if (res.status < 299) {
                resolve(result)
            } else {
                reject({ message: result.message || "Failed to delete user" } as ApiResponse)
            }
        }).catch((err) => {
            reject({ message: "error fetching from api, err: " + err } as ApiResponse)
        })
    })
}

export const getUser = async (id: string): Promise<UserResponse> => {
    return new Promise(async (resolve, reject) => {
        fetch(`/api/user/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (res) => {
            const result = await res.json()

            if (res.status < 299) {
                resolve(result)
            } else {
                reject({ message: result.message || "Failed to get user" } as ApiResponse)
            }
        }).catch((err) => {
            reject({ message: "error fetching from api, err: " + err } as ApiResponse)
        })
    })
}

export const updateUser = async (id: string, data: UpdateUserContract): Promise<ApiResponse> => {
    return new Promise(async (resolve, reject) => {
        fetch(`/api/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(async (res) => {
            const result = await res.json()

            if (res.status < 299) {
                resolve(result)
            } else {
                reject({
                    ...result,
                    message: result.message || "Failed to update user"
                })
            }
        }).catch((err) => {
            reject({ message: "error fetching from api, err: " + err } as ApiResponse)
        })
    })
}