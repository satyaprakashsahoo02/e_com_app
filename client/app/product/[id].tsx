import { dummyProducts } from "@/assets/assets";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const product = dummyProducts.find((item) => item._id === id);

    if (!product) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
                    <Text style={{ fontSize: 20, fontWeight: "600" }}>Product not found</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
                <Image
                    source={{ uri: product.images[0] }}
                    style={{ width: "100%", height: 360, borderRadius: 20, marginBottom: 16 }}
                    resizeMode="cover"
                />
                <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 8 }}>{product.name}</Text>
                <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 12 }}>
                    ${product.price.toFixed(2)}
                </Text>
                <Text style={{ color: "#555555", lineHeight: 22 }}>{product.description}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
