// import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import axios from 'axios';
import { Switch, FormControlLabel } from "@mui/material";
import { CategoryHook } from "../../../hook/CategoryHook";

const TablaCategorias: React.FC = () => {
  const {
    categorias,
    handleOpenModal,
    handleCloseModal,
    handleSave,
    handleDelete,
    handleChangePage,
    handleChangeRowsPerPage,
    handleInputChange,
    handleStatusChange,
    selectedCategoria,
    openModal,
    editMode,
    page,
    rowsPerPage
  } = CategoryHook();

  return (
    <Container>
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginTop: "10rem"
        }}
      >
        Categorías
      </h2>
      <Box
        mt={6}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <TextField label="Buscar:" variant="outlined" size="small" />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleOpenModal()}
        >
          Nueva
        </Button>
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
              {categorias
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((categoria) => (
                  <TableRow key={categoria.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <img
                          src={categoria.imagen}
                          alt={categoria.name}
                          style={{ width: 50, height: 50, marginRight: 16 }}
                        />
                        <Typography>{categoria.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{categoria.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={categoria.status ? "success" : "error"}
                        size="small"
                      >
                        {categoria.status ? "Activo" : "Inactivo"}
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenModal(categoria)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(categoria.id)}
                      >
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
          onPageChange={(_event, newPage) => handleChangePage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {editMode ? "Editar Categoría" : "Nueva Categoría"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            name="name"
            fullWidth
            defaultValue={selectedCategoria?.name || ""}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Descripción"
            name="description"
            fullWidth
            defaultValue={selectedCategoria?.description || ""}
            onChange={handleInputChange}
          />
          <FormControlLabel
            control={
              <Switch
                checked={selectedCategoria?.status || false}
                onChange={handleStatusChange}
                name="status"
              />
            }
            label="Estado"
          />
          <TextField
            margin="dense"
            label="URL de la Imagen"
            name="imagen"
            fullWidth
            defaultValue={selectedCategoria?.imagen || ""}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            {editMode ? "Guardar Cambios" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TablaCategorias;
