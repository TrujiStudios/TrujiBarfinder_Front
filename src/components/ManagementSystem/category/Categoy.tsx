import React, { useState, useEffect } from 'react';
import {
    Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

interface Categoria {
    _id: string;
    name: string;
    description: string;
    status: boolean;
    imagen: string;
}

const initialCategorias: Categoria[] = [];

const TablaCategorias: React.FC = () => {
    const [categorias, setCategorias] = useState<Categoria[]>(initialCategorias);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async (): Promise<void> => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/product/category/get', { withCredentials: true });
            setCategorias(response.data);
            console.log("Data", response.data);
        } catch (error) {
            console.error('Error fetching categorias:', error);
        }
    };

    const handleOpenModal = (categoria: Categoria | null = null): void => {
        setSelectedCategoria(categoria);
        setEditMode(categoria !== null);
        setOpenModal(true);
    };

    const handleCloseModal = (): void => {
        setOpenModal(false);
        setSelectedCategoria(null);
    };

    const handleSave = async (): Promise<void> => {
        if (editMode && selectedCategoria) {
            try {
                await axios.put(`http://localhost:5000/api/v1/product/category/update/${selectedCategoria._id}`, selectedCategoria);
            } catch (error) {
                console.error('Error updating categoria:', error);
            }
        } else {
            try {
                await axios.post('http://localhost:5000/api/v1/product/category/create', selectedCategoria);
            } catch (error) {
                console.error('Error creating categoria:', error);
            }
        }
        handleCloseModal();
        fetchCategorias();
    };

    const handleDelete = async (id: string): Promise<void> => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/product/category/delete/${id}`);
            fetchCategorias();
        } catch (error) {
            console.error('Error deleting categoria:', error);
        }
    };

    const handleChangePage = (event: unknown, newPage: number): void => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setSelectedCategoria(prevCategoria => prevCategoria ? { ...prevCategoria, [name]: value } : null);
    };

    console.log("Categorias <>", categorias);

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField label="Buscar:" variant="outlined" size="small" />
                <Button variant="contained" color="secondary" onClick={() => handleOpenModal()}>Nueva</Button>
            </Box>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categorias.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((categoria) => (
                                <TableRow key={categoria._id}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <img src={categoria.imagen} alt={categoria.name} style={{ width: 50, height: 50, marginRight: 16 }} />
                                            <Typography>{categoria.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{categoria.description}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="success" size="small">{categoria.status ? 'Activo' : 'Innactivo'}</Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" onClick={() => handleOpenModal(categoria)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(categoria._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={categorias.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>{editMode ? 'Editar Categoría' : 'Nueva Categoría'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre"
                        name="nombre"
                        fullWidth
                        defaultValue={selectedCategoria?.name || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        name="descripcion"
                        fullWidth
                        defaultValue={selectedCategoria?.description || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Estado"
                        name="estado"
                        fullWidth
                        defaultValue={selectedCategoria?.status || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="URL de la Imagen"
                        name="imagen"
                        fullWidth
                        defaultValue={selectedCategoria?.imagen || ''}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">Cancelar</Button>
                    <Button onClick={handleSave} color="primary">{editMode ? 'Guardar Cambios' : 'Crear'}</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TablaCategorias;
