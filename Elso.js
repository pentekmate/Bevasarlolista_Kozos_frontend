import React, { Component } from 'react';
import { FlatList, Text, StyleSheet, View,TouchableOpacity, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipcim } from "./IPcim";
const IP = require('./IPcim')


export default class Kiir extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            felhasznalonev: "",
            isLoading:true
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
            try{    
            var bemenet = {
                bevitel1: this.state.felhasznalonev
            }
            //szűrt adatok lefetchelése backendről
            fetch(IP.ipcim + 'felhasznalolistainincskesz', {
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
            }catch(e){console.log(e)}
            finally{
               // this.setState({isLoading:false})
            }
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
            this.adatLekeres()
            this.setState({isLoading:false})
        });
      
        this.navFocusListener = this.props.navigation.addListener('focus', () => {
            this.getData().then((vissza_adatok2) => {
                this.setState({ felhasznalonev: vissza_adatok2 })
                this.adatLekeres()
            });
        })
    }
    componentWillUnmount() {
        this.navFocusListener();
    }



    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "rgb(50,50,50)" }}>
                {this.state.isLoading ? <ActivityIndicator size={"large"} /> :
                this.state.data.length>0?
                 <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        
                        <TouchableOpacity style={{ backgroundColor: "rgb(32,32, 32)", height: 80, justifyContent: 'center', marginTop: 10,borderRadius:10}}
                            onPress={() => this.props.navigation.navigate('Seged', { aktid: item.listak_id, akttart: item.listak_tartalom })} >
                            <View>
                            <Text style={{fontSize: 20, color: "white",margin:10}}>{item.listak_nev}</Text>
                            <Text style={{color:"rgb(1,194,154)",margin:10}}>{this.getParsedDate(item.listak_datum)}</Text>
                            </View>
                            </TouchableOpacity>
    
                    )}
                />
            :<View style={{alignSelf:"center",flex:1,justifyContent:"center"}}>
            <Text style={{color:"white",fontSize:15,margin:10}}>Úgy tűnik jelenleg nem hoztál létre egy listát sem.</Text>
            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('Listalétrehozás')}>
                <Text style={{alignSelf:"center",color:"rgb(1,194,154)",fontSize:20}}>Listalétrehozása!</Text>
            </TouchableOpacity>
            </View>}
              
           
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
