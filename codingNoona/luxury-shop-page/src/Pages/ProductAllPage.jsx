import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { Container, Grid } from "@mui/material";

const ProductAllPage = ({ searchQuery = "" }) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      setLoading(true); // 로딩 시작
      const response = await fetch("http://localhost:3001/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProductList(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductList([]);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredProducts = Array.isArray(productList)
    ? productList.filter((product) =>
        product?.title
          ?.toLowerCase()
          .includes((searchQuery || "").toLowerCase())
      )
    : [];

  return (
    <div>
      <Container>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 6, md: 10 }}
        >
          {filteredProducts.map((item) => (
            <Grid item xs={2} sm={2} md={2} key={item.id}>
              <ProductCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ProductAllPage;
