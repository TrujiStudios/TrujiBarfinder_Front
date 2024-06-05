import React, { useState, useEffect } from 'react';
import {
    Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TablePagination, Select, MenuItem,
    FormControlLabel,
    Switch
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

interface Categoria {
    id: string;
    name: string;
}

interface Producto {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    status: boolean;
    image: string;
    code: string;
}

const emptyProducto: Producto = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    category: '',
    status: false,
    image: '',
    code: '',
};

const initialProductos: Producto[] = [];
const initialCategorias: Categoria[] = [];

const Products: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>(initialProductos);
    const [categorias, setCategorias] = useState<Categoria[]>(initialCategorias);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    useEffect(() => {
        fetchProductos();
        fetchCategorias();
    }, []);

    const fetchProductos = async (): Promise<void> => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/product/get', { withCredentials: true });
            setProductos(response.data);
        } catch (error) {
            console.error('Error fetching productos:', error);
        }
    };

    const fetchCategorias = async (): Promise<void> => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/product/category/get', { withCredentials: true });
            setCategorias(response.data);
        } catch (error) {
            console.error('Error fetching categorias:', error);
        }
    };


    const handleOpenModal = (producto: Producto | null = null): void => {
        setSelectedProducto(producto || emptyProducto);
        setEditMode(producto !== null);
        setOpenModal(true);
    };

    const handleCloseModal = (): void => {
        setOpenModal(false);
        setSelectedProducto(null);
    };

    const handleSave = async (): Promise<void> => {
        if (editMode && selectedProducto) {
            try {

                if (selectedProducto) {
                    const productoToSend = {
                        ...selectedProducto,
                        category: selectedProducto.category[0]
                    };
                    await axios.put(`http://localhost:5000/api/v1/product/update/${selectedProducto._id}`, productoToSend, { withCredentials: true });
                }


            } catch (error) {
                console.error('Error updating producto:', error);
            }
        } else {
            try {
                console.log("NUEVO PRODUCTO", selectedProducto);
                await axios.post('http://localhost:5000/api/v1/product/create', selectedProducto, { withCredentials: true });
            } catch (error) {
                console.error('Error creating producto:', error);
            }
        }
        handleCloseModal();
        fetchProductos();
    };

    const handleDelete = async (id: string): Promise<void> => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/product/delete/${id}`, { withCredentials: true });
            fetchProductos();
        } catch (error) {
            console.error('Error deleting producto:', error);
        }
    };

    const handleChangePage = (newPage: number): void => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string; value: unknown }>): void => {
        const { name, value } = event.target;
        // setSelectedProducto(prevProducto => prevProducto ? { ...prevProducto, [name as string]: value } : null);
        setSelectedProducto(prevProducto => prevProducto ? { ...prevProducto, [name as string]: value } : null);
        // setSelectedProducto(prevProducto => prevProducto ? { ...prevProducto, [name as string]: { ...emptyProducto, [name]: value } } : null);
        // setSelectedProducto(prevProducto => prevProducto ? { ...prevProducto, [name as string]: value } : null);
    };

    // console.log('productos:', producto.category);

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedProducto(prevProducto => prevProducto ? { ...prevProducto, status: event.target.checked } : { status: event.target.checked } as Producto);
        // setSelectedCategoria(prevCategoria => prevCategoria ? { ...prevCategoria, status: event.target.checked } : { status: event.target.checked } as Category);

    }

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
