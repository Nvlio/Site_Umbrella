import React from "react";
import { Button } from "react-bootstrap";
import { Carregar, } from "../Elementos/funcionalidades.jsx";
import Elem from "../Elementos/Reutilizavel.jsx";
import "../App.css"
import { Contexto } from "../Contextualizacao.jsx";
import { Navigate } from "react-router-dom";



export default class Edicao extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            estado: props.estado,
            nome: ["nome"],
            descricao: ["descrição"],
            cod: ["codigo"],
            foto: ["foto"],
            Vagas: ["salario", "salario do emprego", "empregos"],
            Funcionario: ["nivel", "nivel do funcionario", "funcionarios"],
            Item: ["valor", "preco do produto", 'Objects'],
            url: 'http://localhost:2023/',
            values: {
                nome: '',
                desc: '',
                foto: ['', ''],
                Vagas: '',
                Funcionario: '',
                Item: ''
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.estado !== this.props.estado) {
            this.setState({ estado: this.props.estado })
        }
    }

    handleChange = (item, valor) => {

        if (item === 'nome' || item === 'desc' || item === 'cod' || item === 'foto' || item === 'Vagas' || item === 'Funcionario' || item === 'Item') {
            this.setState(prevState => ({
                values: {
                    ...prevState.values,
                    [item]: valor
                }
            }))
        }
    }

    handleFiles = (event) => {
        const file = event.target.files[0];
        const fName=file.name

        this.setState(prevState => ({
            values: {
                ...prevState.values,
                foto: [file,fName]
            }
        }))

    }


    Add(event, obj) {
        event.preventDefault()
        let codF;
        let codP;
        let path = this.state[`${obj}`][2]
        fetch(`${this.state.url}${path}`, {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
                nome: this.state.values['nome'],
                desc: this.state.values['desc'],
                dif: this.state.values[`${obj}`],
            })
        }).then((resp) => {
            return resp.json()
        }).then((resposta) => {
            console.log(resposta.codigo)
            if (path !== 'Vagas') {
                if (path === 'funcionarios') {
                    console.log('funfa')
                    codF = resposta.codigo
                } else {
                    console.log(path)
                    codP = resposta.codigo
                }
                fetch(`${this.state.url}imagem`, {
                    method: 'POST', headers: { 'Content-Type': "application/json" }, body: JSON.stringify({
                        imagem: this.state.values['foto'],
                        func: codF,
                        prod: codP,
                    })
                })
            }

        })


    }

    render() {
        if (this.props.estado === "") {
            return (<div><br></br><h4>Escolha o que vai ser adicionado</h4></div>)
        } else {
            return (
                <div>
                    <br></br>
                    <h1>{this.state.estado}</h1>
                    <form className="Formu" onSubmit={(event) => this.Add(event, this.state.estado)}>
                        <fieldset style={{ border: '1px solid black', borderRadius: "10px", padding: "10px", margin: "10px" }}>
                            <Elem fun="Inp" type='' name="nome" Lista={this.state.nome} ext="Nome" onChange={this.handleChange} />
                            <Elem fun="Inp" type='' name="desc" Lista={this.state.descricao} ext="desc" onChange={this.handleChange} />
                            <Elem fun="Inp" type='' name="cod" Lista={this.state.cod} ext="cod" onChange={this.handleChange} />
                            <br />
                            {this.state.estado !== "Vagas" ?
                                <input type="file" name="foto" onChange={this.handleFiles} /> : null}
                            <br /><br />
                            {this.state.estado === "Item" ?
                                <div>
                                    <Elem fun="Inp" type='' name="Item" Lista={this.state.Item} ext="valor" onChange={this.handleChange} />
                                </div>
                                : this.state.estado === "Vagas" ?

                                    <div>
                                        <Elem fun="Inp" type='' name="Vaga" Lista={this.state.Vagas} ext="salario" onChange={this.handleChange} />
                                    </div>
                                    :
                                    <div>
                                        <Elem fun="Inp" type='' name="Funcionario" Lista={this.state.Funcionario} ext="nivel" onChange={this.handleChange} />
                                    </div>
                            }
                            <Elem fun="But" type='reset' cor='red' text='Resetar' />
                            <Elem fun="But" type='submit' cor='green' text='Enviar' />
                        </fieldset>
                    </form>
                </div>
            )
        }
    }
}
