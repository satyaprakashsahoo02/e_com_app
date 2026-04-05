import { dummyCart, dummyProducts } from "@/assets/assets";
import { Product } from "@/constants/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type CartItem = {
    id: string;
    productId: string;
    product: Product;
    quantity: number;
    size: string;
    price: number;
};

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (product: Product, size: string) => Promise<void>;
    removeFromCart: (itemId: string, size: string) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number, size: string) => Promise<void>;
    clearCart: () => Promise<void>;
    cartTotal: number;
    itemCount: number;
    isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);

    const fetchCart = async () => {
        setIsLoading(true);

        const mappedItems: CartItem[] = dummyCart.items.map((item) => {
            const fullProduct =
                dummyProducts.find((product) => product._id === item.product._id) ??
                ({
                    ...item.product,
                    description: "",
                    category: "Other",
                    ratings: { average: 0, count: 0 },
                    isFeatured: false,
                    isActive: true,
                    createdAt: dummyCart.createdAt,
                } as Product);

            return {
                id: item._id,
                productId: item.product._id,
                product: fullProduct,
                quantity: item.quantity,
                size: item.size || "M",
                price: item.price,
            };
        });

        setCartItems(mappedItems);
        setCartTotal(dummyCart.totalAmount);
        setIsLoading(false);
    };

    const addToCart = async (_product: Product, _size: string) => {};

    const removeFromCart = async (_itemId: string, _size: string) => {};

    const updateQuantity = async (_itemId: string, _quantity: number, _size: string) => {};

    const clearCart = async () => {
        setCartItems([]);
        setCartTotal(0);
    };

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                itemCount,
                isLoading,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }

    return context;
}
