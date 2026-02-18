import React, { createContext, useState } from 'react'
import AdminDashboard from '../Pages/AdminDashboard'
import Home from './Home';
import { useEffect } from 'react';
import axios from 'axios';


export const myContext = createContext()

const Context = ({ children }) => {

  const [fetchData, setFetchdata] = useState([])
  const [userViewProducts, setUserViewProducts] = useState([])
  const [userSelectedProduct, setUserSelectedProduct] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [token, setToken] = useState(null)
  const [username, setUserName] = useState('')

  //  Sync token from localStorage on initial mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  //  Keep localStorage in sync with token state
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      addCartProducts()
      getCart()

    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');

      setCartItems([])

    }
  }, [token]);

  const addCartProducts = async (productId) => {
    try {
      // const res = await axios.post(`http://localhost:5000/api/item/add-cart/${productId}`, {},
              const res = await axios.post(`https://mypjtitemcatelogbe.onrender.com/api/item/add-cart/${productId}`, {},

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
      )
      setCartItems(res.data.items)
      await getCart()
    } catch (error) {
    }
  }
  const getCart = async () => {
    try {
      // const res = await axios.get('http://localhost:5000/api/item/get-cart', {
              const res = await axios.get('https://mypjtitemcatelogbe.onrender.com/api/item/get-cart', {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCartItems(res.data.items)

    } catch (error) {
      console.log(error.response?.data || error)
      setCartItems([])
    }

  }
  return (
    <div><myContext.Provider value={{ fetchData, setFetchdata, userViewProducts, setUserViewProducts, userSelectedProduct, setUserSelectedProduct, cartItems, setCartItems, token, setToken, addCartProducts, getCart, username, setUserName }}>
      {/* here we are not converting array into obj but only we send arr as obj for our convenient */}
      {children}
    </myContext.Provider></div>
  )
}

export default Context