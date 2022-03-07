import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import List from './pages/List';
import Register from './pages/Register';
import Error from './pages/Error';
import Header from './components/Header';

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/list/:id/" element={<List/>}/>
                <Route exact path="/register/" element={<Register/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    );
}