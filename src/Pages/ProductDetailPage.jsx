import React, { useEffect, useState } from 'react';
import { Button, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState('');
  let { id } = useParams();

  useEffect(() => {
    const getProductDetail = async () => {
      let url = `http://localhost:5000/products/${id}`;
      let res = await fetch(url);
      let data = await res.json();
      setProduct(data);
    };
    getProductDetail();
  }, [id]);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleCartClick = () => {
    if (size) {
      Swal.fire({
        title: '성공!',
        text: '장바구니에 담겼습니다!',
        icon: 'success',
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: '사이즈를 선택해주세요!',
        icon: 'error',
      });
    }
  };

  const handleHeartClick = () => {
    Swal.fire({
      title: '완료!',
      text: '해당 상품이 찜 목록에 저장되었습니다!',
      icon: 'success',
    });
  }

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
          value={size}
          onChange={handleSizeChange}
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

        <Button
          variant="contained"
          color="info"
          className="product-cart-btn"
          onClick={handleCartClick}
        >
          추가
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className="product-heart-btn"
          onClick={handleHeartClick}
        >
          찜
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
