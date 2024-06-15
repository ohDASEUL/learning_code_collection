import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const goProductDetail = () => {
    navigate(`/product/${item.id}`);
  };

  return (
    <div className='card-section' onClick={goProductDetail}>
      <img src={item?.img} alt={item?.title}/>
      <div>{item?.title}</div>
      <div>￦{item?.price.toLocaleString()}원</div>
    </div>
  );
};

export default ProductCard;
