import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip
} from "@mui/material";
import axios from "axios";

interface Product {
  _id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  status: boolean;
}

interface Table {
  id: number;
  name: string;
  occupied: boolean;
}

interface TableOrderProps {
  table: Table;
  onClose: () => void;
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

  //   const filteredProducts =
  //     selectedCategory === "Todos"
  //       ? products
  //       : products.filter((product) => product.category === selectedCategory);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "Todos") {
      return true;
    }
    if (selectedCategory.toString() === product.category[1].toString()) {
      return true;
    }

    return false;
  });

  return (
    <Box mt={30}>
      <Typography variant="h4">Mesa: {table.name}</Typography>
      <Button onClick={onClose}>Cerrar</Button>
      <Box mb={2}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => setSelectedCategory(category)}
            color={selectedCategory === category ? "primary" : "default"}
            style={{ marginRight: 8, cursor: "pointer" }}
          />
        ))}
      </Box>
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card onClick={() => handleProductClick(product)}>
              <CardContent>
                <img src={product.image} alt={product.name} width="100" />
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">${product.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box>
        <Typography variant="h5">Orden:</Typography>
        {order.map((item, index) => (
          <Typography key={index}>
            {item.name} - ${item.price}
          </Typography>
        ))}
        <Typography variant="h6">
          Total: ${order.reduce((total, item) => total + item.price, 0)}
        </Typography>
      </Box>
    </Box>
  );
};

export default TableOrder;
