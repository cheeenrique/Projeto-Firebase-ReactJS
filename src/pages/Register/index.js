import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import Stack from '@mui/material/Stack';

import { setDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from '../../services/firebaseConnection';

import './register.css';

export default function Register(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();

    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }

    async function handleSignup() {
        
        await signup(email, password)
        .then( async (value)=>{

            const userId = value.user.uid;

            await setDoc(doc(db, "users", userId),{
            nome: nome,
            email: email,
            status: true
            })
            .then(() => {
                toast.success('Usuário cadastrado com sucesso!');
                setNome('');
                setEmail('');
                setPassword('');
            })
            .catch((error)=>{
                console.log(error);
            })

        })
        .catch((error)=>{
            if(error.code === 'auth/email-already-in-use'){
                toast.warning('O e-mail já está cadastrado!');
            }
            else if(error.code === 'auth/weak-password'){
                toast.warning('Digite ao menos 6 caracters em sua senha!');
            }
            else{
                toast.error('Erro ao cadastrar usuário!');
            }
        })
    }

    const navigate = useNavigate();
      
    function handleNavigate(){
        navigate("/");
    }

    return(
        <div className="container">
            <div className="container__box">
                <h1>Faça seu registro</h1>
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
                        label="Nome"
                        variant="outlined"
                        value={nome}
                        onChange={ (e) => setNome(e.target.value) }
                    />
                    
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
                            value={password}
                            onChange={ (e) => setPassword(e.target.value)}
                    />
                    
                </Box>
                <div className="area-action">
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" color="success" onClick={() => handleSignup()}>
                            Registrar
                        </Button>
                        <Button variant="contained" onClick={()=> handleNavigate()}>
                            Voltar
                        </Button>
                    </Stack>
                </div>
            </div>
        </div>
    );
}