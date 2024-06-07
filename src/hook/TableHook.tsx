import React, { useState, useEffect } from "react";
import axios from "axios";
const DEFAULT_IMAGE_URL =
    "https://restobar.loggro.com/assets/images/pirpos/pirpos_table_dnd.png";

interface Mesa {
    id: string;
    name: string;
    description: string;
    status: boolean;
    image: string;
}

export const TableHook = () => {
    const [mesas, setMesas] = useState<Mesa[]>([]);
    const [message, setMessage] = useState<Mesa[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null);
    const [formValues, setFormValues] = useState({
        name: "",
        description: "",
        status: true,
        image: DEFAULT_IMAGE_URL
    });

    // Función para obtener las mesas
    const fetchMesas = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/v1/tables/all",
                {
                    withCredentials: true
                }
            );
            setMesas(response.data.data);
            setMessage(response.data.message);
        } catch (error) {
            console.error("Error fetching mesas", error);
        }
    };

    const createMesa = async () => {
        try {
            // Asegurarse de que formValues incluya la imagen por defecto si no se ha especificado otra
            const mesaData = {
                ...formValues,
                image: formValues.image || DEFAULT_IMAGE_URL
            };

            await axios.post("http://localhost:5000/api/v1/tables/create", mesaData, {
                withCredentials: true
            });
            fetchMesas();
            setShowModal(false);
        } catch (error) {
            console.error("Error creating mesa", error);
        }
    };

    // Función para manejar la edición de una mesa
    const updateMesa = async () => {
        if (selectedMesa) {
            try {
                await axios.put(
                    `http://localhost:5000/api/v1/tables/update/${selectedMesa.id}`,
                    formValues,
                    {
                        withCredentials: true
                    }
                );
                fetchMesas();
                setShowModal(false);
            } catch (error) {
                console.error("Error updating mesa", error);
            }
        }
    };

    // Función para manejar la eliminación de una mesa
    const deleteMesa = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/tables/delete/${id}`, {
                withCredentials: true
            });
            fetchMesas();
        } catch (error) {
            console.error("Error deleting mesa", error);
        }
    };

    // Función para manejar la apertura del modal
    const handleOpenModal = (mesa: Mesa | null = null) => {
        if (mesa) {
            setSelectedMesa(mesa);
            setFormValues({
                name: mesa.name,
                description: mesa.description,
                status: mesa.status,
                image: mesa.image
            });
            setIsEditing(true);
        } else {
            setSelectedMesa(null);
            setFormValues({
                name: "",
                description: "",
                status: true,
                image: DEFAULT_IMAGE_URL
            });
            setIsEditing(false);
        }
        setShowModal(true);
    };

    // Función para manejar el cambio en los valores del formulario
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : false;
        setFormValues({
            ...formValues,
            [name]: type === "checkbox" ? checked : value
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            updateMesa();
        } else {
            createMesa();
        }
    };

    useEffect(() => {
        fetchMesas();
    }, []);

    // Paginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return {
        mesas,
        message,
        showModal,
        isEditing,
        selectedMesa,
        formValues,
        handleOpenModal,
        handleInputChange,
        handleSubmit,
        deleteMesa,
        handleChangePage,
        handleChangeRowsPerPage,
        page,
        rowsPerPage,
        setShowModal,
        setSelectedMesa
    };
};
