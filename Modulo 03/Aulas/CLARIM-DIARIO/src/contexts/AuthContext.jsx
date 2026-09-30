import { Children, createContext, useContext, useState } from "react";
import { login as loginNaApi } from '../services/auth'

const AuthContext = createContext(null);

export function AuthProvider ({ children }) {
    const [ usuario, setUsuario] = useState(() => {
        const salvo = localStorage.getItem('usuario')
        return salvo ? JSON.parse(salvo) : null
    })

    async function login(email, senha) {
        const dados = await loginNaApi(email, senha)

        localStorage.setItem('token', dados.token)
        localStorage.setItem('usuario', JSON.stringify({
            nome: dados.nome,
            papel: dados.papel
        }))

        setUsuario({nome: dados.nome, papel: dados.papel})
    }

    function logout() {
        setUsuario(null)
        localStorage.removeItem('usuario')
    }

    return (
        <AuthContext.Provider value= {{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const contexto = useContext(AuthContext)
    if(!contexto) {
        throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
    }
    
    return contexto
}