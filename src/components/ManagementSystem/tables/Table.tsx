import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Modal,
  Box,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  TablePagination,
  Grid
} from "@mui/material";

//! falta la imagen
const DEFAULT_IMAGE_URL =
  "https://restobar.loggro.com/assets/images/pirpos/pirpos_table_dnd.png";
// const DEFAULT_IMAGE_URL =
//   "../../../assets/images/tables/barfinder_table_dnd.png";

// Definición del tipo para Mesa
interface Mesa {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  image: string;
}

const Mesas = () => {
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

  // console.log("RESPONSE <>", response);

  // Función para manejar la creación de una mesa
  // const createMesa = async () => {
  //   try {
  //     await axios.post(
  //       "http://localhost:5000/api/v1/tables/create",
  //       formValues,
  //       {
  //         withCredentials: true
  //       }
  //     );
  //     fetchMesas();
  //     setShowModal(false);
  //   } catch (error) {
  //     console.error("Error creating mesa", error);
  //   }
  // };

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
          `http://localhost:5000/api/v1/tables/update/${selectedMesa._id}`,
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
    const { name, value, type, checked } = e.target;
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
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
        >
          Nueva
        </Button>
      </Box>
      <p>{message.toString()}</p>
      <Paper
        elevation={2}
        style={{
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          width: "90%"
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mesas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((mesa) => (
                  <TableRow key={mesa._id}>
                    <TableCell>{mesa.name}</TableCell>
                    <TableCell>{mesa.description}</TableCell>
                    <TableCell>{mesa.status ? "Activo" : "Inactivo"}</TableCell>
                    <TableCell>
                      <img
                        src={mesa.image}
                        alt={mesa.name}
                        width="50"
                        height="50"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleOpenModal(mesa)}
                        style={{ marginRight: "10px" }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteMesa(mesa._id)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={mesas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>{isEditing ? "Editar Mesa" : "Nueva Mesa"}</h2>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Nombre"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Descripción"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formValues.status}
                    onChange={handleInputChange}
                    name="status"
                  />
                }
                label="Activo"
              />
            </FormControl>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {isEditing ? "Actualizar" : "Guardar Cambios"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Mesas;
