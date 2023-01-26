import React, { Component } from "react";
import { Feather } from '@expo/vector-icons';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Dimensions,
  SafeAreaView,
  Image,
  Animated,
  PanResponder
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DialogInput from "react-native-dialog-input";
import { Entypo } from '@expo/vector-icons';
import { ipcim } from "./IPcim";
import { ScrollView } from "react-native-gesture-handler";
const IP = require('./IPcim')


export default class Listaad extends Component {
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
      alertMutatasa: false,
      data: [],
      segeddata: [],
      listanev: "",
      termekektomb: [
        { id: 0, megnevezes: "Cukor", isChecked: false },
        { id: 1, megnevezes: "Liszt", isChecked: false },
        { id: 2, megnevezes: "Alföldi Kenyér", isChecked: false },
        { id: 3, megnevezes: "Kávé", isChecked: false },
        { id: 4, megnevezes: "Cola", isChecked: false },
        { id: 5, megnevezes: "Wc-papír", isChecked: false },
      ],
      visible: false,
      setVisible: false,
      bevittadat: "",
      felhasznalonev: ""
    };
  }

  getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return year + "-" + month + "-" + date + ". napi lista";
  };
  adatatad = () => {

    if (this.state.data.length == 0 && this.state.segeddata.length == 0) {
      this.setState({ alertMutatasa: true })
    } else {
      this.setState({ visible: true });
    }
  };
  submit_atad(input) {
    var tartalom = [];
    this.state.data.map((item) => tartalom.push(item.megnevezes));
    this.state.segeddata.map((item) => tartalom.push(item.megnevezes));
    this.state.listanev = input;
    var adatok = {
      bevitel1: this.state.listanev,
      bevitel2: tartalom,
      bevitel3: this.state.felhasznalonev
    };
    try {
      const response = fetch(IP.ipcim + 'tartalomfel', {
        method: "POST",
        body: JSON.stringify(adatok),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
    } catch (err) {
      alert("Sikertelen feltöltés");
    } finally {
      alert("Sikeres feltöltés");
    }
    this.setState({ visible: false });
    this.state.termekektomb.map((item) => {
      item.isChecked = false
    })
    this.setState({ data: [] })
    this.setState({ segeddata: [] })
    this.storeData([])
    this.storeData2([])
  };
  getFelhasznalo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@felhasznalo')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }


  getLocaladatok = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@localadatok')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

  storeData = async (value) => {
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
  getListainputsr = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@listaelemek')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }


  componentDidMount() {
    this.getFelhasznalo().then((fh) => {
      this.setState({ felhasznalonev: fh })
    });
    this.getListainputsr().then((vissza_adatok2) => {
      this.setState({ segeddata: vissza_adatok2 })
    });

    this.navFocusListener = this.props.navigation.addListener('focus', () => {
      this.storeData2([]).then(this.storeData2(this.state.data))
      this.getLocaladatok().then((vissza_adatok2) => {
        this.setState({ data: vissza_adatok2 })
      });
      this.getFelhasznalo().then((fh) => {
        this.setState({ felhasznalonev: fh })
      });
      this.getListainputsr().then((vissza_adatok2) => {
        this.setState({ segeddata: vissza_adatok2 })
      });

    });

  }
  componentWillUnmount() {
    this.navFocusListener();
  }

  mindentorles = () => {
    this.setState({ data: [] });
    this.setState({ segeddata: [] })
    this.storeData([]);

    this.state.termekektomb.map((product) => {
      product.isChecked = false;
    });
    this.state.listanev = "";
  };


  handleChange = (id, nev) => {
    var tomb = this.state.data;
    let temp = this.state.termekektomb.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }

      return product;
    });
    let x = this.state.data.length;
    this.setState({ termekektomb: temp });

    x = this.state.data.length
    this.state.termekektomb.map((termek) => {
      if (id === termek.id && termek.isChecked == false) {
        this.state.data.push({
          id: x,
          megnevezes: termek.megnevezes,
          isChecked: false,
        });
      }

    });
    console.log(this.state.data)
    this.state.termekektomb.map((termek) => {
      if (nev == termek.megnevezes && termek.isChecked == true) {
        let index = this.state.data.findIndex((item) => item.megnevezes == nev)
        if (index !== -1) {
          tomb.splice(index, 1);
          this.setState({ data: tomb });
          console.log(this.state.data)
        }
      }
    })


  };
  ListaelemTorles = (termeknev) => {

    let tomb = this.state.data
    let tomb1 = this.state.termekektomb
    let tomb2 = this.state.segeddata
    //fenti checklist elemeinek vissza állítása------------
    this.state.termekektomb.map((termekvissza) => {
      if (termeknev == termekvissza.megnevezes) {
        termekvissza.isChecked = false
        this.setState({ termekektomb: tomb1 })

      }
    })
    //

    this.state.termekektomb.map((termek) => {
      if (termeknev == termek.megnevezes) {
        let index = this.state.data.findIndex((item) => item.megnevezes == termeknev)
        if (index !== -1) {
          tomb.splice(index, 1);
          this.setState({ data: tomb });
        }
      }
    })
    this.state.data.map((termek) => {
      if (termeknev == termek.megnevezes) {
        let index = this.state.data.findIndex((item) => item.megnevezes == termeknev)
        if (index !== -1) {
          tomb.splice(index, 1);
          this.setState({ data: tomb });
        }
      }
    })

    this.state.segeddata.map((termek) => {
      if (termeknev == termek.megnevezes) {
        let index = this.state.segeddata.findIndex((item) => item.megnevezes == termeknev)
        if (index !== -1) {
          tomb2.splice(index, 1);
          this.setState({ segeddata: tomb2 });
        }
      }
    })
    this.storeData([])
    this.storeData(this.state.data)

  }
  Ugras = () => {
    this.storeData2(this.state.data).then(console.log("siker")).then(this.props.navigation.navigate('Listalétrehozása'))
  }
  teszt() {

  }
  render() {
    return (

      <ScrollView onScrollEndDrag={this.teszt} style={{ flexDirection: "column", backgroundColor: "rgb(50,50,50)" }}>

        <View style={[styles.keresesdiv, { flex: 1, flexDirection: "row", backgroundColor: "rgb(1,194,154)" }]}>
          <Feather style={{ paddingTop: 5, }} name="search" size={28} color="rgb(50,50,50)" />
          <TouchableOpacity
            onPress={this.Ugras}
            style={styles.textInputStyle} >
            <Text style={{ fontStyle: "italic", color: "rgb(50,50,50)" }}>Termék keresése..</Text>
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: "brown" }}>
          <DialogInput
            isDialogVisible={this.state.visible}
            message={"Nevezed el a listádat!"}
            submitInput={(text) => {
              this.submit_atad(text);
            }}
            closeDialog={() => this.setState({ visible: false })}
          ></DialogInput>
        </View>
        {/*----FELSŐ CHECKBOX ELEMEI----*/}
        <View style={{ flex: 11, backgroundColor: "rgb(50,50,50)", marginTop: 20 }}>

          {this.state.termekektomb.map((item, key) =>
            <View key={key} style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ flex: 1, backgroundColor: "rgb(50,50,50)", justifyContent: "center", alignContent: "center" }}>
                {item.id <= 2 ? <View
                  style={styles.felsocheck}
                >
                  <View style={styles.icon}>
                    <Pressable onPress={() => this.handleChange(item.id, item.megnevezes)}>
                      <MaterialCommunityIcons
                        name={
                          item.isChecked
                            ? "check"
                            : "plus"
                        }
                        size={24}
                        color="rgb(1,194,154)"
                      />
                    </Pressable>
                  </View>
                  <Text style={{ color: "rgb(50,50,50)", fontSize: 15 }}>{item.megnevezes}</Text>
                </View>
                  : <Text></Text>}
              </View>
              <View style={{ flex: 1, backgroundColor: "rgb(50,50,50)" }}>{item.id > 2 ? <View
                style={[styles.felsocheck, { top: '-68%' }]}
              >
                <View style={styles.icon}>
                  <Pressable onPress={() => this.handleChange(item.id, item.megnevezes)}>
                    <MaterialCommunityIcons
                      name={
                        item.isChecked
                          ? "check"
                          : "plus"
                      }
                      size={24}
                      color="rgb(1,194,154)"
                    />
                  </Pressable>
                </View>
                <Text style={{ color: "rgb(50,50,50)", fontSize: 15 }}>{item.megnevezes}</Text>
              </View>
                : <Text></Text>}</View>

            </View>

          )}

        </View>


        {/*----lISTA ELEMEINEK MUTATÁSA----*/}
        <View style={{ flex: 1, backgroundColor: "rgb(50,50,50)", paddingTop: 50 }}>


          {this.state.data.map((item, key) => <View key={key} style={styles.listatartalom}>

            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Entypo style={{ marginLeft: 10 }} name="shop" size={25} color="rgb(50,50,50)" />
              </View>
              <View style={{ flex: 13, justifyContent: "center" }}>
                <Text style={{ color: "rgb(50,50,50)", marginLeft: 10 }}>{item.megnevezes}</Text>
              </View>
              <View style={styles.torlesgomb}>
                <TouchableOpacity onPress={() => this.ListaelemTorles(item.megnevezes)}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={24}
                    color="rgb(50,50,50)"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>)}
          {this.state.segeddata.map((item, key) =>
            <View key={key} style={styles.listatartalom}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Entypo style={{ marginLeft: 10 }} name="shop" size={25} color="rgb(50,50,50)" />
                </View>
                <View style={{ flex: 13, justifyContent: "center" }}>
                  <Text style={{ color: "rgb(50,50,50)", marginLeft: 10 }}>{item.megnevezes}</Text>
                </View>
                <View style={styles.torlesgomb}>
                  <TouchableOpacity onPress={() => this.ListaelemTorles(item.megnevezes)}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={24}
                      color="rgb(50,50,50)"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>)}

        </View>
        <Animated.View
          style={{
            zIndex: 2,
            transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }],
          }}
          {...this.panResponder.panHandlers}>
          <View style={{ flex: 1, backgroundColor: "696969" }}>
            {this.state.data.length > 0 || this.state.segeddata.length > 0 ?
              <TouchableOpacity
                onPress={(this.adatatad)}
                style={{ backgroundColor: "rgb(1,194,154)", width: 65, alignSelf: "flex-end", alignItems: "center", borderRadius: 150 / 2, height: 65, justifyContent: "center", zIndex: 1, }}>
                <Feather name="check" size={50} color="black" />
              </TouchableOpacity> : <Text></Text>}

          </View>
        </Animated.View>

      </ScrollView>
    );
  }
}
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  listatartalom: {
    backgroundColor: "rgb(1,194,154)",
    height: height * 0.06,
    width: width * 1,
    alignSelf: "center",
    borderRadius: 15,
    margin: 10


  },
  text: { textAlign: "center", fontSize: 18 },
  listaneve: {
    height: 40,
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    width: width * 0.8,
  },
  mentes: {
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    // width: width * 0.2,
    textAlignVertical: "center",
  },
  felsocheck: {
    backgroundColor: "red",
    flexDirection: "row",
    margin: 5,
    backgroundColor: "rgb(1,194,154)",
    borderRadius: 15,
    alignItems: "center",
    color: "rgb(50,50,50)"
  },
  icon: {
    backgroundColor: "rgb(50,50,50)",
    borderRadius: 50,
    margin: 5,
    width: '13%',

  },
  torlesgomb:
  {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    //backgroundColor: "rgb(50,50,50)",
    width: 30,
    height: 30,
    marginRight: 5,
    borderRadius: 5
  },
  keresesdiv: {
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    paddingBottom: 10,
    borderColor: "black",
    borderWidth: 2
  },
  textInputStyle: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  }
});
