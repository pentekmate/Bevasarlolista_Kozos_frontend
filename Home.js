import React, { Component } from "react";
import { Animated, PanResponder, StyleSheet, View, Dimensions, TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { ipcim } from "./IPcim";
import { ScrollView } from "react-native-gesture-handler";
const IP = require('./IPcim')


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
            timePassed: false,
            id:0
        };
    }
    getID = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@ID')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {

        }
    }

    listaletrehozas = () => {
        this.props.navigation.navigate('Listalétrehozás');
    }
    componentDidMount() {
      

    
           
        
    }
    componentWillUnmount(){
       
    }

    render() {
        return (
            <View style={styles.container}>
            <View style={{flex:0.5,backgroundColor:"green"}}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
               
                >
                    <View style={{backgroundColor:"red",height:height*1,width:width*1}}><Text>s</Text></View>
                    <View style={{backgroundColor:"blue",height:height*0.1,width:width*1}}><Text>s</Text></View>
                </ScrollView>


            </View>
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
                    <Text>{this.state.felhasznalonev}</Text>
            </View>
        );
    }
}
const { width,height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgb(50,50,50)"

    },

});