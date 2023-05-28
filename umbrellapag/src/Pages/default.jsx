import React from "react"
import { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import "../style/Style.css"
import { Contexto } from "../Contextualizacao.jsx";


export default function Pagina(props) {
    // essa parte serve para separar o children caso dentro dele tenha uma imagem
    const children = React.Children.toArray(props.children);
    const img = children.find((child) => { return child.type === "img" });
    const {user,setUser} =useContext(Contexto)

    //ffunção que só é chamada caso a pag seja de login ou cadastro, muda o tipo da tela mudando o que sera apresentado
    function Click() {
        if (props.par === "Log") {
            props.tipo({funcao:'Cadastro',logged:0})
        }else{
            props.tipo({funcao:'Login',logged:0})
        }
    }

    //se tiver img no meio do children ele chama esse caminho, onde coloca a img acima do children
    if (img) {

        return (

            <div>
                {props.title === "" ? null : <h1>{props.title}</h1>}
                <div>{img}</div>
                <hr></hr>
                <LinkContainer to="/"><h4 className={props.class} style={{ textAlign: "center" }}>{props.desc}</h4></LinkContainer>



            </div>
        )
    } 
    //se não for ele chama esse parametro de pagina
    else {
        return (
            <div>
                <h1>{props.title}</h1><br />
                <h4>{props.desc}</h4>
                <hr></hr>
                <div>{props.children}</div>
                {props.par === undefined ? null: user.nome!=="" ? null :props.par==="Log" ? <p>Não tem conta? <button className="Camu" onClick={Click}>Cadastre-se</button></p>:<p>Ja possui uma conta? <button className="Camu" onClick={Click}>Logue </button></p>}

            </div>
        )
    }
};