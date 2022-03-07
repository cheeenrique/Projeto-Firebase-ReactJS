import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, onSnapshot, doc, deleteDoc, where} from 'firebase/firestore';
import { getAuth, signOut } from "firebase/auth";
import AddList from '../../components/AddList';
import { toast } from 'react-toastify';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';

import db from '../../services/firebaseConnection';

import './list.css';

export default function List(){

    const { id } = useParams();
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [user, setUser] = useState([]);
    const auth = getAuth();
    const navigate = useNavigate();

    const [descricao, setDescricao]     = useState('');
    const [competencia, setCompetencia] = useState('');
    const [vencimento, setVencimento]   = useState('');
    const [valor, setValor]             = useState('');
    const [categoria, setCategoria]     = useState('');
    const [situacao, setSituacao]       = useState('');
    const [accountId, setAccountId]     = useState('');
    const [toEdit, setToEdit]           = useState('');

    useEffect(() => {

        const accountsRef = collection(db, "accounts");

        const q = query(accountsRef, where("user", "==", id))
            onSnapshot(q, (querySnapshot) => {
                setAccounts(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })
           ))
        })

        const userLogin = onSnapshot(doc(db, "users", id), (doc) => {
            setUser(doc.data().nome);
        });
    },[]);

    async function handleDelete(id){

        await deleteDoc(doc(db, 'accounts', id))
          .then(() => {
            toast.success(`Excluído com sucesso`);
          })
          .catch((error) => {
            toast.error(`Ops ocorreu algum erro ${error}`);
          })

    }

    function logout(){
        return signOut(auth);
    }

    async function handleLogout() {
        try {
            await logout();
            navigate(`/`);
        } catch {
            alert("Error!");
        }
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    return(
        <div className="container">

            <div className="container__user">
                <h4><PersonIcon /> {user}</h4>

                <Button variant="contained" size="small" color="error" onClick={() => handleLogout()} startIcon={<LogoutIcon />}>
                    Sair
                </Button>
            </div>

            <div className="container__header">
                <h1>Dados das contas</h1>
                <Button variant="contained" onClick={() => setOpenAddModal(true)} startIcon={<AddIcon />}>
                    Adicionar
                </Button>
            </div>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Descrição</StyledTableCell>
                            <StyledTableCell>Competência</StyledTableCell>
                            <StyledTableCell>Vencimento</StyledTableCell>
                            <StyledTableCell>Valor</StyledTableCell>
                            <StyledTableCell>Categoria</StyledTableCell>
                            <StyledTableCell>Situação</StyledTableCell>
                            <StyledTableCell>Opções</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* {accounts.length <= 0 &&
                    <div className='loading'>
                        <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_540,c_limit/Netflix_LoadTime.gif" />
                    </div>
                    } */}
                    {accounts.map((account) => (
                        <StyledTableRow key={account.id}>
                            <StyledTableCell component="th" scope="row">{account.data.descricao}</StyledTableCell>
                            <StyledTableCell>{account.data.competencia}</StyledTableCell>
                            <StyledTableCell>{account.data.vencimento}</StyledTableCell>
                            <StyledTableCell>R$ {account.data.valor}</StyledTableCell>
                            <StyledTableCell>{account.data.categoria}</StyledTableCell>
                            <StyledTableCell>{account.data.situacao}</StyledTableCell>
                            <StyledTableCell>
                                <Stack direction="row" spacing={2}>
                                    <IconButton
                                        onClick={() => { 
                                            setOpenEditModal(true); 
                                            setDescricao(account.data.descricao); 
                                            setCompetencia(account.data.competencia); 
                                            setVencimento(account.data.vencimento); 
                                            setValor(account.data.valor); 
                                            setCategoria(account.data.categoria); 
                                            setSituacao(account.data.situacao); 
                                            setAccountId(account.id);
                                            setToEdit(true);
                                    }}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => { handleDelete(account.id) }}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Stack>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {openAddModal &&
                <div className="background-full">
                    <AddList 
                    onClose={ () => setOpenAddModal(false) }
                    />
                </div>
            }

            {openEditModal &&
                <div className="background-full">
                    <AddList 
                    onClose={ () => setOpenEditModal(false) }
                    toEditDescricao={descricao}
                    toEditCompetencia={competencia} 
                    toEditVencimento={vencimento}
                    toEditValor={valor}
                    toEditCategoria={categoria}
                    toEditSituacao={situacao}
                    toEditId={accountId}
                    toEdit={toEdit}
                    />
                </div>
            }
            
        </div>
    );
}