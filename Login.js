import React, { Component } from 'react';
import { ChildComponent, FlatList, Text, StyleSheet, View, TextInput, Button, Dimensions, TouchableOpacity, Pressable, PanResponder } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ipcim } from "./IPcim";
const IP = require('./IPcim')

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      felhasznalonev: "",
      jelszo: "",
      felhasznalonevtovabb: "",
      fokusz: false,
      fokusz1: false,
      rosszjelszo: false,
      rosszfelhasznalonev: false,
      lathatojelszo: true
    };
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
    this.navFocusListener = this.props.navigation.addListener('focus', () => {
    })
  }
  fiokteszt = () => {
    let talalt = 0;
    let nemtalalt = 0;
    this.state.data.map((item) => {
      if (item.felhasznalo_nev == this.state.felhasznalonev && item.felhasznalo_jelszo == this.state.jelszo) {
        talalt += 1
      }
      else {
        nemtalalt += 1
      }
    })
    if (talalt > 0) {
      this.storeData(this.state.felhasznalonev)
      this.props.navigation.navigate('Home');
      this.setState({ felhasznalonev: "" })
      this.setState({ jelszo: "" })

    }
    else {
      alert("Nem egyező jelszó/felhasználónév")
      this.setState({ rosszjelszo: true })
      this.setState({ rosszfelhasznalonev: true })
    }
    console.log(this.state.data)
  }
  bejelentkezes = () => {
    console.log(this.state.felhasznalonev)
    console.log(this.state.jelszo)
    fetch(IP.ipcim + 'felhasznalok')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
        }
          , function () {
          });
      }).then(this.fiokteszt)


  }
  JelszoLathato = () => {
    console.log("elso:", this.state.lathatojelszo)
    if (this.state.lathatojelszo == true) {
      this.setState({ lathatojelszo: false })
    }
    else if (this.state.lathatojelszo == false) {
      this.setState({ lathatojelszo: true })
    }
  }


  render() {
    return (
      <View style={{ flexDirection: 'column', flex: 1, }}>

        <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <View style={styles.divek}>
            <Text style={styles.szoveg}>Felhasználónév:</Text>
            <View style={[this.state.fokusz1 ? styles.felhaszmalodivfocus : styles.felhasznaloodiv, { backgroundColor: this.state.rosszfelhasznalonev ? "red" : "white" }]}>
              <FontAwesome style={{ marginLeft: 5 }} name="user" size={28} color="black" />
              <TextInput
                cursorColor={"rgb(50,50,50)"}
                onFocus={() => this.setState({ fokusz1: true })}
                onBlur={() => this.setState({ fokusz1: false })}
                style={styles.textinputfelh}
                placeholder="Felhasználónév"
                onChangeText={(felhasznalonev_szoveg) => this.setState({ felhasznalonev: felhasznalonev_szoveg })}
                onChange={() => this.setState({ rosszfelhasznalonev: false })}
                value={this.state.felhasznalonev}>
              </TextInput>

            </View>
          </View>
          <View style={styles.divek}>
            <Text style={styles.szoveg}>Jelszó:</Text>

            <View style={[this.state.fokusz ? styles.jelszodivfocus : styles.jelszodiv, { backgroundColor: this.state.rosszjelszo ? "red" : "white" }]}>
              <MaterialCommunityIcons name="lock" size={28} color="black" />
              <TextInput
                cursorColor={"rgb(50,50,50)"}
                onFocus={() => this.setState({ fokusz: true })}
                onBlur={() => this.setState({ fokusz: false })}
                style={styles.textinputjelsz}
                placeholder="Jelszó"
                secureTextEntry={this.state.lathatojelszo}
                onChangeText={(jelszoszoveg) => this.setState({ jelszo: jelszoszoveg })}
                onChange={() => this.setState({ rosszjelszo: false })}
                value={this.state.jelszo}>
              </TextInput>
              <TouchableOpacity onPress={this.JelszoLathato}><Ionicons style={{ justifyContent: "center", paddingRight: 10, alignItems: "center", paddingTop: 6 }} name={this.state.lathatojelszo ? "eye-outline" : "eye-off-outline"} size={24} color="black" /></TouchableOpacity>

            </View>
          </View>

        </View>
        <View style={{ flex: 2 }}>
          <View style={styles.buttondiv}>
            <Text style={{ alignSelf: "center", marginBottom: height * 0.01 }}>Még nincs fiókod?</Text>
            <Pressable onPress={() => this.props.navigation.navigate('Regisztráció')}
              style={{ alignSelf: "center", marginBottom: height * 0.03 }}>
              <Text style={{ fontSize: 18, color: '#01c29a' }}>Regisztrálok!</Text></Pressable>


            <TouchableOpacity
              onPress={this.bejelentkezes}
              style={styles.regisztracio}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Bejelentkezés</Text>
            </TouchableOpacity>
          </View>



        </View>
      </View>
    );
  }
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  buttondiv: {
    width: width * 0.9,
    alignSelf: "center",
    marginTop: height * 0.4,

  },
  divek: {
    width: width * 0.9,
    alignSelf: "center",
    marginTop: height * 0.04,

  },
  szoveg: {
    marginBottom: 10,
    alignSelf: "flex-start",
    fontSize: 20
  },
  textinputjelsz: {
    flex: 1,
    padding: 10,
    justifyContent: "center"
  },
  textinputfelh: {
    flex: 1,
    padding: 10,
    justifyContent: "center"
  },
  jelszodiv: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
  },
  jelszodivfocus: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 3,
    borderColor: '#01c29a',
    paddingBottom: 10,
  },
  felhasznaloodiv: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
  },
  felhaszmalodivfocus:
  {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 3,
    borderColor: '#01c29a',
    paddingBottom: 10,
  },
  regisztracio: {
    backgroundColor: '#202020',
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
    height: height * 0.05,
    borderRadius: 10



  }
});