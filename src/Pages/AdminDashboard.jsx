import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Admin_Create from './Admin_Create';
import Admin_DeleteProduct from './Admin_DeleteProduct';
import Admin_Edit from './Admin_Edit';
import Admin_GetEachProduct from './Admin_GetEachProduct'
import { myContext } from '../Components/Context';

const AdminDashboard = () => {
  const { fetchData, setFetchdata } = useContext(myContext)
  const [readEachPro, setReadEachProduct] = useState()
  const [editEachPro, setEditEachProduct] = useState()
  const [deleteEachPro, setDeleteEachProduct] = useState()
  const [adminMode, setAdminMode] = useState("")
  const [newPro, setNewProduct] = useState({
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
  })

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const res = await axios("http://localhost:5000/api/item/get-item")
      const sortedData = res.data.data.sort((a, b) => a.id - b.id)
      setFetchdata(sortedData);

    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <div>
      <h1>AdminDashboard</h1>
      <div> {/* fetchData */}
        <div className="overflow-x-auto">
          <table className='border-4 border-gray-300 min-w-full text-xs sm:text-sm md:text-base'>
            <thead className='border-4 border-gray-300 text-center'>
              <tr>
                <th className='border-4 border-gray-300'>ID</th>
                <th className='border-4 border-gray-300'>NAME</th>
                <th className='border-4 border-gray-300'>IMAGE</th>
                <th className='border-4 border-gray-300'> CATEGORY</th>
                <th className='border-4 border-gray-300'> NEW_PRICE</th>
                <th className='border-4 border-gray-300'>OLD_PRICE</th>
                <th className='border-4 border-gray-300'>DATE</th>
                <th className='border-4 border-gray-300'>STOCK</th>
                <th className='border-4 border-gray-300'>SIZE</th>
                <th className='border-4 border-gray-300'>COLOR</th>
                <th>OPERATION</th>
              </tr>
            </thead>
            <tbody >
              {fetchData.map((item, index) => (
                <tr key={index} className='border-4 border-gray-300 text-center'>
                  <td className='border-4 border-gray-300'>  {item.id}</td>
                  <td className='border-4 border-gray-300'>{item.name}</td>
                  <td className='border-4 border-gray-300 w-20 h-20 object-cover'>
                    {item.image ? (
                      <img src={item.image} alt={item.name} className='w-20 h-20 object-cover' />
                    ) : (
                      <div className='w-20 h-20 bg-gray-200 flex items-center justify-center'>
                        No Image
                      </div>
                    )}
                  </td>
                  <td className='border-4 border-gray-300'>{item.category}</td>
                  <td className='border-4 border-gray-300'>{item.new_price}</td>
                  <td className='border-4 border-gray-300'>{item.old_price}</td>
                  <td className='border-4 border-gray-300'>{item.date}</td>
                  <td className='border-4 border-gray-300'>{item.stock}</td>
                  <td className='border-4 border-gray-300'>{item.size}</td>
                  <td className='border-4 border-gray-300'>{item.color}</td>
                  <td><button onClick={() => { setReadEachProduct(item); setAdminMode("geteach") }}>GetEach</button></td>
                  <td><button onClick={() => { setEditEachProduct(item); setAdminMode("edit") }}>Edit</button></td>
                  <td><button onClick={() => { setDeleteEachProduct(item); setAdminMode("delete") }}>Delete</button></td>
                  {/* you pass in button      function signature(you receive)                          you use(inside asiox) */}
                  {/* deleteData(item.id)              id                                                        id */}
                  {/* deleteData(item)                 item                                                      item.id     */}
                  {/* both are same and using individualitem's id only */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>  </div>
      <div><button onClick={() => setAdminMode("create")}>create</button></div>
      {adminMode === "geteach" && (<Admin_GetEachProduct readEachPro={readEachPro} setReadEachProduct={setReadEachProduct} getProducts={getProducts} />)}
      {adminMode === "create" && (<Admin_Create newPro={newPro} setNewProduct={setNewProduct} getProducts={getProducts} />)}
      {adminMode === "edit" && (<Admin_Edit editEachPro={editEachPro} setEditEachProduct={setEditEachProduct} getProducts={getProducts} />)}
      {adminMode === "delete" && (<Admin_DeleteProduct deleteEachPro={deleteEachPro} setDeleteEachProduct={setDeleteEachProduct} getProducts={getProducts} />)}
    </div>);
};
export default AdminDashboard










