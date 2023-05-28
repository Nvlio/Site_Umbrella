import { useState,createContext } from "react";

export const Contexto = createContext()

export function GlobalContexto(props){
    const [user,setUser] = useState({
        nome  : "",
        email : "",
        senha : "",
    })

    return(
        <Contexto.Provider value={{user,setUser}}>
            {props.children}
        </Contexto.Provider>
    )
}

