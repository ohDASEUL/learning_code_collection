import { Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  let { id } = useParams();
  const getProductDetail = async () => {
    let url = `http://localhost:5000/products/${id}`;
    let res = await fetch(url);
    let data = await res.json();
    setProduct(data);
  };
  useEffect(() => {
    getProductDetail();
  }, []);
  return (
    <div className="product-detail-group">
      <div className="product-detail-img-group">
        <Grid item xs={12} md={6}>
          <img
            src={product?.img}
            className="product-detail-img"
            alt={product?.title}
          />
        </Grid>
      </div>

      <div className="product-detail-info-group">
        <Grid item xs={12} md={6}>
          <Typography variant="h6" style={{ textAlign: 'left' }}>
            {product?.title}
          </Typography>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            ￦{product?.price.toLocaleString()}원
          </Typography>
        </Grid>
        <Select
          defaultValue=""
          displayEmpty
          className="product-detail-size-group"
        >
          <MenuItem value="" disabled>
            사이즈 선택
          </MenuItem>
          <MenuItem value="1">S</MenuItem>
          <MenuItem value="2">M</MenuItem>
          <MenuItem value="3">L</MenuItem>
        </Select>
        <Button variant="contained" color="info" className="product-detail-btn">
          추가
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
