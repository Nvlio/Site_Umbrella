import React from "react";
import { Button } from "react-bootstrap";
import { Carregar,path } from "../Elementos/funcionalidades.jsx";
import Elem from "../Elementos/Reutilizavel.jsx";
import "../App.css"
import { Contexto } from "../Contextualizacao.jsx";
import { Navigate } from "react-router-dom";



export default class Edicao extends React.Component {

    constructor(props){
        super(props)
        this.state={
            estado:props.estado,
            nome:"nome",
            descricao:"descricao",
            cod:"codigo",
            foto:"foto",
            salario:["salario","salario do emprego"],
            nivel:["nivel","nivel do funcionario"],
            valor:["valor","preco do produto"],
            values:{
                nome:'',
                desc:'',
                cod:'',
                foto:'',
                sal:'',
                niv:'',
                val:''
            }
        }
    }
    
    componentDidUpdate(prevProps){
        if (prevProps.estado!==this.props.estado){
            this.setState({estado:this.props.estado})
        }
    }

    handleChange = (item, valor) => {
        if (item === 'nome' || item === 'desc' || item === 'cod' || item === 'foto' || item === 'sal' || item === 'niv' || item === 'val') {
            this.setState(prevState => ({
                values: {
                    ...prevState.values,
                    [item]: valor
                }
            }))
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.estado}</h1>
            </div>
        )
}}
