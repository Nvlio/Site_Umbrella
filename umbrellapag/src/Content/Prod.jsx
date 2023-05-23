import { useState } from "react"
import { useEffect } from "react"
import Carregar from "../Elementos/Spinner.jsx"

export default function ProdList(){
    
    const url ="http://www.localhost:4004/produtos"
    const [listProd,setListProd] = useState([])
    const [status,setStatus] = useState("Ocioso")
    const [msgM,setMsg] = useState('')

    useEffect(()=>{
        try{
        setStatus("Executando")
        fetch(url,{method:'GET'}).then((resp)=>{
            return resp.json().then((resposta)=>{
                setListProd(resposta)
                setStatus("Ocioso")
            })
        }).catch((erro)=>{
            setStatus('Erro')
            setMsg(erro)
        })
    } catch(erro){
        setStatus('Erro')
        setMsg(erro)
    }},[])

    if (status==="Executando"){
        return(
        <div style={{textAlign:"center"}}>
            <Carregar></Carregar>
            <br></br>
            <h2>Carregando</h2>
        </div>)
    }
    else if(status==='Erro'){
        return (
            <div style={{textAlign:'center'}}>
                <h2>Desculpe um erro ocorreu</h2>
                <h3>{msgM}</h3>
            </div>
        )
    }
    return(
        <div>
            {listProd.map((prod)=>{
                return(
                <div style={{textAlign:"justify"}} key={prod.codprod}>
                    <h1>{prod['nome']}</h1>
                    <h2>{prod.desc}</h2>
                    <hr></hr>
                </div>
                )
            })}
        </div>
    );
}