import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Paper
} from "@mui/material";
import axios from "axios";

interface Product {
  _id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  status: boolean;
  quantity?: number;
  productId?: number;
}

interface Table {
  _id: number;
  id: number;
  name: string;
  occupied: boolean;
}

interface TableOrderProps {
  table: Table;
  onClose: () => void;
}

// interface Producto {
//   _id: string;
//   // Asume otras propiedades del producto aquí, como price, name, etc.
//   name: string;
//   price: number;
//   image: string;
//   category: string;
//   status: boolean;
//   quantity?: number; // La propiedad quantity es opcional aquí porque originalmente no existe en el producto
// }

interface Orden {
  tableId: number;
  products: Array<{ _id: number; quantity: number }>;
}

const TableOrder: React.FC<TableOrderProps> = ({ table, onClose }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [order, setOrder] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products and categories
    axios
      .get("http://localhost:5000/api/v1/product/get", {
        withCredentials: true
      })
      .then((response) => {
        const fetchedProducts = response.data as Product[];
        const visibleProducts = fetchedProducts.filter(
          (product) => product.status === true
        );
        setProducts(visibleProducts);

        const allCategories = visibleProducts.flatMap(
          (product: Product) => product.category[1]
        );
        const uniqueCategories = Array.from(new Set(allCategories));
        setCategories(["Todos", ...uniqueCategories]);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleProductClick = (product: Product) => {
    setOrder([...order, product]);
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "Todos") {
      return true;
    }
    if (selectedCategory.toString() === product.category[1].toString()) {
      return true;
    }
    return false;
  });

  // const enviarOrden = async () => {
  //   const orden = {
  //     tableId: table._id,
  //     products: order.map((product) => ({
  //       productId: product._id // Agrega esta línea
  //       // quantity: product.price
  //     }))
  //   };
  //   try {
  //     await axios.post("http://localhost:5000/api/v1/orders/create", orden, {
  //       withCredentials: true
  //     });
  //     setOrder([]);
  //   } catch (error) {
  //     console.error("Error sending order:", error);
  //   }
  // };

  // const enviarOrden = async () => {
  //   try {
  //     await axios.post(
  //       "http://localhost:5000/api/v1/orders/create",
  //       {
  //         tableId: table.id,
  //         // products: order.map((product) => product.price)
  //         products: order
  //       },
  //       {
  //         withCredentials: true
  //       }
  //     );
  //     setOrder([]);
  //   } catch (error) {
  //     console.error("Error sending order:", error);
  //   }
  // };

  const manejarEnviarOrden = async () => {
    // Crear un mapa para contar las ocurrencias de cada producto
    const conteoProductos: { [key: string]: Product } = order.reduce(
      (acc: { [key: string]: Product }, producto: Product) => {
        if (!acc[producto._id]) {
          acc[producto._id] = { ...producto, quantity: 1 };
        } else {
          acc[producto._id].quantity! += 1; // Usamos el operador non-null assertion (!) porque estamos seguros de que quantity ya está definido
        }
        return acc;
      },
      {}
    );

    // Transformar el mapa en un array de productos con cantidad
    const productosConCantidad: Product[] = Object.values(conteoProductos);

    // Crear el objeto de la orden con la nueva estructura
    const orden: Orden = {
      tableId: table._id,
      products: productosConCantidad.map(({ _id, quantity }) => ({
        productId: _id,
        _id,
        quantity: quantity! // Usamos el operador non-null assertion (!) porque estamos seguros de que quantity está definido
      }))
    };

    try {
      await axios.post("http://localhost:5000/api/v1/orders/create", orden, {
        withCredentials: true
      });
      setOrder([]);
    } catch (error) {
      console.error("Error sending order:", error);
    }
  };

  return (
    <Box mt={10} p={2}>
      <Typography variant="h4" gutterBottom>
        Mesa: {table.name}
      </Typography>
      <Button
        onClick={onClose}
        variant="contained"
        color="secondary"
        sx={{ mb: 2 }}
      >
        Cerrar
      </Button>
      <Box mb={2} display="flex" justifyContent="center" flexWrap="wrap">
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => setSelectedCategory(category)}
            color={selectedCategory === category ? "primary" : "default"}
            sx={{ margin: 0.5 }}
          />
        ))}
      </Box>
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={() => handleProductClick(product)}
              sx={{ cursor: "pointer", boxShadow: 3 }}
            >
              <CardContent>
                <Box display="flex" justifyContent="center" mb={2}>
                  <img src={product.image} alt={product.name} width="100" />
                </Box>
                <Typography variant="h6" align="center">
                  {product.name}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="textSecondary"
                >
                  {/* ${product.price} */}$
                  {parseFloat(product.price.toString()).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Paper sx={{ position: "fixed", bottom: 0, right: 0, width: 300, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Orden:
        </Typography>
        {order.map((item, index) => (
          <Typography key={index}>
            {item.name} - ${parseFloat(item.price.toString()).toFixed(2)}
          </Typography>
        ))}
        <Typography variant="h6" mt={2}>
          Total: $
          {order
            .reduce(
              (total, item) => total + parseFloat(item.price.toString()),
              0
            )
            .toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Enviar orden
        </Button>
        <button onClick={manejarEnviarOrden}>Enviar Orden</button>
      </Paper>
    </Box>
  );
};

export default TableOrder;
