import { useState } from "react"
import "../style/Style.css"
import "../style/Style.css"
import Elem from "./Reutilizavel"


//abre a tela de edição 
//trabalhar na construção do formulario
//criar a função de put de itens
//colocar no props um valor que diz que tipo é ex: funcionario,produto,vaga
export default function Edicao(props) {

    const [info,setInfo] = useState({
        nome:'',
        desc:''
    })

    function   Fecha() {
        props.vis(false)
    }

    const handleChange = (item, valor) => {
        console.log(item,valor)
        if (item === 'nome' || item === 'desc' /*|| item === 'senha'*/) {
            setInfo(prevState=>({
                values:{
                    ...prevState.values,
                    [item]:valor
                }
            }))
        }

        console.log(info)
    }

    //Atualizar agora fazer com que ele envie os dados resultantes de elem(vlw)
    function Atualiza(){
        console.log(info.values['nome'],info.values['desc'])
        props.upd(info.values['nome'],info.values['desc'],props.info[2])
        //props.vis(false)
    }

    if (props.open === true) {
        return (
            <div className="telaEdit">
                <button style={{marginLeft:'90%',marginTop:'20px'}} onClick={Fecha}>X</button>
                <h2>Atualizar informação do produto</h2>
                <form className="formula">
                    <Elem fun='Inp' type='' name='nome' font={'Nome'} place={props.info[0]} onChange={handleChange}/>
                    <Elem fun='Inp' type='' name='desc' font={'descrição'} place={props.info[1]} onChange={handleChange}/>
                    <Elem fun='Inp' type='' name='valor' font={'valor'} place={'valor do produto'} onChange={handleChange}/>
                </form>
                <button onClick={Atualiza}>Atualizar</button>
            </div>
        )
    } else {
        return null
    }


};