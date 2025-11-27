import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";

export function useSignUp (){

    return useMutation({
        mutationFn: AuthService.signUp
    })
}