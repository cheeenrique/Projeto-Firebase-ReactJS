import { Link } from 'react-router-dom';

import './header.css';

export default function Header(){
    return(
        <header>
            <Link className="logo" to="#">Apresentação de Projeto</Link>
        </header>
    );
}