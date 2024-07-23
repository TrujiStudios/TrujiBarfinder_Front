import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { OrdertHook } from "../../../hook/OrderHook";
import { Order } from "../../../interface/orderInterface";
const DEFAULT_IMAGE_URL =
  "https://restobar.loggro.com/assets/images/pirpos/pirpos_table_dnd.png";
const DEFAULT_IMAGE_URL_VERDE =
  "https://restobar.loggro.com/assets/images/pirpos/pirpos_table_dnd_green.png";

interface Table {
  id: string;
  name: string;
  occupied: boolean;
  status: boolean;
}

const Sell: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  // const [order, setOrder] = useState<Table | null>(null);
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

  const getTableOrder = (tableId: string): Order | undefined => {
    return orderAll?.find((order) => order.tableId === tableId.toString());
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
                  <Typography style={{ marginLeft: "20px" }} variant="h6">
                    {order ? `Total: $${order.total}` : "Disponible"}
                  </Typography>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Sell;
