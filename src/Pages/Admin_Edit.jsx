import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Admin_Edit = ({ editEachPro, setEditEachProduct, getProducts }) => {
  // const navigate = useNavigate()
  const editData = async (item) => {
    const editPayloads = { name: item.name, image: item.image, category: item.category, new_price: item.new_price, old_price: item.old_price, date: item.date, stock: item.stock, size: item.size, color: item.color }
    try {
      const res = await axios.put(`http://localhost:5000/api/item/update-item/${item.id}`, editPayloads);
      setEditEachProduct(res.data.data);
      getProducts()

    } catch (error) {
      console.log(error)
    }
  }
  const handleEditSubmit = (e) => {
    e.preventDefault();
    editData(editEachPro);
  }
  return (
    <div>
      {editEachPro && (
        <form onSubmit={handleEditSubmit}>
          <div className='border p-4'>
            <p> <input type="text" value={editEachPro?.id || ""} onChange={(e) => setEditEachProduct({ ...editEachPro, id: e.target.value })} /></p>
            {/* here ...editEachPro holds all other fields when id is updating */}
            {/* since it is input and input return string or number here fallback i.e || "" is used(meaning if no value it should return string ) */}
            <p> <input type="text" value={editEachPro?.name || ""} onChange={(e) => setEditEachProduct({ ...editEachPro, name: e.target.value })} /></p>
            {/* when the component first loads, editEachPro is undefined — no product has been selected for editing yet. If you try to access editEachPro.name directly, React will throw an error because you're asking for a property on something that doesn't exist.
So the || "" part is a fallback — it prevents errors and keeps the input field from crashing while waiting for data. */}

            <p>
              <input
                type="text"
                placeholder="Paste Cloudinary image URL"
                value={editEachPro.image || ""}
                onChange={(e) =>
                  setEditEachProduct({ ...editEachPro, image: e.target.value })
                }
              />
            </p>

            {editEachPro.image ? (
              <img src={editEachPro.image} alt={editEachPro.name} className="w-20 h-20 object-cover" />
            ) : (
              <div className="w-20 h-20 bg-gray-200 flex items-center justify-center">No Image</div>
            )}
            <p><input type="text" value={editEachPro?.category || ""} onChange={(e) => setEditEachProduct({ ...editEachPro, category: e.target.value })} /></p>
            <p><input type="text" value={editEachPro?.new_price || ""} onChange={(e) => setEditEachProduct({ ...editEachPro, new_price: e.target.value })} /></p>
            <p> <input type="text" value={editEachPro?.old_price || ""} onChange={(e) => setEditEachProduct({ ...editEachPro, old_price: e.target.value })} /></p>
            <p><input type="text" value={editEachPro?.date || ""} onChange={(e) => setEditEachProduct({ ...editEachPro, date: e.target.value })} /></p>
            <p> <input type="text" value={editEachPro?.stock || ""} onChange={(e) => setEditEachProduct({ ...editEachPro, stock: e.target.value })} /></p>
            <p><input type="text" value={editEachPro?.size || ""} onChange={(e) => setEditEachProduct({ ...editEachPro, size: e.target.value })} /></p>
            <p><input type="text" value={editEachPro?.color || ""} onChange={(e) => setEditEachProduct({ ...editEachPro, color: e.target.value })} /></p>
            <button type='submit'>save</button>
          </div></form>
      )}
    </div>
  )
}

export default Admin_Edit