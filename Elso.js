import React, { Component } from 'react';
import { ChildComponent, FlatList, Text, StyleSheet, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipcim } from "./IPcim";
const IP = require('./IPcim')


export default class Kiir extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [""],
            felhasznalonev: "",
        };
    }

    //felhasznalonev tarolasnak lekerese
    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@felhasznalo')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {

        }
    }
    adatLekeres(){
        this.getData().then((vissza_adatok2) => {
            this.setState({ felhasznalonev: vissza_adatok2 })
            this.state.felhasznalonev = vissza_adatok2
            var bemenet = {
                bevitel1: this.state.felhasznalonev
            }
            //szűrt adatok lefetchelése backendről
            fetch(IP.ipcim + 'felhasznalolistai', {
                method: "POST",
                body: JSON.stringify(bemenet),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }
            ).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ data: responseJson, }, function () { });
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    componentDidMount() {
        this.getData().then((vissza_adatok2) => {
            this.setState({ felhasznalonev: vissza_adatok2 })
            this.state.felhasznalonev = vissza_adatok2
            var bemenet = {
                bevitel1: this.state.felhasznalonev
            }
            //szűrt adatok lefetchelése backendről
            fetch(IP.ipcim + 'felhasznalolistai', {
                method: "POST",
                body: JSON.stringify(bemenet),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }
            ).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ data: responseJson, }, function () { });
                })
                .catch((error) => {
                    console.error(error);
                });
        });
        this.navFocusListener = this.props.navigation.addListener('focus', () => {
            this.getData().then((vissza_adatok2) => {
                this.setState({ felhasznalonev: vissza_adatok2 })
                this.state.felhasznalonev = vissza_adatok2
                var bemenet = {
                    bevitel1: this.state.felhasznalonev
                }
                //szűrt adatok lefetchelése backendről
                fetch(IP.ipcim + 'felhasznalolistai', {
                    method: "POST",
                    body: JSON.stringify(bemenet),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                }
                ).then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({ data: responseJson, }, function () { });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        })
    }
    componentWillUnmount() {
        this.navFocusListener();
    }



    render() {
        return (
            <View
                style={{ flexDirection: 'column', flex: 1,backgroundColor:"rgb(50,50,50)" }}>
                <View style={{ flex: 1, alignSelf: "center" }} ><Text style={{ fontSize: 30,color:"white" }}> Üdv!{this.state.felhasznalonev} </Text></View>
                <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
                >{this.state.data.map((item, key) => <Text key={key}>{item.listak_nev}</Text>)}
                </View>

            </View>
        );
    }
};

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "blue",
        width: 180
    },
    countContainer: {
        alignItems: "center",
        padding: 10
    }
});
