import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { createContext, type ReactNode, useEffect, useState } from "react";

export interface CartItem {
    product: ProductDTO;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
}

type CartContextType = {
    cart: Cart;
    addProduct: (product: ProductDTO, quantity?: number) => void;
    removeProductCart: (productId: string) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartContextProviderProps = {
    children: ReactNode;
};

export function CartContextProvider({ 
    children
 }: CartContextProviderProps) {

    
    const [cart, setCart] = useState<Cart>({ items: [] });

    //Salva carrinho sempre que mudar
    useEffect (() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    },[cart])

    //Carrega Carrinho do LocalStorage quando iniciar

    useEffect (() => {
        const storedCart = localStorage.getItem('cart');
        console.log('Entrei 2:', storedCart);
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch  {
                setCart({ items: [] });
            }
        }
    },[])

    function addProduct(product: ProductDTO, quantity: number= 1) {
       
        setCart((prevCart: Cart) => {
            const existingItem = prevCart.items.find((item) => item.product.id === product.id);

            let updatedItems: CartItem[];

            if(existingItem) {
               //Produto existe no carrinho
               updatedItems = prevCart.items.map((item) => 
                   item.product.id === product.id 
                   ? { ...item, quantity: item.quantity + quantity } 
                   : item
               ) 
            } else {
                //Produto não existe no carrinho
                updatedItems = [...prevCart.items, { product, quantity }];
            }

            return { items: updatedItems };

        });
    }

    function removeProductCart(productId: string) {
        setCart((prevCart: Cart) => (
            {
                items: prevCart.items.filter((item) => item.product.id !== productId),
            }
        ));
    }


    return (
        <CartContext.Provider value={{ cart, addProduct, removeProductCart }}>
            {children}
        </CartContext.Provider>
    )
}
