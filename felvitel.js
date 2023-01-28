import * as React from 'react';
import { List, Checkbox } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipcim } from "./IPcim";
const IP = require('./IPcim')



class Felvitel extends React.Component {
    state = {
        adatok: [],
        tartalom: [],
        felhasznalonev:""
    }
    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@felhasznalo')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {

        }
    }
    componentDidMount() {
        this.getData().then((vissza_adatok2) => {
            this.setState({ felhasznalonev: vissza_adatok2 })
          console.log(vissza_adatok2)
        }).then(this.getLista())

        let tartalomSplitelve = "";
        for (let i = 0; i < this.state.adatok.length; i++) {
            tartalomSplitelve = this.state.adatok[i].listak_tartalom.split(',')
            this.state.adatok[i].listak_tartalom = tartalomSplitelve
            this.state.adatok[i].kinyitott = false
        }
        this.navFocusListener = this.props.navigation.addListener('focus', () => { this.getLista(); })
    }

    componentWillUnmount() {
        this.navFocusListener();
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
        for (let i = 0; i < this.state.adatok.length; i++) {

        }
    }

    async getLista() {
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
                this.setState({ adatok: responseJson, }, function () { });
            })
            .catch((error) => {
                console.error(error);
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

    szerkesztes = (id) =>{
        alert(id)
        
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "rgb(18,18,18)" }}>
                <FlatList
                    data={this.state.adatok}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item }) => (<List.Section  >
                        <List.Accordion
                            title={<View><Text style={{ color: "white" }}>{item.listak_nev}{'\n'}{this.getParsedDate(item.listak_datum)}</Text ></View>}
                            style={{ backgroundColor: "rgb(32,32,32)", }}
                            expanded={item.kinyitott}
                            onPress={() => { this._handlePress(item.listak_id); this.getlistakid(item.listak_id) }}
                            onLongPress={()=>this.props.navigation.navigate('Szerkeszt', { aktid: item.listak_id}) }>
                            
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
            </View>

        );
    }
}

export default Felvitel;