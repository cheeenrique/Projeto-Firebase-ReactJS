import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {collection, addDoc, Timestamp, doc, updateDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
//import NumberFormat from 'react-number-format';

import db from '../../services/firebaseConnection';

import './addList.css';

export default function AddList({ onClose, toEditDescricao, toEditCompetencia, toEditVencimento, toEditValor, toEditCategoria, toEditSituacao, toEditId, toEdit }){

    const { id } = useParams();
    const [descricao, setDescricao]     = useState(toEditDescricao);
    const [competencia, setCompetencia] = useState(toEditCompetencia);
    const [vencimento, setVencimento]   = useState(toEditVencimento);
    const [valor, setValor]             = useState(toEditValor);
    const [categoria, setCategoria]     = useState(toEditCategoria);
    const [situacao, setSituacao]       = useState(toEditSituacao);
    const idEdit                        = toEditId;
    const edit                          = toEdit;

    async function handleAdd(){
        await addDoc(collection(db, 'accounts'), {
            descricao: descricao,
            competencia: competencia,
            vencimento: vencimento,
            valor: valor,
            categoria: categoria,
            situacao: situacao,
            user: id,
            created: Timestamp.now()
          })
          .then(() => {
            toast.success(`Dados cadastrados com sucesso`);
            onClose();
          })
          .catch((error) => {
            toast.error(`Ops ocorreu algum erro ${error}`);
          })
      }

      async function handleUpdate(id){
        await updateDoc(doc(db, 'accounts', id), {
            descricao: descricao,
            competencia: competencia,
            vencimento: vencimento,
            valor: valor,
            categoria: categoria,
            situacao: situacao,
            actualization: new Date()
          })
          .then(() => {
            toast.success(`Dados atualizados com sucesso`);
            onClose();
          })
          .catch((error) => {
            toast.error(`Ops ocorreu algum erro ${error}`);
          })
      }

    return(
        <div className="modal-container">

            <div className="modal-header">
                <h2 className="title">
                {!edit &&
                    <span>Adicionar conta</span>
                }

                {edit &&
                    <span>Editar conta</span>
                }
                </h2>

                <button onClick={onClose}>
                    <CloseIcon size={28} color="#000" />
                </button>
            </div>

            <div className="area-input">

            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
            >
                <TextField 
                    id="outlined-basic"
                    label="Descrição"
                    variant="outlined"
                    value={descricao}
                    onChange={ (e) => setDescricao(e.target.value) }
                />
                
                <TextField 
                    id="outlined-basic"
                    label="Competência"
                    variant="outlined"
                    value={competencia}
                    onChange={ (e) => setCompetencia(e.target.value) }
                />
                <TextField
                    id="outlined-basic"
                    label="Vencimento"
                    variant="outlined"
                    value={vencimento}
                    onChange={ (e) => setVencimento(e.target.value) }
                />
                <TextField 
                    id="outlined-basic"
                    label="Valor"
                    variant="outlined"
                    value={valor}
                    onChange={ (e) => setValor(e.target.value) }
                />
                <TextField 
                    id="outlined-basic"
                    label="Categoria"
                    variant="outlined"
                    value={categoria}
                    onChange={ (e) => setCategoria(e.target.value) }
                />
                <TextField 
                    id="outlined-basic"
                    label="Situação"
                    variant="outlined"
                    value={situacao}
                    onChange={ (e) => setSituacao(e.target.value) }
                />
            </Box>
            </div>

            <div className="area-action">
                {!edit &&
                <Button variant="contained" onClick={() => handleAdd()} startIcon={<AddIcon />}>
                    Adicionar
                </Button>
                }

                {edit &&
                <Button variant="contained" onClick={() => handleUpdate(idEdit)} startIcon={<EditIcon />}>
                    Editar
                </Button>
                }
            </div>

        </div>
    );
}