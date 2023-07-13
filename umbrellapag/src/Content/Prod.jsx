
import { useState, useContext } from "react"
import { useEffect } from "react"
import { Carregar } from "../Elementos/funcionalidades"
import { Contexto } from "../Contextualizacao.jsx"
import toBlob from "../funções/funções"


export default function ProdList() {

    const url = "http://www.localhost:2023/"
    const [listProd, setListProd] = useState([])
    const [listImg, setListImg] = useState([])
    const [status, setStatus] = useState("Ocioso")
    const [msgM, setMsg] = useState('')
    let contador = 0;
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

    //testar no fim de semana
    function Apagar(id){
        setStatus("Executando")
        fetch(url+'objects',{method:'DELETE'}).then((resp=>{
            return resp.json()
        }))
        .then((resposta=>{
            fetch(url+`imagem/${id}-prod`,{method:'DELETE'}).then((resp=>{
                setStatus('Ocisoso')
                setMsg(resposta)
            }))
        }))
        .catch((err=>{}))
    }

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

    //segundo useEffects que ocorre qnd a lista é atualizada
    useEffect(() => {
        //função que add os itens
        const imgfetch = async () => {
            const promise = listProd.map(async (prod) => {
                console.log(prod.cod)
                const resp = await fetch(`${url}imagem/${prod.cod}-prod`, { method: 'GET' })
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

    }, [listProd])


    if (status === "Executando" || listImg.length === 0) {
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
                console.log(listImg)
                return (
                    <div style={{ textAlign: "justify" }} key={prod.cod}>
                        <div style={{ display: "flex" }}>
                            <img src={listImg[contador-1]['image']} alt={prod.nome} data-id={listImg[contador-1]['id']}/>
                            <div style={{ paddingLeft: '20px' }}>
                                <h2>{prod['nome']}</h2>
                                <p>{prod.desc}</p><br />
                                <br />
                            </div>
                            {user.nome !== '' ? <button style={{ height: '30px', margin: '50px' }} onClick={()=>Apagar(prod.cod)}>apagar</button> : null}

                        </div>

                        <hr></hr>

                    </div>
                )
            })}
            {user.nome !== '' ? <button>algo2</button> : null}
        </div>
    );
}