import { User } from "../../features/user/model/user.model"

export type AuthResponse = {
    user: User,
    token: string
}