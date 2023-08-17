import { useState,createContext } from "react";

const Contexto = createContext()

export function GlobalContexto(props){
    const {user,setUser} = useState({
        nome  : "",
        email : "",
        senha : "",
        nivel : ""
    })

    const [item,setItem] = useState({
        nome:'',
        descrição:'',
        img:''
    })

    //SEMPRE QUE ADD novo  contexto add
    return(
        <Contexto.Provider value={{user,setUser,item,setItem}}>
            {props.children}
        </Contexto.Provider>
    )
}