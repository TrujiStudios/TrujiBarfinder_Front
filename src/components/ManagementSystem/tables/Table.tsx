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
  TablePagination
} from "@mui/material";
import { styleess, style } from "../../../themes/tableTheme";
import { TableHook } from "../../../hook/TableHook";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Delete";
// import { Delete } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

const Mesas = () => {
  const {
    mesas,
    message,
    showModal,
    isEditing,
    formValues,
    handleOpenModal,
    handleInputChange,
    handleSubmit,
    deleteMesa,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
    setShowModal
  } = TableHook();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={16}
    >
      {/* <h2> Mesas</h2> */}
      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          onClick={() => handleOpenModal()}
          style={styleess.ButonNuenva}
        >
          Nueva Mesa
        </Button>
      </Box>
      <p
        style={{
          fontFamily: "monospace",
          fontWeight: "bold",
          fontSize: "18px"
        }}
      >
        {message.toString()}
      </p>
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
                <TableCell style={styleess.tableCellHeader}>Nombre</TableCell>
                <TableCell style={styleess.tableCellHeader}>
                  Descripción
                </TableCell>
                <TableCell style={styleess.tableCellHeader}>Estado</TableCell>
                <TableCell style={styleess.tableCellHeader}>Imagen</TableCell>
                <TableCell style={styleess.tableCellHeader}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mesas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((mesa) => (
                  <TableRow key={mesa.id}>
                    <TableCell style={styleess.tableCellTable}>
                      {mesa.name}
                    </TableCell>
                    <TableCell style={styleess.tableCellTable}>
                      {mesa.description}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        // color={mesa.status ? "success" : "error"}
                        style={
                          mesa.status
                            ? styleess.buttonActiva
                            : styleess.buttonEliminar
                        }
                        size="small"
                      >
                        {mesa.status ? "Activa" : "Inactivo"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <img
                        src={mesa.image}
                        alt={mesa.name}
                        width="50"
                        height="50"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        // color="primary"
                        style={styleess.buttonEditar}
                        onClick={() => handleOpenModal(mesa)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        // color="primary"
                        style={styleess.buttonEliminar}
                        onClick={() => deleteMesa(mesa.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
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
