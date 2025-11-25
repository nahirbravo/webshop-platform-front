import type { User } from "@/interfaces/user.interface";


//login , register, check status
export interface AuthResponse {
    user:  User;
    token: string;
}

