import { Link } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import './header.css';

export default function Header(){
    return(
        <header>
            <div className="container__header">
                <Link className="logo" to="#"><ListAltIcon /> Login & Listas</Link>
                <div className="social">
                    <a href="https://www.instagram.com/c.heeenrique/" rel="noreferrer" target="_blank"><InstagramIcon /></a>
                    <a href="https://www.linkedin.com/in/carlos-henrique-b-da-silva-69152022b/" rel="noreferrer" target="_blank"><LinkedInIcon /></a>
                    <a href="https://www.github.com/cheeenrique" rel="noreferrer" target="_blank"><GitHubIcon /></a>
                </div>
            </div>
        </header>
    );
}