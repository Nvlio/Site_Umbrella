
import { useState, useContext } from "react"
import { useEffect } from "react"
import { Carregar } from "../Elementos/funcionalidades"
import { Buffer } from "buffer"
import { Contexto } from "../Contextualizacao.jsx"


export default function FunList() {

    const url = "http://www.localhost:2023/"
    const [listFunc, setListFunc] = useState([])
    const [listImg, setListImg] = useState([])
    const [status, setStatus] = useState("Ocioso")
    const [msgM, setMsg] = useState('')
    let contador=0; 
    const { user } = useContext(Contexto)

    function toBlob(file,tipo){
        console.log('função blob',file,tipo)
        const byteC = atob(file)
        const byteN = new Array(byteC.length)
        for (let i=0;i<byteC.length;i++){
            byteN[i]=byteC.charCodeAt(i);
        }
        const byteA= new Uint8Array(byteN)
        const blob = new Blob([byteA],{type:`image/${tipo}`})
        
        console.log(blob)
        return blob
    }

    useEffect(() => {
        try {
            setStatus("Executando")
            fetch(url + 'funcionarios', { method: 'GET' }).then((resp) => {
                return resp.json().then((resposta) => {
                    setListFunc(resposta)
                })
            }).catch((erro) => {
                setStatus('Erro')
                setMsg(erro)
            })
        } catch (erro) {
            setStatus('Erro')
            setMsg(erro)
        }
    }, [])

    useEffect(() => {
        //função que add os itens
        const imgfetch = async () => {
            const promise = listFunc.map(async (fun) => {
                console.log(fun.cod)
                const resp = await fetch(`${url}imagem/${fun.cod}-func`, { method: 'GET' })
                return await resp.json()
            })

            const urls = Promise.all(promise)
            return urls
        }
        imgfetch().then((res => {
            let urls = res.map((Link) => {
                
            let valor = toBlob(Link['img'],Link['type'])
                return { id: Link['id'], image: URL.createObjectURL(valor)}
            })
            console.log('aa',urls)
            setListImg(urls)
            setStatus('ocioso')
        }))
        /*.then(())
        .then(())*/




    }, [listFunc])

    if (status === "Executando"  || listImg.length === 0) {
        return (
            <div style={{ textAlign: "center" }}>
                <Carregar></Carregar>
                <br></br>
                <h2>Carregando</h2>
            </div>)
    }
    else if (status === 'Erro') {
        return (
            <div style={{ textAlign: 'center' }}>
                <h2>Desculpe um erro ocorreu</h2>
                <h3>{msgM}</h3>
            </div>
        )
    }
    return (
        <div>
            {listFunc.map((fun) => {
                contador++
                return (
                    <div style={{ textAlign: "justify", padding: '20px 100px 0px 100px' }} key={fun.cod}>

                        <div style={{ display: "flex" }}>
                            <img src={listImg[contador-1]['image']} alt={fun.nome} data-id={listImg[contador-1]['id']}></img>
                            <div style={{ paddingLeft: '20px' }}>
                                <h2>{fun['nome']}</h2>
                                <p>{fun.desc}</p><br />
                                <br />
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