export default function Pagina (props){
    return(
        <div>
            <h1>{props.title}</h1><br/>
            <h2>{props.desc}</h2>
            <div>{props.children}</div>
        </div>
    )
} 