import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { toast } from 'react-toastify';

import './home.css';

export default function Home(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState();
    const navigate = useNavigate();

    const auth = getAuth();

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }    

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, [])
    
    async function handleLogin() {
        await login(email, password)
          .then((valor) => {
            toast.success("Logado com sucesso!");
            navigate(`list/${valor.user.uid}`);
            localStorage.setItem('authToken', `${valor.user.uid}`);
          })
          .catch((error) => {
            if(error.code === 'auth/user-not-found'){
                toast.error('Esse usuário não existe');
            }
            else if(error.code === 'auth/wrong-password'){
                toast.error('Email/Senha incorreto!');
            }
            else{
                toast.error('Erro ao fazer login!');
            }
          })
    }
      
    function handleNavigate(){
        navigate("register/");
    }

    return(
        <div className="container">
            <div className="container__box">
                <h1>Faça seu Login</h1>
                <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: 'calc(100% - 14px)' },
                }}
                noValidate
                autoComplete="off"
                >
                    <TextField 
                        id="outlined-basic"
                        label="E-mail"
                        variant="outlined"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }
                    />
                    
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={ (e) => setPassword(e.target.value)}
                    />

                    <div className="area-action">
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" color="success" onClick={() => handleLogin()}>
                                Acessar
                            </Button>
                            <Button variant="contained" onClick={()=> handleNavigate()}>
                                Registrar
                            </Button>
                        </Stack>
                    </div>

                </Box>
                
            </div>
        </div>
    );
}