import React, { useState, useEffect } from 'react';
import { reqResApi } from '../api/reqRes';



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

export const ProductHook = () => {

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
            // const response = await axios.get('http://localhost:5000/api/v1/product/get', { withCredentials: true });
            const response = await reqResApi.get('/product/get', { withCredentials: true });
            setProductos(response.data);
        } catch (error) {
            console.error('Error fetching productos:', error);
        }
    };

    const fetchCategorias = async (): Promise<void> => {
        try {
            // const response = await axios.get('http://localhost:5000/api/v1/product/category/get', { withCredentials: true });
            const response = await reqResApi.get('/product/category/get', { withCredentials: true });
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
                    // await axios.put(`http://localhost:5000/api/v1/product/update/${selectedProducto._id}`, productoToSend, { withCredentials: true });
                    await reqResApi.put(`/product/update/${selectedProducto._id}`, productoToSend, { withCredentials: true });
                }


            } catch (error) {
                console.error('Error updating producto:', error);
            }
        } else {
            try {
                console.log("NUEVO PRODUCTO", selectedProducto);
                // await axios.post('http://localhost:5000/api/v1/product/create', selectedProducto, { withCredentials: true });
                await reqResApi.post('/product/create', selectedProducto, { withCredentials: true });
            } catch (error) {
                console.error('Error creating producto:', error);
            }
        }
        handleCloseModal();
        fetchProductos();
    };

    const handleDelete = async (id: string): Promise<void> => {
        try {
            // await axios.delete(`http://localhost:5000/api/v1/product/delete/${id}`, { withCredentials: true });
            await reqResApi.delete(`/product/delete/${id}`, { withCredentials: true });
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

    return {
        productos,
        categorias,
        openModal,
        editMode,
        selectedProducto,
        page,
        rowsPerPage,
        handleOpenModal,
        handleCloseModal,
        handleSave,
        handleDelete,
        handleChangePage,
        handleChangeRowsPerPage,
        handleInputChange,
        handleStatusChange
    };

}
