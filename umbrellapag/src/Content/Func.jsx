
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
        const imgfetch = async () => {
            const promise = listFunc.map(async (fun) => {
                let resp = await fetch(`${url}imagem/${fun.cod}-func`, { method: 'GET' })
                return await resp.blob()
            })
            const listUrl = await Promise.all(promise)
            return listUrl

        }
        imgfetch().then((urls => {
            return urls.map((url) => {
                return URL.createObjectURL(url)
            })
        })).then((url => {
            setListImg(url)
            setStatus('ocioso')
        }))





    }, [listFunc])

    if (status === "Executando") {
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
                            <img src={listImg[contador-1]}></img>
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