import React, { useContext } from 'react'
import { myContext } from './Context'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  const { fetchData, setFetchdata, cartItems, setCartItems } = useContext(myContext)
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
    <>
      {/* Carousel Section */}
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {fetchData.map((item, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <div
                className="d-block w-100"
                style={{
                  backgroundImage:
                    "url('https://res.cloudinary.com/ddzertu1j/image/upload/v1761736187/pexels-laura-james-6101957_omgf3w.jpg')",
                  height: "400px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  justifyContent: "center",  // horizontally centers the content
                  alignItems: "center",      // vertically centers the content
                }}
              >
                <Link
                  to={`/product/${item.id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    flexDirection: "row", // image + text side by side
                    alignItems: "center",
                    gap: "30px",
                    padding: "20px 30px",
                    borderRadius: "12px",
                    justifyContent: "center", // centers image and text together
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "250px",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />

                  <div style={{ textAlign: "left" }}>
                    <h4 style={{ margin: "0 0 10px" }}>{item.name}</h4>
                    <p style={{ margin: "5px 0", fontSize: "18px", fontWeight: "bold" }}>
                      €{item.new_price}
                    </p>
                    <p
                      style={{
                        margin: "0",
                        textDecoration: "line-through",
                        color: "#2c2b2bff",
                        fontSize: "14px",
                      }}
                    >
                      €{item.old_price}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container mt-4">
        <div className="row">
          {/* above both is display products in row wise */}
          {fetchData.map((item, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-4" >
              {/* bootstrap gridstyle for responsive layout */}
              {/* bootstrap card is used here */}
              <div className="card" style={{ width: '18rem' }}>
                <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                  {/*  link to get each product in product details page */}
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
      </div></>
  )

}
export default Home