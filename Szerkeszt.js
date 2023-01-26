import * as React from 'react';
import { View, Text, FlatList, TextInput, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const IP = require('./Ipcim');

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ar: 0
    }
  }

  felvitel = () => {
    var adatok = {
      bevitel3: this.state.ar,
      bevitel4: this.props.route.params.aktid
    }

    const response = fetch(IP.ipcim + 'arfel', {
      method: "POST",
      body: JSON.stringify(adatok),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });
  }

  listatorles = () => {
    var adatok = {
      bevitel5: this.props.route.params.aktid
    }
    try {
      fetch(IP.ipcim + 'listatorles', {
        method: 'DELETE',
        body: JSON.stringify(adatok),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
    }
    catch (e) {
      console.log(e)
    }
    finally {
      this.props.navigation.navigate("Meglévő listák")
    }



  }
  createTwoButtonAlert = () =>
    Alert.alert('Biztosan törlöd?', "", [
      { text: 'mégse', onPress: () => console.log('Cancel Pressed') },
      { text: 'törlés', onPress: () => this.listatorles() },
    ]);


  render() {
    return (
      <View style={{ flexDirection: "row", flex: 1, backgroundColor: "rgb(18,18,18)" }}>
        <View style={{ flex: 1, marginTop: 20 }}>
          <Text style={{ fontSize: 20, color: "grey", marginLeft: 5 }}>Fizetett összeg:</Text>
          <TextInput
            style={{ height: 40, backgroundColor: "rgb(1,194, 154)", marginLeft: 5, width: 150, borderRadius: 10, borderColor: "black", borderWidth: 2 }}
            onChangeText={szoveg => this.setState({ ar: szoveg })}
            keyboardType='numeric'
            value={this.state.ar}
          />
          <TouchableOpacity onPress={this.felvitel()}>
            <View ><Text style={{ fontSize: 20, color: "grey", marginLeft: 5 }}>Mentés</Text></View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, marginTop: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 20, color: "grey", marginLeft: 5 }}>Lista törlése</Text>
          <TouchableOpacity style={{ marginTop: 10, marginLeft: 1, width: 150, borderRadius: 10, borderColor: "black", borderWidth: 2 }} onPress={() => this.createTwoButtonAlert()}><Text style={{ backgroundColor: "rgb(1,194, 154)", fontSize: 22 }}>Törlés</Text></TouchableOpacity>
        </View>


      </View>
    );
  }
}

export default MyComponent;