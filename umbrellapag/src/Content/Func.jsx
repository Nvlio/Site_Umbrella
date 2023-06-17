
import { useState,useContext } from "react"
import { useEffect } from "react"
import { Carregar } from "../Elementos/funcionalidades"
import {Buffer} from "buffer"
import { Contexto } from "../Contextualizacao.jsx"


export default function FunList(){
    
    const url ="http://www.localhost:2023/funcionario"
    const [listFunc,setListFunc] = useState([])
    const [status,setStatus] = useState("Ocioso")
    const [msgM,setMsg] = useState('')
    const {user} = useContext(Contexto)

    useEffect(()=>{
        try{
        setStatus("Executando")
        fetch(url,{method:'GET'}).then((resp)=>{
            return resp.json().then((resposta)=>{
                setListFunc(resposta)
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
            {listFunc.map((fun)=>{
                
                const blob = new Blob([Buffer.from(fun.fotoM)])
                const funPath=URL.createObjectURL(blob)
                return(
                <div style={{textAlign:"justify",padding:'20px 100px 0px 100px'}} key={fun.cod}>
                    <div style={{display:"flex"}}>
                    <img src={funPath} height={'150px'} alt={fun.nome}></img>
                    <div style={{paddingLeft:'20px'}}>
                    <h2>{fun['nome']}</h2>
                    <p>{fun.desc}</p><br/>
                    
                    <br/>
                    </div>
                    {/*user.nome!==''?<button style={{height:'30px',margin:'50px'}}>algo</button>:null*/}
                    
                    </div>
                    
                    <hr></hr>
                    
                </div>
                )
            })}
            {/*user.nome!==''?<button>algo2</button>:null*/}
        </div>
    );
}