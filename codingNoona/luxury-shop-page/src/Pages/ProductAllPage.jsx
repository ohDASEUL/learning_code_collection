import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { Container, Grid } from "@mui/material";

const ProductAllPage = ({ searchQuery = '' }) => {  // 기본값 설정
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);  // 로딩 상태 추가

  const getProducts = async () => {
    try {
      let url = `https://my-json-server.typicode.com/ohDASEUL/luxury-shop-page/products`;
      let res = await fetch(url);
      let data = await res.json();
      setProductList(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductList([]); // 에러 시 빈 배열로 설정
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredProducts = productList?.filter((product) =>
    product?.title?.toLowerCase().includes((searchQuery || '').toLowerCase())
  ) || [];

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