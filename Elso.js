import React, { Component } from 'react';
import { FlatList, Text, StyleSheet, View,TouchableOpacity} from 'react-native';
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
    getParsedDate(strDate) {
        var strSplitDate = String(strDate).split(' ');
        var date = new Date(strSplitDate[0]);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date = yyyy + "-" + mm + "-" + dd;
        return date.toString();
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
            <View style={{ flex: 1, backgroundColor: "rgb(18,18, 18)" }}>
            <FlatList
                data={this.state.data}
                renderItem={({ item }) => (

                    <TouchableOpacity style={{ backgroundColor: "rgb(32,32, 32)", height: 60, justifyContent: 'center', marginTop: 10 }}
                        onPress={() => this.props.navigation.navigate('Seged', { aktid: item.listak_id, akttart: item.listak_tartalom })} ><Text style={{ marginLeft: 3, fontSize: 20, color: "white" }}>{item.listak_nev}{"\n"} {this.getParsedDate(item.listak_datum)}</Text></TouchableOpacity>

                )}
            />
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
