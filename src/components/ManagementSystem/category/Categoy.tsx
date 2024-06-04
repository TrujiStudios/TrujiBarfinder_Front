import React, { useState } from 'react';
import {
    Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Categoria {
    nombre: string;
    descripcion: string;
    estado: string;
    imagen: string;
}

const initialCategorias: Categoria[] = [
    { nombre: 'Hamburguesas', descripcion: '', estado: 'Activa', imagen: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png' },
    { nombre: 'Hot Dogs', descripcion: '', estado: 'Activa', imagen: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png' },
    { nombre: 'Pizzas', descripcion: '', estado: 'Activa', imagen: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png' },
    { nombre: 'Pizzas', descripcion: '', estado: 'Activa', imagen: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png' },
    { nombre: 'Pizzas', descripcion: '', estado: 'Activa', imagen: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png' },
    { nombre: 'Pizzas', descripcion: '', estado: 'Activa', imagen: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png' },
    { nombre: 'Pizzas', descripcion: '', estado: 'Activa', imagen: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png' },
    { nombre: 'Pizzas', descripcion: '', estado: 'Activa', imagen: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png' },
    { nombre: 'Pizzas', descripcion: '', estado: 'Activa', imagen: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png' }
];

const TablaCategorias: React.FC = () => {
    const [categorias, setCategorias] = useState<Categoria[]>(initialCategorias);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const handleOpenModal = (categoria: Categoria | null = null): void => {
        setSelectedCategoria(categoria);
        setEditMode(categoria !== null);
        setOpenModal(true);
    };

    const handleCloseModal = (): void => {
        setOpenModal(false);
        setSelectedCategoria(null);
    };

    const handleSave = (): void => {
        // Aquí iría la lógica para guardar o actualizar la categoría
        handleCloseModal();
    };

    const handleChangePage = (event: unknown, newPage: number): void => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container fixed >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={7}>
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
                            {categorias.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((categoria, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <img src={categoria.imagen} alt={categoria.nombre} style={{ width: 50, height: 50, marginRight: 16 }} />
                                            <Typography>{categoria.nombre}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{categoria.descripcion}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="success" size="small">{categoria.estado}</Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" onClick={() => handleOpenModal(categoria)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error">
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
                        fullWidth
                        defaultValue={selectedCategoria?.nombre || ''}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        fullWidth
                        defaultValue={selectedCategoria?.descripcion || ''}
                    />
                    <TextField
                        margin="dense"
                        label="Estado"
                        fullWidth
                        defaultValue={selectedCategoria?.estado || ''}
                    />
                    <TextField
                        margin="dense"
                        label="URL de la Imagen"
                        fullWidth
                        defaultValue={selectedCategoria?.imagen || ''}
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
