import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const base = {
        "id":"test",
        "pwd":"1234"
    }

    const [isLogin, setIsLogin] = useState(false);
    const [isCart, setIsCart] = useState(false);
    const [user, setUser] = useState(base);
  
    return (
        <AuthContext.Provider value={{isLogin, setIsLogin, isCart, setIsCart, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}