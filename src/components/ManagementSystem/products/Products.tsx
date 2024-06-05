// import React, { useState, useEffect } from 'react';
import {
    Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TablePagination, Select, MenuItem,
    FormControlLabel,
    Switch
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductHook } from '../../../hook/ProductHook';
// import { ProductHook } from '../../../hook/ProductHook';


const Products: React.FC = () => {
    const { productos, categorias, handleOpenModal, handleCloseModal, handleSave, handleDelete, handleChangePage, handleChangeRowsPerPage, handleInputChange, handleStatusChange, selectedProducto, openModal, editMode, page, rowsPerPage } = ProductHook();


    return (
        <Container>
            <h2>Productos</h2>

            <Box mt={10} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField label="Buscar:" variant="outlined" size="small" />
                <Button variant="contained" color="secondary" onClick={() => handleOpenModal()}>Nuevo</Button>
            </Box>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Categoría</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((producto) => (
                                <TableRow key={producto._id}>
                                    <TableCell>{producto.name}</TableCell>
                                    <TableCell>{producto.description}</TableCell>
                                    <TableCell>{producto.price}</TableCell>
                                    <TableCell>{producto.category[1]}</TableCell>
                                    {/* <TableCell>{categorias.find(categoria => categoria._id === producto.category)?.name || 'N/A'}</TableCell> */}
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color={producto.status ? 'success' : 'error'}
                                            size="small"
                                        >
                                            {producto.status ? 'Activo' : 'Inactivo'}
                                        </Button>
                                        {/* <Button variant="contained" color="success" size="small">{producto.status ? 'Activo' : 'Inactivo'}</Button> */}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" onClick={() => handleOpenModal(producto)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(producto._id)}>
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
                    count={productos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>{editMode ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre"
                        name="name"
                        fullWidth
                        defaultValue={selectedProducto?.name || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        name="description"
                        fullWidth
                        defaultValue={selectedProducto?.description || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Precio"
                        name="price"
                        type="number"
                        fullWidth
                        defaultValue={selectedProducto?.price || ''}
                        onChange={handleInputChange}
                    />
                    <Select
                        label="Categoría"
                        name="category"
                        fullWidth
                        value={selectedProducto?.category[0]}
                        onChange={handleInputChange}
                    >
                        {categorias.map(categoria => (
                            <MenuItem key={categoria.id} value={categoria.id}>{categoria.name}</MenuItem>
                        ))}
                    </Select>
                    <TextField
                        margin="dense"
                        label="URL de la Imagen"
                        name="image"
                        fullWidth
                        defaultValue={selectedProducto?.image || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Código"
                        name="code"
                        fullWidth
                        defaultValue={selectedProducto?.code || ''}
                        onChange={handleInputChange}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={selectedProducto?.status || false}
                                onChange={handleStatusChange}
                                name="status"
                            />
                        }
                        label="Estado"
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

export default Products;
