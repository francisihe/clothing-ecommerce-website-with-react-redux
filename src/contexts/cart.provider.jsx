import { useState } from "react";
import { CartContext } from "./cart.context";

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = { isCartOpen, setIsCartOpen };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};
