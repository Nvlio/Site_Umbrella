import { useState,createContext } from "react";

export const Contexto = createContext()

export function GlobalContexto(props){
    const [user,setUser] = useState({
        nome  : "",
        email : "",
        senha : "",
    })

    const [item,setItem] = useState({
        nome:'',
        descrição:'',
        img:''
    })


    return(
        <Contexto.Provider value={{user,setUser,item,setItem}}>
            {props.children}
        </Contexto.Provider>
    )
}

