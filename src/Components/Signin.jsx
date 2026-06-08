import React, { useContext, useState } from 'react'
import { myContext } from './Context'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Cart from './Cart'
import ProductDetails from './ProductDetails'

const Signin = () => {

  const { token, setToken, cartItems, setCartItems, username, setUserName } = useContext(myContext)
  const location = useLocation();
  const navigate = useNavigate();
  const [responseMsg, setResponseMsg] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  const signIn = async () => {
    const payloads = { username, password }
    try {

      // const res = await axios.post("http://localhost:5000/api/item/login-user", payloads)
            const res = await axios.post("https://mypjtitemcatelogbe.onrender.com/api/item/login-user", payloads)

      setResponseMsg(res.data.message || "login successful")

      setToken(res.data.token)
      setUserName(res.data.username)
      if (location.state?.fromProductDetails && location.state?.productId) {
        try {
          const addRes = await axios.post(
            // `http://localhost:5000/api/item/add-cart/${location.state.productId}`,
                        `https://mypjtitemcatelogbe.onrender.com/api/item/add-cart/${location.state.productId}`,

            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          setCartItems(addRes.data.data.items);
          alert("✅ Product added to cart after login!");
        } catch (error) {
          console.log("Error adding product after login:", error.response?.data || error);
        }
      }
      navigate("/");

    } catch (error) {
      setResponseMsg(error.response?.data?.message || "Login failed");
    }
  }

  const registerUser = async () => {
    const registerPayloads = { email, username, password }
    try {
      // const res = await axios.post("http://localhost:5000/api/item/register-user", registerPayloads)
            const res = await axios.post("https://mypjtitemcatelogbe.onrender.com/api/item/register-user", registerPayloads)

      setResponseMsg(res.data.message)


    } catch (error) {
      setResponseMsg(error.response.data.message || "register failed")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn()
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    registerUser()
  }

  return (
    <div>
      {/* The ! is only reversing the value for the conditional check, it doesn’t mutate the state. */}
      {!isRegister ? (
        <>
          <h3>Signin</h3><br />
          <h4>To add items to Cart!!</h4><br />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="border-2 block mb-2"
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 block mb-2"
              // this is tailwindcss
              placeholder="Password"
            />
            <button type="submit" className="border-2 px-2 py-1 bg-gray-200" style={{ backgroundColor: "blue" }}>
              Signin
            </button>
          </form>
          <p>{responseMsg}</p>

          <p className="mt-2">
            New to ItemCatalog?{' '}
            <span
              onClick={() => setIsRegister(true)}
              style={{ color: 'blue', cursor: 'pointer' }}
            // this is css
            >
              Create an account
            </span>
          </p>
        </>
      ) : (
        <>
          <h3>Register</h3>
          <form onSubmit={handleRegisterSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 block mb-2"
              placeholder="Email"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="border-2 block mb-2"
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 block mb-2"
              placeholder="Password"
            />
            <button type="submit" className="border-2 px-2 py-1 bg-gray-200" style={{ backgroundColor: "blue" }}>
              Register
            </button>
          </form>
          <p>{responseMsg}</p>

          <p className="mt-2">
            Already have an account?{' '}
            <span
              onClick={() => setIsRegister(false)}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              Sign in here

            </span>
          </p>
        </>
      )}
    </div>
  )
}

export default Signin

