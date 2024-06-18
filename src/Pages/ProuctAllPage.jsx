import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { Container, Grid } from "@mui/material";

const ProuctAllPage = ({searchQuery}) => {
  const [productList, setProductList] = useState([]);
  const getProducts = async () => {
    let url = `http://localhost:5000/products`;
    let res = await fetch(url);
    let data = await res.json();
    setProductList(data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  const filteredProducts = productList.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
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

export default ProuctAllPage;
