import React from "react";
import { Button, Form } from "react-bootstrap";
import { Carregar, } from "../Elementos/funcionalidades.jsx";
import Elem from "../Elementos/Reutilizavel.jsx";
import "../App.css"
import { Contexto } from "../Contextualizacao.jsx";
import { Navigate } from "react-router-dom";




export default class Edicao extends React.Component {

    constructor(props) {
        super(props)
        this.formData = new FormData();
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
                nomeImg:'',
                foto:'',
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

    /*toBlob = (file, tipo) => {
        console.log('função blob', file, tipo)
        const byteC = atob(file)
        const byteN = new Array(byteC.length)
        for (let i = 0; i < byteC.length; i++) {
            byteN[i] = byteC.charCodeAt(i);
        }
        const byteA = new Uint8Array(byteN)
        const blob = new Blob([byteA], { type: `image/${tipo}` })

        console.log('arquivo blob', blob)
        return blob
    }*/

    handleFiles = (event) => {

        
        const file = event.target.files[0];
        const fName = file.name
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                nomeImg:[fName]
            }
        }))
        const reader = new FileReader()

        reader.onload = (event) => {
            /*const B64 = this.toBlob(event.target.result.split(',')[1], event.target.result.match(/\/(\w+);/ig)[0]);
            console.log(B64)*/
            const B64 = event.target.result
            this.setState(prevState => ({
                values: {
                    ...prevState.values,
                    foto:[B64]
                }
            }))
        }

        reader.readAsDataURL(file)

    }


    /*adiciona itens ao tipo especifico*/
    
    //adicionar alguma mensagem que confirme o envio    
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
            console.log('resp=>', resposta.codigo)
            if (path !== 'Vagas') {
                if (path === 'funcionarios') {
                    console.log('funfa')
                    codF = resposta.codigo
                } else {
                    console.log(path)
                    codP = resposta.codigo
                }
                console.log(this.state.values['foto'])

                this.formData.append('imagem',this.state.values['foto'])
                this.formData.append('nome',this.state.values['nomeImg'])
                this.formData.append('func',codF)
                this.formData.append('prod',codP)
                fetch(`${this.state.url}imagem`, {
                    method: 'POST',body: this.formData
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
                    <form className="Formu" onSubmit={(event) => this.Add(event, this.state.estado)} encType="multipart/form-data">
                        <fieldset style={{ border: '1px solid black', borderRadius: "10px", padding: "10px", margin: "10px" }}>
                            <Elem fun="Inp" type='' name="nome" font={this.state.nome} ext="Nome" onChange={this.handleChange} />
                            <Elem fun="Inp" type='' name="desc" font={this.state.descricao} ext="desc" onChange={this.handleChange} />
                            
                            <br />
                            {this.state.estado !== "Vagas" ?
                                <input type="file" name="foto" onChange={this.handleFiles} /> : null}
                            <br /><br />
                            {this.state.estado === "Item" ?
                                <div>
                                    <Elem fun="Inp" type='' name="Item" font={this.state.Item[0]} place={this.state.Item[1]} ext="valor" onChange={this.handleChange} />
                                </div>
                                : this.state.estado === "Vagas" ?

                                    <div>
                                        <Elem fun="Inp" type='' name="Vaga"font={this.state.Vagas[0]} place={this.state.Vagas[1]} ext="salario" onChange={this.handleChange} />
                                    </div>
                                    :
                                    <div>
                                        <Elem fun="Inp" type='' name="Funcionario" font={this.state.Funcionario[0]} place={this.state.Funcionario[1]} ext="nivel" onChange={this.handleChange} />
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