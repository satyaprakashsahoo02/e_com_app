import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

export default function AddProductScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
                <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8 }}>Add Product</Text>
                <Text style={{ textAlign: "center", color: "#666" }}>
                    Image upload tools are not installed in this build yet.
                </Text>
            </View>
        </SafeAreaView>
    );
}
