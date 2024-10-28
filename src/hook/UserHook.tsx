import React, { useState, useEffect } from "react";
import { reqResApi } from "../api/reqRes";
import Swal from "sweetalert2";

interface Usuario {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
}

const emptyUsuario: Usuario = {
  _id: "",
  name: "",
  email: "",
  role: "",
  status: false
};

export const UserHook = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async (): Promise<void> => {
    try {
      const response = await reqResApi.get("/users/list", {
        withCredentials: true
      });
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error fetching usuarios:", error);
    }
  };

  const handleOpenModal = (usuario: Usuario | null = null): void => {
    setSelectedUsuario(usuario || emptyUsuario);
    setEditMode(usuario !== null);
    setOpenModal(true);
  };

  const handleCloseModal = (): void => {
    setOpenModal(false);
    setSelectedUsuario(null);
  };

  const handleSave = async (): Promise<void> => {
    if (editMode && selectedUsuario) {
      try {
        await reqResApi.put(
          `/users/update/${selectedUsuario._id}`,
          selectedUsuario,
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error updating usuario:", error);
      }
    } else {
      try {
        await reqResApi.post("/users/create", selectedUsuario, {
          withCredentials: true
        });
      } catch (error) {
        console.error("Error creating usuario:", error);
      }
    }
    handleCloseModal();
    fetchUsuarios();
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const confirm = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      });
      if (confirm.isConfirmed) {
        await reqResApi.delete(`/users/delete/${id}`, {
          withCredentials: true
        });
        fetchUsuarios();
        Swal.fire("Eliminado!", "El usuario ha sido eliminado.", "success");
      }
    } catch (error) {
      console.error("Error deleting usuario:", error);
    }
  };

  const handleChangePage = (newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ): void => {
    const { name, value } = event.target;
    setSelectedUsuario((prevUsuario) =>
      prevUsuario ? { ...prevUsuario, [name as string]: value } : null
    );
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedUsuario((prevUsuario) =>
      prevUsuario
        ? { ...prevUsuario, status: event.target.checked }
        : ({ status: event.target.checked } as Usuario)
    );
  };

  return {
    usuarios,
    openModal,
    editMode,
    selectedUsuario,
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
};
