import React, { Component } from 'react';
import { ChildComponent, FlatList, Text, StyleSheet, View, TextInput, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipcim } from "./IPcim";
const IP = require('./IPcim')

export default class Profil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            osszlista: [],
            regisztrdatum: [],
            felhasznalonev: "",
            latszodik: false,
            isLoading: true
        };
    }
    getRegisztracioDatum() {
        var bemenet = {
            bevitel1: this.state.felhasznalonev
        }
        fetch(IP.ipcim + 'regisztraciodatum', {
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }

        ).then((response) => response.json())
            .then((responseJson) => {
                (
                    console.log(responseJson),
                    this.state.regisztrdatum = responseJson, this.setState({ isLoading: false },));
            })
    }

    storeData3 = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@listaelemek', jsonValue)
        } catch (e) {
            // saving error
        }
    }
    storeData2 = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@localadatok', jsonValue)
        } catch (e) {
            // saving error
        }
    }
    getListakszama() {
        var bemenet = {
            bevitel1: this.state.felhasznalonev
        }
        fetch(IP.ipcim + 'felhasznaloossz', {
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }

        ).then((response) => response.json())
            .then((responseJson) => {
                (
                    this.state.osszlista = responseJson, this.setState({ isLoading: false },));
            })
    }
    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@felhasznalo')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {

        }
    }
    storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@felhasznalo', jsonValue)
        } catch (e) {
            // saving error
        }
    }
    componentDidMount() {
        this.getData().then((vissza_adatok2) => {
            this.setState({ felhasznalonev: vissza_adatok2 })
            this.state.felhasznalonev = vissza_adatok2
            this.getListakszama();
            this.getRegisztracioDatum();


        });
        this.navFocusListener = this.props.navigation.addListener('focus', () => {
            this.getData().then((vissza_adatok2) => {
                this.setState({ felhasznalonev: vissza_adatok2 })
                this.state.felhasznalonev = vissza_adatok2
                this.getListakszama();
                this.getRegisztracioDatum();

            });
        })

    }
    componentWillUnmount() {
        this.navFocusListener()
    }

    kilepes = () => {
        this.storeData([])
        this.storeData2([])
        this.storeData3([])
        this.props.navigation.navigate('Bejelentkezes');
    }


    render() {
        const { data, isLoading } = this.state;
        return (
            <View style={{ flexDirection: 'column', flex: 1, backgroundColor: "rgb(50,50,50)" }}>
                {isLoading ? <ActivityIndicator /> :
                    <View style={{ flex: 1, alignItems: "center" }} >
                        <Text style={{ fontSize: 25, color: "white" }}> {this.state.felhasznalonev} felhasználó adatai: </Text>
                    </View>}
                <View style={{ flex: 12 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 3, alignItems: "flex-start" }}>
                            <Text style={{ textAlign: "left", fontSize: 16, color: "white" }}> Általad létrehozott listák száma:</Text>
                            <Text style={{ textAlign: "left", fontSize: 16, marginTop: 10, marginBottom: 10, color: "white" }}> Felhasználó neved:</Text>
                            <Text style={{ textAlign: "left", fontSize: 16, marginTop: 10, marginBottom: 10, color: "white" }}> Regisztráció dátuma:</Text>
                            <Button title='Kijelentkezés' onPress={this.kilepes}></Button>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text><FlatList
                                data={this.state.osszlista}
                                keyExtractor={(item, index) => String(index)}
                                renderItem={({ item, key }) => (
                                    <View key={key}>
                                        <Text style={{ fontSize: 16, color: "white" }}>{item.osszes}</Text>
                                    </View>
                                )}
                            /></Text>

                            <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 20, color: "white" }}>{this.state.felhasznalonev}</Text>
                            <Text><FlatList
                                data={this.state.regisztrdatum}
                                keyExtractor={(item, index) => String(index)}
                                renderItem={({ item, key }) => (
                                    <View key={key}>
                                        <Text style={{ fontSize: 16, color: "white" }}>{item.datum}-{item.honap}</Text>
                                    </View>
                                )}
                            /></Text>
                        </View>







                    </View>
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
