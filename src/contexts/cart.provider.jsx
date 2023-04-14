import { useEffect, useState } from "react";
import { CartContext } from "./cart.context";

// -- -- -- -- -- --
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
// -- -- -- -- -- --


// -- -- -- -- -- --
//  Helper function to determine if to completely remove item or decrease quantity of product already in cart
const removeCartItem = (cartItems, productToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );

    // check if quantity is 1, if it is, remove that item
    // --filter here sortof works in reverse. It's basically saying, for the item we want to remove, we check if it doesn't equal the cart item we're checking
    // --so it returns true, but if it does, it returns false. So if it returns false, it's removed and not returned to the array
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    }

    //return cart items with reduced quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToRemove.id
                ? {...cartItem, quantity: cartItem.quantity - 1}
                : cartItem
        );
    };
}
// -- -- -- -- -- --

// -- -- -- -- -- --
// Helper function to delete item from cart using x button
    const deleteCartItem = (cartItems, productToRemove) => {

        //simply filter out the item and return the rest
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)

    }

// -- -- -- -- -- --


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);


    //This runs on load, and has a dependency of the cartItems, so on change it recalculates
    // --we use the the .reduce() method here. It takes two args, total, which instantiates with the 0 below, and subsequently adds each cart item's quantity
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    // This calculates the cart total. It also makes use of .reduce() method
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
        setCartTotal(newCartTotal);
    }, [cartItems])
    
    //The addItemToCart function with the cartItems and productToAdd args are in the context file
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    // Function to remove item from cart, similar to above addItemToCart
    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    //Function to delete item from cart using x 
    const deleteItemFromCart = (productToRemove) => {
        setCartItems(deleteCartItem(cartItems, productToRemove))
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        addItemToCart, 
        cartCount, 
        removeItemFromCart, 
        deleteItemFromCart, 
        cartTotal };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};
