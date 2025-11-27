import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

export function useAuth() {
    const context = useContext (AuthContext);

    if (!context) {
        throw new Error('useCart deve ser usado dentro de um CartContextProvider');
    }

    return context;
}