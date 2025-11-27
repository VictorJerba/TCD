import { api } from "../../../lib/axios";
import type { AuthResponse, CredentialDTO, RegisterDTO, UserResponse } from "../dtos/auth.dto";


const _ENDPOINT = '/auth';

export const AuthService = {

    async signUp(data: RegisterDTO): Promise<UserResponse[]> {
        const result = await api.post(`${_ENDPOINT}/signup`, data);
        return result.data;
    },

   

    async signIn(data: CredentialDTO): Promise<AuthResponse> {
        const result = await api.post(`${_ENDPOINT}/signin`, data);
        return result.data;
    },

};