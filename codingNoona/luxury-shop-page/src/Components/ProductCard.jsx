import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      <div>{item?.title}<FontAwesomeIcon icon={faHeart} className='product-card-heart' /></div>
      <div>￦{item?.price.toLocaleString()}원</div>
    </div>
  );
};

export default ProductCard;
