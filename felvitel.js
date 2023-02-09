import * as React from 'react';
import { List } from 'react-native-paper';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipcim } from "./IPcim";
const IP = require('./IPcim')
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';


class Felvitel extends React.Component {
    state = {
        adatok: [],
        tartalom: [],
        felhasznalonev: "",
        isLoading: true,
        active: false
    }
    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@felhasznalo')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {

        }
    }

    getLista() {
        var bemenet = {
            bevitel1: this.state.felhasznalonev
        }
        fetch(IP.ipcim + 'felhasznalolistaikesz', {
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }
        ).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ adatok: responseJson })
            })
            .catch((error) => {
                console.error(error);
            });


    }
    componentDidMount() {
        this.getData().then((vissza_adatok2) => {
            this.setState({ felhasznalonev: vissza_adatok2 })
        }).then(this.getLista()).then(this.setState({ isLoading: false }))

        let tartalomSplitelve = "";
        for (let i = 0; i < this.state.adatok.length; i++) {
            tartalomSplitelve = this.state.adatok[i].listak_tartalom.split(',')
            this.state.adatok[i].listak_tartalom = tartalomSplitelve
            this.state.adatok[i].kinyitott = false
        }
        this.navFocusListener = this.props.navigation.addListener('focus', () => {
            this.getLista()
        })
    }

    componentWillUnmount() {
        this.navFocusListener();
        this.getLista();
    }
    _handlePress = (id) => {
        let tombmentese = this.state.adatok
        for (let i = 0; i < this.state.adatok.length; i++) {
            if (this.state.adatok[i].listak_id == id) {
                tombmentese[i].kinyitott = !tombmentese[i].kinyitott

            }
            else {
                tombmentese[i].kinyitott = false
            }
            this.setState({ adatok: tombmentese })
            //console.log(JSON.stringify(tombmentese))

        }
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

    getlistakid = (id) => {
        let uj = [];
        let megujabb = [];
        this.state.adatok.map((item) => {
            if (item.listak_id == id) {
                megujabb = item.listak_tartalom.split(',')
            }
        });
        for (let i = 0; i < megujabb.length; i++) {
            uj.push({ nev: megujabb[i], isChecked: false, id: i })
            this.setState({ tartalom: uj })
        }

    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "rgb(50,50,50)" }}>
                <SafeAreaView></SafeAreaView>
                {this.state.isLoading ? <ActivityIndicator size={"large"} /> :
                    this.state.adatok.length > 0 ?
                        <FlatList
                            data={this.state.adatok}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={({ item }) =>
                            (<List.Section>
                                <List.Accordion
                                    theme={{ colors: { background: 'rgb(1,194,154)' } }}
                                    right={props => <AntDesign name="caretdown" size={20} color="rgb(1,194,154)" />}
                                    title={<Text style={styles.Title}>{item.listak_nev}</Text>}
                                    description={<Text style={{ color: "rgb(1,194,154)" }}>{this.getParsedDate(item.listak_keszdatum)}</Text >}
                                    style={styles.lista}
                                    expanded={item.kinyitott}
                                    onPress={() => { this._handlePress(item.listak_id); this.getlistakid(item.listak_id); this.setState({ active: true }) }}
                                    onLongPress={() => this.props.navigation.navigate('Szerkeszt', { aktid: item.listak_id })}>

                                    <FlatList
                                        data={this.state.tartalom}
                                        renderItem={({ item }) => (
                                            <List.Item title={item.nev} titleStyle={{ color: "white" }}></List.Item>
                                        )} />
                                    <View>
                                        <Text style={{ fontSize: 20, textAlign: "right", marginRight: 10, color: "white" }}>{item.listak_ar} Ft</Text>
                                    </View>
                                </List.Accordion>
                            </List.Section>
                            )} />
                        : <View style={{ alignSelf: "center", flex: 1, justifyContent: "center" }}>
                            <Text style={{ color: "white", fontSize: 15, margin: 10 }}>Úgy tűnik jelenleg nem fejeztél be egy listát sem.</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("Listák")}>
                                <Text style={{ alignSelf: "center", color: "rgb(1,194,154)", fontSize: 20 }}>Listáim megtekintése!</Text>
                            </TouchableOpacity>
                        </View>}

            </View>

        );
    }
}
const styles = StyleSheet.create({
    Title: {
        color: "white",
        fontSize: 20,
        textAlignVertical: "top",
    },
    lista: {
        backgroundColor: "rgb(32,32,32)",
        borderTopRightRadius: 15,
    }

});


export default Felvitel;