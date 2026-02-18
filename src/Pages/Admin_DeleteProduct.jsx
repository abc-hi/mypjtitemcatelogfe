import React from 'react'
import axios from 'axios';

const Admin_DeleteProduct = ({ deleteEachPro, setDeleteEachProduct, getProducts }) => {
  //deleteProduct

  const deleteData = async (id) => {
    try {
      // const res = await axios.delete(`http://localhost:5000/api/item/delete-item/${id}`)
            const res = await axios.delete(`https://mypjtitemcatelogbe.onrender.com/api/item/delete-item/${id}`)

      setDeleteEachProduct(res.data.data)
      getProducts()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="p-4 border">
      <h2>Delete Product</h2>
      {deleteEachPro ? (
        <div>
          <p>Are you sure you want to delete <strong>{deleteEachPro.name}</strong>?</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => deleteData(deleteEachPro.id)}
          >
            Confirm Delete
          </button>
        </div>
      ) : (
        <p>No product selected for deletion.</p>
      )}
    </div>
  );
};

export default Admin_DeleteProduct