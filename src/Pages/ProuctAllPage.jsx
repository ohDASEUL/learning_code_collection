import React, { useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard'

const ProuctAllPage = () => {
  const [productList, setProductList] = useState([])
  const getProducts=async()=>{
    let url = `http://localhost:5000/products`
    let res = await fetch(url)
    let data = await res.json()
    setProductList(data)
  }
  useEffect(()=>{
    getProducts()
  },[])
  return (
    <div>
      <ProductCard/>
    </div>
  )
}

export default ProuctAllPage