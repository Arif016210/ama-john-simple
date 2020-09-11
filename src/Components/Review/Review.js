import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = (ProductKey) => {
        console.log('Remove Product', ProductKey);
        const newCart = cart.filter(pd => pd.key !== ProductKey)
        setCart(newCart);
        removeFromDatabaseCart(ProductKey);
    }

    // const removeProduct = (ProductKey) => {
    //     console.log('Remove Product', ProductKey);
    //     const newCart = cart.filter(pd => pd.key !== ProductKey);
    //     setCart(newCart);
    //     removeFromDatabaseCart(ProductKey);
    // }

    useEffect(() => {
        //cart
        const savedData = getDatabaseCart();
        const productKeys = Object.keys(savedData);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedData[key];
            return product;
        });
        setCart(cartProducts);
    }, []);

    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={happyImage} alt="" />
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        removeProduct={removeProduct}
                        // removeProduct={removeProduct}
                        product={pd} ></ReviewItem>)
                }
                {thankyou}
            </div>
            <div className="cart-container">
                <Cart cart={cart} >
                    <button onClick={handlePlaceOrder} className="cart-btn">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;


