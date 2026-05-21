import React, { useContext, useEffect } from 'react'
import { myContext } from './Context'
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Signin from './Signin';

const ProductDetails = () => {

    const { userSelectedProduct, setUserSelectedProduct, cartItems, setCartItems, token, getCart } = useContext(myContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const getProductsById = async (id) => {

        try {
            // const res = await axios(`http://localhost:5000/api/item/get-itemById/${id}`
                            const res = await axios(`https://mypjtitemcatelogbe.onrender.com/api/item/get-itemById/${id}`

            )
            setUserSelectedProduct(res.data.data)


        } catch (error) {
            console.log(error)
            setUserSelectedProduct(error.response.data.data)
        }
    }

    useEffect(() => {
        getProductsById(id)
    }, [id])


    // addcrtproducts is already in useContext.apply.so below is duplicate code we can delete this and share from usecontext to this comp
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
            await getCart()       //Fetches the updated cart again from backend.

        } catch (error) {
            console.log(error)
        }
    }
    const handleCartAddSubmit = (product) => {
        if (!token) {

            navigate('/Signin', { state: { fromProductDetails: true, productId: product._id } });
        } else {
            // user is logged in
            addCartProducts(product._id);
        }
    };

    return (
        <div>
            {userSelectedProduct && (
                <div className="card mb-3" style={{ maxWidth: '940px' }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={userSelectedProduct.image} className="img-fluid rounded-start" alt={userSelectedProduct.name} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Name:{userSelectedProduct.name}</h5>
                                <h5 className="card-text">Category:{userSelectedProduct.category}</h5 >
                                <h5 className="card-text">New_Price:{userSelectedProduct.new_price}</h5 >

                                <h5 className="card-text">Old_Price:{userSelectedProduct.old_price}</h5 >

                                <h5 className="card-text">Stock:{userSelectedProduct.stock}</h5 >

                                <h5 className="card-text">Size:{userSelectedProduct.size}</h5 >
                                <h5 className="card-text">Color:{userSelectedProduct.color}</h5 >

                                <button onClick={() => handleCartAddSubmit(userSelectedProduct)} style={{ background: 'gold', borderRadius: '3px', padding: '4px', cursor: 'pointer' }}>AddToCart</button>
                            {/* onClick={() => handleCartAddSubmit(userSelectedProduct)}- run only when clicked
                            onClick={handleCartAddSubmit(userSelectedProduct)}- run immediately */}
                            {/* There each button has a different product, so passing userSelectedProduct becomes useful.
                            product is just a parameter name, here product == userSelectedProduct
You are manually passing userSelectedProduct
It helps make the function reusable and clean */}
                            
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )

}
export default ProductDetails



