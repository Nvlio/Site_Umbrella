
import { useState,useContext } from "react"
import { useEffect } from "react"
import { Carregar } from "../Elementos/funcionalidades"
import { Contexto } from "../Contextualizacao.jsx"


export default function VagaList(){
    
    const url ="http://www.localhost:2023/empregos"
    const [listJobs,setListJobs] = useState([])
    const [status,setStatus] = useState("Ocioso")
    const [msgM,setMsg] = useState('')
    const {user} = useContext(Contexto)

    useEffect(()=>{
        try{
        setStatus("Executando")
        fetch(url,{method:'GET'}).then((resp)=>{
            return resp.json().then((resposta)=>{
                setListJobs(resposta)
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
            {listJobs.map((job)=>{
                return(
                <div style={{textAlign:"justify"}} key={job.cod}>
                    <div style={{display:"flex"}}>
                    <div style={{paddingLeft:'20px'}}>
                    <h2>{job['nome']}</h2>
                    <p>{job.desc}</p><br/>
                    <p>{job.salario}</p>
                    
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