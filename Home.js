import React, { Component } from "react";
import { Animated, PanResponder, StyleSheet, View, Dimensions, TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';



export default class Fooldal extends Component {
    pan = new Animated.ValueXY();
    panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            { dx: this.pan.x, dy: this.pan.y },],
            { useNativeDriver: false }
        ),
        onPanResponderRelease: () => {
            Animated.spring(this.pan, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: false,
            }).start();
        },
    });
    constructor(props) {
        super(props);
        this.state = {
            felhasznalonev: "",
            timePassed: false
        };
    }

    listaletrehozas = () => {
        this.props.navigation.navigate('Listalétrehozás');
    }
    componentDidMount() {


    }



    render() {
        return (
            <View style={styles.container}>

                <Animated.View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        margin: 25,
                        zIndex: 2,
                        transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }],
                    }}
                    {...this.panResponder.panHandlers}>
                    <View style={{ flex: 1, backgroundColor: "696969" }}>
                        <TouchableOpacity
                            onPress={(this.listaletrehozas)}
                            style={{ backgroundColor: "rgb(1,194,154)", width: 65, alignSelf: "flex-end", alignItems: "center", borderRadius: 150 / 2, height: 65, justifyContent: "center", zIndex: 1, }}>
                            <FontAwesome5 name="plus" size={20} color="white" />
                        </TouchableOpacity>

                    </View>
                </Animated.View>

            </View>
        );
    }
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgb(50,50,50)"

    },

});
