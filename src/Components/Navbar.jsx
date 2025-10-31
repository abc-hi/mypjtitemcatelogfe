import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { myContext } from './Context'
import { useEffect } from 'react'
import { Button } from 'bootstrap'

export const Navbar = () => {
  const { cartItems, setCartItems, token, setToken, username, setUserName } = useContext(myContext)

  const handleSignout = () => {
    setToken(null)
    setUserName('');
    localStorage.removeItem('token');
    localStorage.removeItem('username')
    setCartItems([]);
  }
  return (
    <div className='flex justify-between border-pink-200 p-5 border-2 rounded-md' style={{ backgroundColor: "#FFC107" }}>
      {/* Left side links */}
      <div className='space-x-6' style={{ display: 'flex', gap: '40px' }} >
        <Link to="/menswear" style={{ color: 'black', textDecoration: 'none' }} >men's wear</Link>
        <Link to="/kidswear" style={{ color: 'black', textDecoration: 'none' }}>kid's wear</Link>
        <Link to="/ladieswear" style={{ color: 'black', textDecoration: 'none' }}>ladies wear</Link>
      </div>

      {/* Right side links */}
      <div style={{ color: "black" }}><h4>{username ? `Welcome, ${username}` : 'welcome,Guest'}</h4></div>
      <div className='space-x-6'>
        <Link to="/cart" style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src="https://res.cloudinary.com/ddzertu1j/image/upload/v1759741516/icons8-shopping-cart-50_ftqlp9.png"
            alt="cart"
            style={{ width: '40px', height: '40px' }}
          />
          {/* Safe optional chaining */}
          {cartItems?.reduce((total, item) => total + item.quantity, 0) > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                fontWeight: 'bold',
                lineHeight: '1',
              }}
            >
              {cartItems?.reduce((total, item) => total + item.quantity, 0) || 0}
            </span>
          )}
        </Link>
        {token ? <button onClick={() => { handleSignout() }} style={{ color: 'black' }}>signout</button>
          : <Link to='/signin' style={{ color: 'black' }}>signin</Link>}

      </div>
    </div>
  )
}
