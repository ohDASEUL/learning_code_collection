import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productAction } from "../redux/actions/productAction";

const ProductDetailPage = () => {
  let { id } = useParams();
  const product = useSelector((state) => state.product.selectedItem);
  const dispatch = useDispatch();
  const getProductDetail = async () => {
    dispatch(productAction.getProductDetail(id));
  };
  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <div>{product?.title}</div>
    // <Container>
    //   <Row>
    //     <Col className="product-detail-img">
    //       <img src={product?.img} width="300px" />
    //     </Col>
    //     <Col className="product-detail-info">
    //       <div>{product?.title}</div>
    //       <div>￦{product?.price}</div>
    //       <div>{product?.choice === true ? "concious choice" : ""}</div>
    //       <select style={{ width: "150px" }}>
    //         <option value="" disabled selected>
    //           사이즈 선택
    //         </option>
    //         <option value="1">S</option>
    //         <option value="2">M</option>
    //         <option value="3">L</option>
    //       </select>
    //       <Button variant="danger" className="product-detail-btn">
    //         추가
    //       </Button>
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default ProductDetailPage;
