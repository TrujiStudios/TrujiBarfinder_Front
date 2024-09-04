import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Typography, Modal, Button } from "@mui/material";
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
                    {order ? `Ocupada - Total: $${order.total}` : "Disponible"}
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
            width: 400,
            backgroundColor: "white",
            padding: 20,
            // boxShadow: 24,
            borderRadius: 8
          }}
        >
          <Typography id="order-modal-title" variant="h6">
            {selectedOrder
              ? `Orden de ${selectedOrder.tableId}`
              : "No hay orden"}
          </Typography>
          <Typography id="order-modal-description" sx={{ mt: 2 }}>
            {selectedOrder ? (
              <>
                {selectedOrder.products.map((product, index) => (
                  <div key={index}>
                    {product.name} - ${product.price}
                  </div>
                ))}
                <div>
                  <strong>{selectedOrder.quantity}</strong>
                </div>
                <div>
                  <strong>Total: ${selectedOrder.total}</strong>
                </div>
              </>
            ) : (
              "No hay productos en esta orden."
            )}
          </Typography>
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Sell;
