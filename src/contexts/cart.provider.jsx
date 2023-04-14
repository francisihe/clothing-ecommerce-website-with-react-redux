import { useEffect, useState } from "react";
import { CartContext } from "./cart.context";


//Helper function to look through the cart, to determine if to add or increase the quantity of already contained product
const addCartItem = (cartItems, productToAdd) => {

    // check if cartItems already has productToAdd
    // -- basically says check each item's id, if equal to products id, return boolean
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // map over the cart items to create a similar array, if it does contain an item, increase quantity by 1, else return existing items in the cart
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        );
    };

    // return array with modified cartItems with new item in it
    return [...cartItems, {...productToAdd, quantity: 1}];
}


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    //The addItemToCart function with the cartItems and productToAdd args are in the context file
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    //This runs on load, and has a dependency of the cartItems, so on change it recalculates
    // --we use the the .reduce() method here. It takes two args, total, which instantiates with the 0 below, and subsequently adds each cart item's quantity
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};
