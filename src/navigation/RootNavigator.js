import React from "react";
import {
    ActivityIndicator,
    View,
    StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useCashbook } from "../context/CashbookContext";
import Login from "../pages/Login";
import Home from "../pages/Home";
import BookDetail from "../pages/BookDetail";
import AddEntry from "../pages/AddEntry";
import Settings from "../pages/Settings";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const { loading, profile } = useCashbook();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0f766e" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            >
                {profile ? (
                    <>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="BookDetail" component={BookDetail} />
                        <Stack.Screen name="AddEntry" component={AddEntry} />
                        <Stack.Screen name="Settings" component={Settings} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={Login} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc", // canvas
    },
});
