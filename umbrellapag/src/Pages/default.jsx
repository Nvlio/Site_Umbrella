import React from "react"
import { LinkContainer } from "react-router-bootstrap";
import "../Style.css"


export default function Pagina (props){

    const children = React.Children.toArray(props.children);
    const img = children.find((child)=>{return child.type==="img"});

    if (img){

        return( 
            
            <div>
            {props.title==="" ? null:<h1>{props.title}</h1>}
            <div>{img}</div>
            <hr></hr>
            <LinkContainer to="/"><h4 className="linkurl" style={{textAlign:"center"}}>{props.desc}</h4></LinkContainer>
           

        </div>
        )
    }else{
    return(
        <div>
            <h1>{props.title}</h1><br/>
            <h4>{props.desc}</h4>
            <hr></hr>
            <div>{props.children}</div>
        </div>
    )
} };