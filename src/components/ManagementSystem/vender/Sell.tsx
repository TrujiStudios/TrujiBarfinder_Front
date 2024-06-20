import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DEFAULT_IMAGE_URL =
  "https://restobar.loggro.com/assets/images/pirpos/pirpos_table_dnd.png";
const DEFAULT_IMAGE_URL_VERDE =
  "https://restobar.loggro.com/assets/images/pirpos/pirpos_table_dnd_green.png";

interface Table {
  id: number;
  name: string;
  occupied: boolean;
}

const Sell: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
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

  return (
    <Box>
      <Grid mt={20} container spacing={2}>
        {tables.map((table) => (
          <Grid item key={table.id} xs={12} sm={6} md={4} lg={3}>
            <Card onClick={() => handleTableClick(table)}>
              <CardContent>
                <img
                  src={
                    table.occupied ? DEFAULT_IMAGE_URL_VERDE : DEFAULT_IMAGE_URL
                  }
                  alt={table.name}
                  width="100"
                />
                <Typography variant="h6">{table.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Sell;
