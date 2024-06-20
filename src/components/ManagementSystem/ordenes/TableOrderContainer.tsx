import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TableOrder from "./TableOrder";

interface Table {
  id: number;
  name: string;
  occupied: boolean;
}

const TableOrderContainer: React.FC = () => {
  const { tableId } = useParams<{ tableId: string }>();
  const navigate = useNavigate();
  const [table, setTable] = useState<Table | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/tables/One/${tableId}`, {
        withCredentials: true
      })
      .then((response) => {
        setTable(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
      });
  }, [tableId]);

  const handleClose = () => {
    navigate("/dashboard/sell"); // Navega de regreso a la vista de mesas o la ruta que prefieras
  };

  if (!table) {
    return <div>Loading...</div>; // Puedes mejorar esto con un spinner o un mensaje de carga
  }

  return <TableOrder table={table} onClose={handleClose} />;
};

export default TableOrderContainer;
