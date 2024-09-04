import { useState, useEffect } from "react";
import { reqResApi } from "../api/reqRes";
// import { SelectChangeEvent } from "@mui/material";
import { Order } from "../interface/orderInterface";

export const OrdertHook = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [orderAll, setOrderAll] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrdersAll();
    // fetchOrders("669ef522adf17dfa5801a641");
    // fetchOrders("669ca6804d8d8d5226a87430");
  }, []); // Asegúrate de incluir orderId en el array de dependencias si vas a llamar a fetchOrders aquí

  const fetchOrders = async (orderId: string | number): Promise<void> => {
    try {
      const response = await reqResApi.get<Order>(`/orders/One/${orderId}`, {
        // Modifica la URL para incluir el orderId
        withCredentials: true
      });
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchOrdersAll = async (): Promise<void> => {
    try {
      const response = await reqResApi.get<Order[]>(`/orders/all`, {
        withCredentials: true
      });
      setOrderAll(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // const handleOrderChange = (event: SelectChangeEvent<string>): void => {
  //     fetchOrders(event.target.value);
  // };

  return {
    order,
    fetchOrders,
    orderAll,
    fetchOrdersAll
  };
};
