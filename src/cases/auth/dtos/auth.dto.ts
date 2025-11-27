export interface CredentialDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
}

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    supabaseId: string;
}

export interface AuthResponse {
    accessToken: string;
    user: UserResponse;
}