
import { useState,useContext } from "react"
import { useEffect } from "react"
import { Carregar } from "../Elementos/funcionalidades"
import {Buffer} from "buffer"
import { Contexto } from "../Contextualizacao.jsx"


export default function ProdList(){
    
    const url ="http://www.localhost:4004/produtos"
    const [listProd,setListProd] = useState([])
    const [status,setStatus] = useState("Ocioso")
    const [msgM,setMsg] = useState('')
    const {user,setUser} = useContext(Contexto)

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
                
                const blob = new Blob([Buffer.from(prod.fotoM)])
                const prodPath=URL.createObjectURL(blob)
                return(
                <div style={{textAlign:"justify"}} key={prod.codprod}>
                    <div style={{display:"flex"}}>
                    <img src={prodPath} height={'150px'}></img>
                    <div style={{paddingLeft:'20px'}}>
                    <h2>{prod['nome']}</h2>
                    <p>{prod.desc}</p><br/>
                    
                    <br/>
                    </div>
                    {user.nome!==''?<button style={{height:'30px',margin:'50px'}}>algo</button>:null}
                    
                    </div>
                    
                    <hr></hr>
                    
                </div>
                )
            })}
            {user.nome!==''?<button>algo2</button>:null}
        </div>
    );
}