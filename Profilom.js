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
            headers: { 
            "Content-type": "application/json; charset=UTF-8",
        }
        }

        ).then((response) => response.json())
            .then((responseJson) => {
                (
                    console.log("response:",responseJson),
                    this.setState({osszlista:responseJson}),
                    this.setState({ isLoading: false },));
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
            console.log(this.state.osszlista)
         
           
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
            <View style={{ flexDirection: 'column', flex: 1,backgroundColor:"rgb(50,50,50)"}}>
                {isLoading ? <ActivityIndicator size={"large"} /> :
               <View style={{flex:1,marginTop:20}}>


                <View style={{borderColor:"rgb(120, 130, 130)",backgroundColor:"rgb(18,18,18)",borderWidth:1,height:'20%',width:'50%',borderRadius:15,alignItems:"center"}}>
                    <Text style={{color:"white",fontSize:15}}>Felhasználó neved:</Text>
                    <Text style={{color:"white",fontSize:30,marginTop:20}}>{this.state.felhasznalonev}</Text>
                </View>
                <View style={{borderColor:"rgb(120, 130, 130)",backgroundColor:"rgb(18,18,18)",borderWidth:1,height:'30%',width:'45%',borderRadius:15,alignItems:"center",alignSelf:"flex-end",top:'-20%'}}>
                    <Text style={{color:"white",fontSize:15}}>Összes listád:</Text>
                {this.state.osszlista.map((item,key)=><Text style={{color:"white",width:"100%",height:"100%",fontSize:50,textAlign:"center",textAlignVertical:"center"}} key={key}>{item.osszes}</Text>)}
                </View>


                <View style={{borderColor:"rgb(120, 130, 130)",backgroundColor:"rgb(18,18,18)",borderWidth:1,height:'20%',width:'50%',borderRadius:15,alignItems:"center",alignSelf:"flex-start",bottom:'26%'}}>
                    <Text style={{color:"white",fontSize:15}}>Regisztrációd dátuma:</Text>
                    <Text style={{color:"white"}}>
                        
                    </Text>
                </View>
      
                <Button title='Kijelentkezés' onPress={this.kilepes}></Button>











               </View>




        }
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
