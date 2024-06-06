import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  Switch,
  FormControlLabel
} from "@mui/material";

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
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    status: true
  });

  // Función para obtener las mesas
  const fetchMesas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/tables/all",
        { withCredentials: true }
      );
      setMesas(response.data.data);
    } catch (error) {
      console.error("Error fetching mesas", error);
    }
  };

  // Función para manejar la creación de una mesa
  const createMesa = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/tables/create",
        formValues
      );
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
          formValues
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
      await axios.delete(`http://localhost:5000/api/v1/tables/delete/${id}`);
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
        status: mesa.status
      });
      setIsEditing(true);
    } else {
      setSelectedMesa(null);
      setFormValues({
        name: "",
        description: "",
        status: true
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
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal()}
      >
        Nueva
      </Button>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {mesas.map((mesa) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={mesa._id}>
            <Card>
              <CardMedia
                component="img"
                alt={mesa.name}
                height="140"
                image={mesa.image}
                title={mesa.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {mesa.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {mesa.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {mesa.status ? "Activo" : "Inactivo"}
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleOpenModal(mesa)}
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>{isEditing ? "Editar Mesa" : "Nueva Mesa"}</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Nombre"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Descripción"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              required
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formValues.status}
                  onChange={handleInputChange}
                  name="status"
                  color="primary"
                />
              }
              label="Activo"
            />
            <Button variant="contained" color="primary" type="submit">
              {isEditing ? "Actualizar" : "Crear"}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Mesas;
