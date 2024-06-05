import React, { useState, useEffect } from 'react';
import { reqResApi } from '../api/reqRes';


interface Category {
    id: string;
    name: string;
    description: string;
    status: boolean;
    imagen: string;
}

const emptyCategoria: Category = {
    id: '',
    name: '',
    description: '',
    status: false,
    imagen: '',
};

const initialCategorias: Category[] = [];

export const CategoryHook = () => {

    const [categorias, setCategorias] = useState<Category[]>(initialCategorias);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedCategoria, setSelectedCategoria] = useState<Category | null>(null);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async (): Promise<void> => {
        try {
            const results = await reqResApi.get<Category[]>('/product/category/get', { withCredentials: true });
            setCategorias(results.data);
        } catch (error) {
            console.error('Error fetching categorias:', error);
        }
    };

    const handleOpenModal = (categoria: Category | null = null): void => {
        setSelectedCategoria(categoria ?? emptyCategoria);
        setEditMode(categoria !== null);
        setOpenModal(true);
    };

    const handleCloseModal = (): void => {
        setOpenModal(false);
        setSelectedCategoria(emptyCategoria);
    };

    const handleSave = async (): Promise<void> => {
        if (editMode && selectedCategoria) {
            try {
                await reqResApi.put<Category>(`/product/category/update/${selectedCategoria.id}`, selectedCategoria, { withCredentials: true });

            } catch (error) {
                console.error('Error updating categoria:', error);
            }
        } else {
            try {
                console.log("NUEVA CATEGORIA", selectedCategoria);
                await reqResApi.post<Category>('/product/category/create', selectedCategoria, { withCredentials: true });
            } catch (error) {
                console.error('Error creating categoria:', error);
            }
        }
        handleCloseModal();
        fetchCategorias();
    };

    const handleDelete = async (id: string): Promise<void> => {
        try {
            await reqResApi.delete<Category>(`/product/category/delete/${id}`, { withCredentials: true });
            fetchCategorias();
        } catch (error) {
            console.error('Error deleting categoria:', error);
        }
    };

    const handleChangePage = (event: unknown, newPage: number): void => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        // setSelectedCategoria(prevCategoria => prevCategoria ? { ...prevCategoria, [name]: value } : null);
        setSelectedCategoria(prevCategoria => prevCategoria ? { ...prevCategoria, [name]: value } : { [name]: value } as Category);

    }
    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedCategoria(prevCategoria => prevCategoria ? { ...prevCategoria, status: event.target.checked } : { status: event.target.checked } as Category);

    }

    return {
        categorias,
        openModal,
        editMode,
        selectedCategoria,
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


    }
}        