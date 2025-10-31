import React from 'react'
import axios from 'axios'

const Admin_GetEachProduct = ({ readEachPro, setReadEachProduct, getProducts }) => {
  const getProductsById = async (id) => {
    try {
      const res = await axios(`http://localhost:5000/api/item/get-itemById/${id}`)
      setReadEachProduct(res.data.data)
      getProducts()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>{readEachPro && (
      <div className='border p-4'>
        <p>Id:{readEachPro.id}</p>
        <p>Name:{readEachPro.name}</p>
        <p>Image:<img src={readEachPro.image} alt={readEachPro.name} className='w-20 h-20 object-cover' /></p>
        <p>Category:{readEachPro.category}</p>
        <p>New_Price:{readEachPro.new_price}</p>
        <p>Old_Price:{readEachPro.old_price}</p>
        <p>Date:{readEachPro.date}</p>
        <p>Stock:{readEachPro.stock}</p>
        <p>Size:{readEachPro.size}</p>
        <p>Color:{readEachPro.color}</p></div>)
    }</div>
  )
}

export default Admin_GetEachProduct