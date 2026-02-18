import React from 'react'
import axios from 'axios'

const Admin_Create = ({ newPro, setNewProduct, getProducts }) => {
  const newProduct = async () => {

    try {
      // const res = await axios.post("http://localhost:5000/api/item/create-item", newPro)
            const res = await axios.post("https://mypjtitemcatelogbe.onrender.com/api/item/create-item", newPro)

      console.log("Created:", res.data);

      setNewProduct({
        id: "",
        name: "",
        image: "",
        category: "",
        new_price: "",
        old_price: "",
        date: "",
        stock: "",
        size: "",
        color: ""
      });
    } catch (error) {
      console.error("Create error:", error.response?.data || error.message);
    }

  }
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    await newProduct();
    getProducts()
  }
  return (
    <form onSubmit={handleCreateSubmit}>
      <div>
        <p> ID:<input type="text" value={newPro.id} placeholder="Enter id" onChange={(e) => setNewProduct({ ...newPro, id: e.target.value })} className='border' /></p>
        <p>NAME:<input type="text" value={newPro.name} placeholder="Enter name" onChange={(e) => setNewProduct({ ...newPro, name: e.target.value })} className='border' /></p>
        <p>IMAGE URL:<input type="text" value={newPro.image} placeholder="Enter image url" onChange={(e) => setNewProduct({ ...newPro, image: e.target.value })} className='border' /></p>
        <p>CATEGORY:<input type="text" value={newPro.category} placeholder="Enter category" onChange={(e) => setNewProduct({ ...newPro, category: e.target.value })} className='border' /></p>
        <p>NEW_PRICE:<input type="text" value={newPro.new_price} placeholder="Enter new_price" onChange={(e) => setNewProduct({ ...newPro, new_price: e.target.value })} className='border' /></p>
        <p>OLD_PRICE:<input type="text" value={newPro.old_price} placeholder="Enter old_price" onChange={(e) => setNewProduct({ ...newPro, old_price: e.target.value })} className='border' /></p>
        <p>DATE:<input type="text" value={newPro.date} placeholder="Enter date" onChange={(e) => setNewProduct({ ...newPro, date: e.target.value })} className='border' /></p>
        <p>STOCK:<input type="text" value={newPro.stock} placeholder="Enter stock" onChange={(e) => setNewProduct({ ...newPro, stock: e.target.value })} className='border' /></p>
        <p>SIZE:<input type="text" value={newPro.size} placeholder="Enter size" onChange={(e) => setNewProduct({ ...newPro, size: e.target.value })} className='border' /></p>
        <p>COLOR:<input type="text" value={newPro.color} placeholder="Enter color" onChange={(e) => setNewProduct({ ...newPro, color: e.target.value })} className='border' /></p>
        <button type='submit'>save</button>
      </div>
    </form>
  )
}

export default Admin_Create




