import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Modal,
  Button,
  Switch,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { OrdertHook } from "../../../hook/OrderHook";
import { Order, Table } from "../../../interface/orderInterface";

const DEFAULT_IMAGE_URL =
  "https://restobar.loggro.com/assets/images/pirpos/pirpos_table_dnd.png";
const DEFAULT_IMAGE_URL_VERDE =
  "https://restobar.loggro.com/assets/images/pirpos/pirpos_table_dnd_green.png";

const Sell: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { orderAll } = OrdertHook();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/tables/all", { withCredentials: true })
      .then((response) => {
        setTables(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching tables:", error);
      });
  }, []);

  const handleTableClick = (table: Table) => {
    navigate(`/dashboard/order/${table.id}`);
  };

  const handleOrderClick = (order: Order | null) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getTableOrder = (tableId: string): Order | undefined => {
    return orderAll?.find((order) => order.tableId === tableId) as
      | Order
      | undefined;
  };
  // const getTableOrder = (tableId: string): Order | undefined => {
  //   return order?.find((order) => order.tableId === tableId) as
  //     | Order
  //     | undefined;
  // };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <Container
      style={{
        marginTop: "150px",
        boxShadow: "0px 0px 5px 0px",
        height: "100vh"
      }}
    >
      <Box>
        <Grid mt={13} ml={5} container spacing={2}>
          {tables
            .filter((table) => table.status)
            .map((table) => {
              const order = getTableOrder(table.id);
              return (
                <Grid item key={table.id} xs={12} sm={6} md={4} lg={3}>
                  <Typography style={{ marginLeft: "20px" }} variant="h6">
                    {table.name}
                  </Typography>
                  <img
                    src={order ? DEFAULT_IMAGE_URL_VERDE : DEFAULT_IMAGE_URL}
                    alt={table.name}
                    onClick={() => handleTableClick(table)}
                    width="100"
                  />
                  <Typography
                    style={{
                      marginLeft: "20px",
                      cursor: order ? "pointer" : "default"
                    }}
                    variant="h6"
                    onClick={() => order && handleOrderClick(order)}
                  >
                    {order
                      ? `Ocupada - Total: ${formatPrice(order.total)}`
                      : "Disponible"}
                  </Typography>
                </Grid>
              );
            })}
        </Grid>
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="order-modal-title"
        aria-describedby="order-modal-description"
      >
        <Box
          component="div"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            maxWidth: 900,
            backgroundColor: "white",
            borderRadius: 8,
            padding: "20px",
            overflow: "auto",
            height: "auto",
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)"
          }}
        >
          <Box
            style={{
              backgroundColor: "#C62828", // Color rojo de la cabecera
              color: "white",
              padding: "10px 20px",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography variant="h6">
              {tables
                ? `Orden de ${
                    tables.find((table) => table.id === selectedOrder?.tableId)
                      ?.name
                  }`
                : "No hay orden"}
            </Typography>
            <Switch color="default" />
          </Box>

          <Box padding="20px">
            {selectedOrder ? (
              <>
                <Grid
                  container
                  spacing={2}
                  style={{ borderBottom: "1px solid #e0e0e0" }}
                >
                  {selectedOrder.products.map((product, index) => (
                    <Grid
                      container
                      spacing={2}
                      key={index}
                      alignItems="center"
                      style={{ marginBottom: "10px" }}
                    >
                      <Grid item xs={2}>
                        <Switch color="default" defaultChecked />
                      </Grid>
                      {/* <Grid item xs={2}>
                        <Typography variant="body1">
                          {new Date(product.createdAt).toLocaleString()}
                        </Typography>
                      </Grid> */}
                      <Grid item xs={1}>
                        <Typography variant="body1">
                          {product.quantity}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body1">{product.name}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="body1">
                          {formatPrice(Number(product.price))}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        {/* <Typography variant="body1">
                          ${product.promo || 0}
                        </Typography> */}
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="body1">
                          {formatPrice(
                            product.quantity * Number(product.price)
                          )}
                        </Typography>
                      </Grid>
                      {/* <Grid item xs={1}>
                        <Typography variant="body1">
                          {product.seller}
                        </Typography>
                      </Grid> */}
                      {/* <Grid item xs={2}>
                        <Button variant="contained" color="error">
                          Cancelar
                        </Button>
                      </Grid> */}
                    </Grid>
                  ))}
                </Grid>

                {/* Subtotal y descuentos */}
                <Box mt={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <Typography variant="body1">Subtotal</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body1">
                        {/* ${selectedOrder.total} */}
                        {formatPrice(selectedOrder.total)}
                      </Typography>
                    </Grid>

                    <Grid item xs={9}>
                      <TextField
                        label="Descuento (%)"
                        size="small"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="Descuento ($)"
                        size="small"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* Total */}
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Typography variant="h6">
                    Total: {formatPrice(selectedOrder.total)}
                  </Typography>
                </Box>

                {/* Opciones adicionales */}
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    <Switch />
                    <Typography variant="body1">Mover a otra mesa</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Switch />
                    <Typography variant="body1">Es cortesía</Typography>
                  </Box>
                </Box>
              </>
            ) : (
              <Typography variant="body1">
                No hay productos en esta orden.
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Sell;
