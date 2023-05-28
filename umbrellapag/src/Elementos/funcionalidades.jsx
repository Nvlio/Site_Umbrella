import { Spinner } from "react-bootstrap";
import { createBrowserHistory } from "history";

export function Carregar(){
    return(
        <div>
            <Spinner/>
        </div>
    )
}

export const path = createBrowserHistory()
    
