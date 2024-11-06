import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetailPage = ({ incrementCartCount }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("");
  let { id } = useParams();

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        setLoading(true);
        // URL을 로컬 json-server로 변경
        const response = await fetch(`http://localhost:3001/products/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        Swal.fire({
          title: "Error",
          text: "상품 정보를 불러오는데 실패했습니다.",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    getProductDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  // 나머지 코드는 그대로 유지...
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleCartClick = () => {
    if (size) {
      Swal.fire({
        title: "성공!",
        text: "장바구니에 담겼습니다!",
        icon: "success",
      });
      incrementCartCount();
    } else {
      Swal.fire({
        title: "Error",
        text: "사이즈를 선택해주세요!",
        icon: "error",
      });
    }
  };

  const handleHeartClick = () => {
    Swal.fire({
      title: "완료!",
      text: "해당 상품이 찜 목록에 저장되었습니다!",
      icon: "success",
    });
  };

  return (
    <div className="product-detail-group">
      <div className="product-detail-img-group">
        <Grid item xs={12} md={6}>
          <img
            src={product.img}
            className="product-detail-img"
            alt={product.title}
          />
        </Grid>
      </div>

      <div className="product-detail-info-group">
        <Grid item xs={12} md={6}>
          <Typography variant="h6" style={{ textAlign: "left" }}>
            {product.title}
          </Typography>
          <Typography variant="body1" style={{ textAlign: "left" }}>
            ￦{product.price.toLocaleString()}원
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
