
import { useState, useContext } from "react"
import { useEffect } from "react"
import { Carregar } from "../Elementos/funcionalidades"
import { Contexto } from "../Contextualizacao.jsx"


export default function ProdList() {

    const url = "http://www.localhost:2023/"
    const [listProd, setListProd] = useState([])
    const [listImg, setListImg] = useState([])
    const [status, setStatus] = useState("Ocioso")
    const [msgM, setMsg] = useState('')
    let contador=0;
    const { user } = useContext(Contexto)

    useEffect(() => {
        try {
            setStatus("Executando")
            fetch(url + 'Objects', { method: 'GET' }).then((resp) => {
                return resp.json().then((resposta) => {
                    setListProd(resposta)
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
        const imgfetch = async()=>{
            const promise = listProd.map(async(prod)=>{
                const resp= await fetch(`${url}imagem/${prod.cod}-prod`,{method:'GET'})
                return await resp.blob()
            })

            const urls=Promise.all(promise)
            return urls
        }
        imgfetch().then((urls=>{
            return urls.map((link)=>{
                return URL.createObjectURL(link)
            })
        })).then((url=>{
            setListImg(url)
            setStatus('ocioso')
        }))

    }, [listProd])


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
            {listProd.map((prod) => {
                contador++  
                return (
                    <div style={{ textAlign: "justify" }} key={prod.cod}>
                        <div style={{ display: "flex" }}>
                            <img src={listImg[contador-1]} alt={prod.nome}></img>
                            <div style={{ paddingLeft: '20px' }}>
                                <h2>{prod['nome']}</h2>
                                <p>{prod.desc}</p><br />
                                <br />
                            </div>
                            {user.nome !== '' ? <button style={{ height: '30px', margin: '50px' }}>algo</button> : null}

                        </div>

                        <hr></hr>

                    </div>
                )
            })}
            {user.nome !== '' ? <button>algo2</button> : null}
        </div>
    );
}