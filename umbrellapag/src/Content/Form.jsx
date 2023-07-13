import React from "react";
import { Button } from "react-bootstrap";
import { Carregar, } from "../Elementos/funcionalidades.jsx";
import Elem from "../Elementos/Reutilizavel.jsx";
import "../App.css"
import { Contexto } from "../Contextualizacao.jsx";
import { Navigate } from "react-router-dom";



export class FormCad extends React.Component {



    constructor(props) {
        super(props)
        this.url = 'http://localhost:2023/contas'
        this.state = {
            Nome: ['Nome completo', 'Seu nome'],
            Email: ['Endereço de email', 'Qual o se email (exemplo@mail.com)'],
            Senha: ['Senha', 'Qual sua senha'],
            Confirma: ['Confirmação de senha', 'repita sua senha'],
            Tel: ['Numero de telefone', 'escreva seu telefone (99)99999-9999'],
            Idade: ['Sua faixa etaria', '18-20', '20-25', '25-30', '30>'],
            noti: ['Quer receber notificações', 'radio', 2, 'sim', 'nao'],
            values: { nome: '', email: '', senha: '', telefone: '', idade: '18-20', notificacao: 'option1', nivel: 4 }
        }
    }

    handleChange = (item, valor) => {
        if (item === 'nome' || item === 'email' || item === 'senha' || item === 'telefone' || item === 'idade' || item === 'notificacao') {
            this.setState(prevState => ({
                values: {
                    ...prevState.values,
                    [item]: valor
                }
            }))
        }
    }

    //testar fim de semana
    Cadastrar() {
        fetch(this.url, {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
                nome: this.state.values.nome,
                email: this.state.values.email,
                senha: this.state.values.senha,
                nivel: this.state.values.nivel,
            })
        }).catch((err => {
            alert(err)
        }))
    }

    render() {
        return (
            <div>
                <form className="Formu">
                    <fieldset style={{ border: '1px solid black', borderRadius: "10px", padding: "10px", margin: "10px" }}>
                        <Elem fun="Inp" type='' name="nome" Lista={this.state.Nome} ext="Nome" onChange={this.handleChange} />
                        <Elem fun="Inp" type='' name="email" Lista={this.state.Email} ext="Email" onChange={this.handleChange} />
                        <Elem fun="Inp" type='password' name="senha" Lista={this.state.Senha} ext="senha" onChange={this.handleChange} />
                        <Elem fun="Inp" type='password' name="confirmse" Lista={this.state.Confirma} ext="senha2" onChange={this.handleChange} />
                        <Elem fun="Inp" type='tel' name="telefone" length='15' Lista={this.state.Tel} ext="tel" onChange={this.handleChange} />
                        <div style={{ border: '1px solid black', borderRadius: "10px", padding: "10px", margin: "20px 25% 20px 25% " }}>
                            <Elem fun="Sel" name="idade" Lista={this.state.Idade} onChange={this.handleChange} />
                            <Elem fun="Check" name="not" Lista={this.state.noti} onChange={this.handleChange} />
                        </div>
                        <Elem fun="But" type='reset' cor='red' text='Resetar' />
                        <Elem fun="But" type='submit' cor='green' text='Enviar' />
                    </fieldset>
                </form>
            </div>
        )
    }

    /*Add = (event) => {
    
        event.preventDefault();
        fetch(this.url, {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
                nome: this.state.values.nome,
                email: this.state.values.email,
                senha: this.state.values.senha,
                telefone: this.state.values.telefone,
                idade: this.state.values.idade,
                notificacao: this.state.values.notificacao
            })
        }).then((resposta) => {
            return resposta.json()
        }).then((resp) => {
            alert(resp.mensagem)
            this.props.showtab(true)
        })
    }*/



}

export class FormLog extends React.Component {
    constructor(props) {
        super(props)
        this.url = 'http://localhost:2023/contas/'
        this.state = {
            Nome: ['Nome completo', 'Seu nome'],
            Senha: ['Senha', 'Qual sua senha'],
            values: { nome: 'a', email: '', senha: '', logou: 0, redirect: '/LogCad' }
        }

    }

    handleChange = (item, valor) => {
        if (item === 'nome' || item === 'email' || item === 'senha') {
            this.setState(prevState => ({
                values: {
                    ...prevState.values,
                    [item]: valor
                }
            }))
        }
    }

    Verificar = (e, setUser, user) => {
        e.preventDefault();
        console.log('chamei')
        //aqui modificar para pegar dados do banco de dados (nome,email,senha apenas esses dados)
        //testar fim de semana
        fetch(this.url + `${this.state.values.nome}-${this.state.values.senha}`, { method: 'GET' })
            .then((resp => {
                return resp.json()
            }))
            .then((resposta => {
                console.log(resposta.msg)
                if (resposta.msg === 'NotFound') {
                    this.setState(prevState=>({
                        values: {
                            ...prevState.values,
                            ['logou']:-1
                        }
                    }))

                } else {
                    setUser({ nome: this.state.values.nome })
                    this.setState(prevState => ({
                        values: {
                            ...prevState.values,
                            ['logou']: 1
                        }

                    }))
                    setTimeout(() => {
                        this.setState(prevState => ({
                            values: {
                                ...prevState.values,
                                ['redirect']: '/'
                            }
                        }))
                    }, 3000)
                }
            }))

        /* Antes da mudança estava aqui
        setUser({nome: this.state.values.nome})
        this.setState(prevState=>({
            values:{
                ...prevState.values,
                ['logou']:1
            }
            
        }))
        setTimeout(() => {
            this.setState(prevState=>({
                values:{
                    ...prevState.values,
                    ['redirect']:'/'
                }
            }))
            }, 3000)*/;


    }
    componentDidMount() {

    }

    render() {
        if (this.state.values.logou>0) {
            return (
                <div>
                    <h4>Voltando para conta principal</h4>
                    <br />
                    <Carregar />
                    <br />
                    <br />
                    <p>Aguarde</p>
                    <Navigate to={this.state.values.redirect} replace='false' />

                </div>
            )
        } else {
            return (
                <Contexto.Consumer>
                    {value => {
                        const { user, setUser } = value
                        return (
                            <div>
                                <form className="Formu" onSubmit={event => this.Verificar(event, setUser)}>
                                    <fieldset style={{ border: '1px solid black', borderRadius: "10px", padding: "10px", margin: "10px" }}>
                                        <Elem fun="Inp" type='' name="nome" Lista={this.state.Nome} ext="Nome" onChange={this.handleChange} />
                                        <Elem fun="Inp" type='password' name="senha" Lista={this.state.Senha} ext="senha" onChange={this.handleChange} />
                                        {this.state.values.logou<0?<p>Conta não encontrada confira se os dados estão corretos</p>:null}
                                        <Elem fun="But" type='submit' cor='green' text='Enviar' />
                                    </fieldset>
                                </form>
                            </div>
                        )
                    }}</Contexto.Consumer>
            )
        }
    }
}
