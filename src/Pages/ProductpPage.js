import React from 'react'
import { useSearchParams } from 'react-router-dom'

const ProductpPage = () => {
  let [query, setQuery] = useSearchParams()
  console.log("어쩌고저쩌고",query.get("page"))
  return (
    <div>
        <h1>Show All Product</h1>
    </div>
  )
}

export default ProductpPage