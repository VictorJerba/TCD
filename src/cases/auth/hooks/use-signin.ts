import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";
import { useAuth } from "./use-auth";

export function useSignIn (){
    const {signIn } = useAuth();

    return useMutation({
        mutationFn: AuthService.signIn,
        onSuccess: (data) => signIn(data)
    })
}