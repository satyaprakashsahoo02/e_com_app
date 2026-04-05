import { dummyProducts } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/constants/types";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShopScreen() {
    const { category } = useLocalSearchParams<{ category?: string }>();

    const getCategoryName = (product: Product) => {
        if (typeof product.category === "string") {
            return product.category;
        }

        return (product.category as { name?: string }).name ?? "";
    };

    const visibleProducts: Product[] = category
        ? dummyProducts.filter((product) => {
              const productCategory = getCategoryName(product);

              return productCategory.toLowerCase() === category.toLowerCase();
          })
        : dummyProducts;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }}>
                <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 8 }}>Shop</Text>
                <Text style={{ color: "#666666", marginBottom: 16 }}>
                    {category ? `Browsing ${category}` : "Browse all products"}
                </Text>

                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                    {visibleProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
