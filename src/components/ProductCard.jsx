import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({item}) => {
  const navigate = useNavigate();
  const goProductDetail = () => {
    navigate(`/product/${item.id}`)
  }
  return (
    <div className='card-section' onClick={goProductDetail}>
        <img src={item?.img}/>
        <div>{item?.choice === true?"concious choice":""}</div>
        <div>{item?.title}</div>
        <div>{item?.price}</div>
        <div>{item?.new === true?"신제품":""}</div>
    </div>
  )
}

export default ProductCard