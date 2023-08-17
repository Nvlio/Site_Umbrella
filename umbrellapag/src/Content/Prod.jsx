
import { useState, useContext } from "react"
import { useEffect } from "react"
import { Carregar } from "../Elementos/funcionalidades"
import { Contexto } from "../Contextualizacao.jsx"
import Edicao from "../Elementos/edição"
import "../style/Style.css"
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';



export default function ProdList() {

    const url = "http://www.localhost:2023/"
    const [visible, setVisible] = useState(false)
    const [listProd, setListProd] = useState([])
    const [listImg, setListImg] = useState([])
    const [status, setStatus] = useState("Ocioso")
    const [msgM, setMsg] = useState('')
    const [infos, setInfos] = useState([])
    let contador = 0;
    //navigate permite segurar a mudança de pagina a
    const navigate = useNavigate();
    const { user } = useContext(Contexto)
    const { item, setItem } = useContext(Contexto)

    function toBlob(file, tipo) {
        console.log('função blob', file, tipo)
        const byteC = atob(file)
        const byteN = new Array(byteC.length)
        for (let i = 0; i < byteC.length; i++) {
            byteN[i] = byteC.charCodeAt(i);
        }
        const byteA = new Uint8Array(byteN)
        const blob = new Blob([byteA], { type: `image/${tipo}` })

        console.log(blob)
        return blob
    }

    function preparar(nome, desc, id) {
        setInfos([nome, desc, id])
        setVisible(true)
    }

    //função que atualiza info
    function Atualizar(name, descr, id) {
        fetch(`${url}objects/${id}`, {
            method: 'PUT', headers: { 'content-type': "application/json" }, body: JSON.stringify({
                nome: name,
                desc: descr
            })
        }).then((msg) => {
            return msg.json()
        }).then((resposta) => {
            console.log(resposta)
        })
    }

    //função realizada antes de ir para a proxima pag (trocar depois por redux) coloquei no linkConteiner
    /*const chamada = (name, descr, id) => {
        setItem({
            nome: name,
            desc: descr
        })

        setPath(`/Produto/${id}`)
        console.log(path)

    }*/

    //testar no fim de semana
    function Apagar(id) {
        alert(id)
        setStatus("Executando")
        fetch(`${url}Objects/${id}`, { method: 'DELETE' })
        setListProd(listProd.filter(prod => prod.cod !== id))
        setStatus('Ocioso')
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
                //aqui
                console.log('agora', prod.cod)
                const resp = await fetch(`${url}imagem/${prod.cod}-prod`, { method: 'GET' })
                return await resp.json()
            })

            const urls = Promise.all(promise)
            return urls
        }
        imgfetch().then((res => {
            let urls = res.map((Link) => {
                console.log('vela', Link)
                let valor = toBlob(Link['img'], Link['type'])
                return { id: Link['id'], image: URL.createObjectURL(valor) }
            })
            console.log('aa', urls)
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
            <Edicao open={visible} info={infos} upd={Atualizar} vis={setVisible} />
            {listProd.map((prod) => {
                contador++
                console.log(listImg)
                return (


                    <div className="listagem" key={prod.cod}>
                        <div className="clicavel">
                            <LinkContainer to={`/Produto/${prod.cod}`} onClick={(event) => { event.preventDefault(); setItem({ nome: prod.nome, desc: prod.desc,img:listImg[contador - 1]['image']}); console.log(item);navigate(`/Produto/${prod.cod}`) }}><img src={listImg[contador - 1]['image']} alt={prod.nome} data-id={listImg[contador - 1]['id']} /></LinkContainer>


                            <LinkContainer to={`/Produto/${prod.cod}`} onClick={(event) => { event.preventDefault(); setItem({ nome: prod.nome, desc: prod.desc,img:listImg[contador - 1]['image'] }); navigate(`/Produto/${prod.cod}`) }}>
                                <div style={{ paddingLeft: '20px' }}>
                                    <h2>{prod['nome']}</h2>
                                    <p>{prod.desc}</p><br />
                                    <br />
                                </div>
                            </LinkContainer>


                        </div>
                        {user.nome !== '' && visible !== true ? <div><button style={{ height: '30px', margin: '50px' }} onClick={() => Apagar(prod.cod)}>apagar</button> {/*unica mudança {testar fdS}  */} <button style={{ height: '30px', margin: '50px' }} onClick={() => { preparar(prod['nome'], prod.desc, prod.cod) }}>editar</button> </div> : user.nome !== '' ? <button style={{ height: '30px', margin: '50px' }} onClick={() => Apagar(prod.cod)}>apagar</button> : null}
                        <hr />
                        <hr></hr>
                    </div>

                )
            })}
            {user.nome !== '' ? <button>algo2</button> : null}
        </div>
    );
}