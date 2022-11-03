import { createContext, ReactNode } from "react";

interface UserProps{
    name: string,
    avatarUrl: string
}

export interface AuthContextDataProps{
    user: UserProps,
    signIn: () =>Promise<void>
}

interface AuthProviderProps{
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({children}:AuthProviderProps){
    async function signIn(){
        console.log("Login")
    }

    return(
        <AuthContext.Provider value={{
            signIn,
            user:{
                name:"Igor",
                avatarUrl: "https://github.com/Igor212.png"
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}