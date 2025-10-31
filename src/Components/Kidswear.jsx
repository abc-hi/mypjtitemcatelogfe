import React, { useContext } from 'react'
import { myContext } from './Context'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Kidswear = () => {
  const { userViewProducts, setUserViewProducts } = useContext(myContext)
  const getProducts = async () => {
    try {
      const res = await axios("http://localhost:5000/api/item/get-item")
      const filteredData = res.data.data.filter(item => item.category === "Kid's Wear")
      const sortedData = filteredData.sort((a, b) => a.id - b.id);
      setUserViewProducts(sortedData)
    }
    catch (error) {
      console.log("error", error)
    }
  }
  useEffect(() => {
    getProducts()
  })
  return (

    <div className="container mt-4">
      <div className="row">
        {userViewProducts.map((item, index) => (
          <div key={index} className="col-md-4 col-sm-6 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                <img src={item.image} className="card-img-top" alt={item.name} />
                <div className="card-body" style={{ color: 'black' }}>
                  <p className="card-text">{item.name}</p>
                  <p className="card-text">{item.category}</p>
                  <p className="card-text">€{item.new_price}</p>
                  <p className="card-text">€{item.old_price}</p>
                </div></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Kidswear