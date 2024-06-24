import React from 'react'
import ProductDetailPage from '../Pages/ProductDetailPage'
import { Navigate, useParams } from 'react-router-dom'

const PrivateRoute = ({authenticate,incrementCartCount}) => {
  const { id } = useParams();
  console.log(id,'제품아이디')
  
  return authenticate === true?<ProductDetailPage incrementCartCount={incrementCartCount} />:<Navigate to={`/login?productId=${id}`} />
}

export default PrivateRoute