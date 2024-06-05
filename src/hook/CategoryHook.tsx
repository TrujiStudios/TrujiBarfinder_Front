import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { reqResApi } from '../api/reqRes';
import { Category } from '../interface/categoryInterface';


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

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success   ",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false  // esta liena 
            });
            swalWithBootstrapButtons.fire({
                title: "Seguro que desea eliminar?",
                text: "La información que elimine no podrá ser recuperada.!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, eliminar!        ",
                cancelButtonText: "No, cancelar!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire({
                        title: "¡Eliminado!",
                        text: "Su archivo ha sido eliminado.",
                        icon: "success"
                    });
                    reqResApi.delete<Category>(`/product/category/delete/${id}`, { withCredentials: true });
                    fetchCategorias();
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Your imaginary file is safe :)",
                        icon: "error"
                    });
                }
            });

            fetchCategorias();


            // await reqResApi.delete<Category>(`/product/category/delete/${id}`, { withCredentials: true });
        } catch (error) {
            console.error('Error deleting categoria:', error);
        }
    };

    const handleChangePage = (newPage: number): void => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        // setSelectedCategoria(prevCategoria => prevCategoria ? { ...prevCategoria, [name]: value } : null);
        // setSelectedCategoria(prevCategoria => prevCategoria ? { ...prevCategoria, [name]: value } : { [name]: value } as Category);
        setSelectedCategoria(prevCategoria => prevCategoria ? { ...prevCategoria, [name]: value } : { ...emptyCategoria, [name]: value });

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