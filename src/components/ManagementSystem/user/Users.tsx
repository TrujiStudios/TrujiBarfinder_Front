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
  Paper,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
  Switch
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserHook } from "../../../hook/UserHook";

const Users: React.FC = () => {
  const {
    usuarios,
    handleOpenModal,
    handleCloseModal,
    handleSave,
    handleDelete,
    handleChangePage,
    handleChangeRowsPerPage,
    handleInputChange,
    handleStatusChange,
    selectedUsuario,
    openModal,
    editMode,
    page,
    rowsPerPage
  } = UserHook();

  return (
    <Container>
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginTop: "10rem",
          color: "black"
        }}
      >
        Usuarios
      </h2>

      <Box
        mt={7}
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
          Nuevo Usuario
        </Button>
      </Box>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((usuario) => (
                  <TableRow key={usuario._id}>
                    <TableCell>{usuario.name}</TableCell>
                    <TableCell>{usuario.lastName}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.phone}</TableCell>
                    <TableCell>{usuario.role.type}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={usuario.status ? "success" : "error"}
                        size="small"
                      >
                        {usuario.status ? "Activo" : "Inactivo"}
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenModal(usuario)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(usuario._id)}
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
          count={usuarios.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_event, newPage) => handleChangePage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {editMode ? "Editar Usuario" : "Nuevo Usuario"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            name="name"
            fullWidth
            defaultValue={selectedUsuario?.name || ""}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            defaultValue={selectedUsuario?.email || ""}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Rol"
            name="role"
            fullWidth
            defaultValue={selectedUsuario?.role || ""}
            onChange={handleInputChange}
          />
          <Switch
            checked={selectedUsuario?.status || false}
            onChange={handleStatusChange}
            name="status"
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

export default Users;
