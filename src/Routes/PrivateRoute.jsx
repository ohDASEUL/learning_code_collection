import React from 'react'
import ProductDetailPage from '../Pages/ProductDetailPage'
import { Navigate, useParams } from 'react-router-dom'

const PrivateRoute = ({authenticate}) => {
  const { id } = useParams();
  console.log(id,'제품아이디')
  
  return authenticate === true?<ProductDetailPage />:<Navigate to={`/login?productId=${id}`} />
}

export default PrivateRoute