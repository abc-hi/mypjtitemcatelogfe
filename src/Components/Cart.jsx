import React, { useContext, useEffect, useState } from 'react'
import { myContext } from './Context'
import { Navbar } from './Navbar'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Cart = () => {
  const { cartItems, setCartItems, token, setToken, addCartProducts, getCart } = useContext(myContext)

  useEffect(() => {
    if (token)
      getCart()
  }, [token])
  useEffect(() => {
  }, [cartItems]);

  const removeCartProducts = async (productId) => {
    try {
      // const res = await axios.delete(`http://localhost:5000/api/item/remove-cart/${productId}`,
            const res = await axios.delete(`https://mypjtitemcatelogbe.onrender.com/api/item/remove-cart/${productId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setCartItems(res.data.items)
      await getCart()

    }
    catch (error) {
      console.log("error", error)
    }
  }
  return (
    
    <div>
      <h3>
      Cart items:{" "}
      {cartItems?.reduce((total, item) => total + item.quantity, 0) || 0}
    </h3>
    {cartItems?.reduce((total, item) => total + item.quantity, 0) > 0 ? (
        cartItems.map((item, index) => (
          <div key={index}>
            <div className="card mb-3" style={{ maxWidth: '940px' }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.productId.image}
                    className="img-fluid rounded-start"
                    alt={item.productId.name}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">

                    <h5 className="card-title">Name: {item.productId.name}</h5 >
                    <h5 className="card-text">Category: {item.productId.category}</h5 >
                    <h5 className="card-text">New Price: {item.productId.new_price}</h5 >
                    <h5 className="card-text">Old Price: {item.productId.old_price}</h5 >
                    <h5 className="card-text">Stock: {item.productId.stock}</h5>
                    <h5 className="card-text">Size: {item.productId.size}</h5 >
                    <h5 className="card-text">Color: {item.productId.color}</h5 >
                    <h5 className="card-text">Quantity: {item.quantity}</h5 >

                    <div style={{ borderRadius: '10px', border: "4px solid gold", cursor: 'pointer', padding: "2px 6px", alignItems: 'center', display: 'flex', gap: '18px', fontSize: "28px", lineHeight: '1', maxWidth: '65px' }}>
                      <button onClick={() => addCartProducts(item.productId._id)}>+</button>
                      <button onClick={() => removeCartProducts(item.productId._id)} >-</button> </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <> <p>Your cart is empty !</p>
          <div style={{ display: 'flex', flexDirection: "row", gap: '22px' }}>
            <img src="https://res.cloudinary.com/ddzertu1j/image/upload/v1761218971/cart2_opkwzv.jpg" className='max-w-64' alt="sample image" style={{ maxWidth: '20%', marginLeft: '16px' }} /><br />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}> <p>To visit ItemCategory products</p>
              <Link to='/signin'>signin to your account</Link></div></div>
        </>

      )}
    </div>
  );
};
export default Cart