import * as React from 'react';
import { View, Text, FlatList , TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const IP = require('./Ipcim');

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     ar: 0
    }
  }

  componentDidMount() {
    
    //this.navFocusListener = this.props.navigation.addListener('focus', () => { this.getLista() })
  }

 /* componentWillUnmount() {
    this.navFocusListener();
  }*/
  
//ár feltöltése
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

  listatorles=()=>{
    var adatok ={
      bevitel5: this.props.route.params.aktid
    }
    
    fetch(IP.ipcim + 'listatorles', { method: 'DELETE',
    body: JSON.stringify(adatok),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    //listatorles meghivas id-val
    
  }
  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "rgb(18,18,18)" }}>
        <View style={{ marginTop: 40 }}>
                    <Text style={{ fontSize: 20, color: "grey" , marginLeft: 5}}>Fizetett összeg:</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: "rgb(1,194, 154)",marginLeft: 5, width: 150, borderRadius: 10, borderColor: "black", borderWidth: 2 }}
                        onChangeText={szoveg => this.setState({ ar: szoveg })}
                        keyboardType = 'numeric'
                        value={this.state.ar}
                    />
                    <TouchableOpacity onPress={this.felvitel()}>
                        <View ><Text style={{ fontSize: 20 , color: "grey", marginLeft: 5}}>Mentés</Text></View>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 50}}>
                <TouchableOpacity style={{marginTop: 10, width: 111, marginLeft: 11 }} onPress={()=> {this.listatorles(), alert("Sikeres törlés")}}><Text style={{backgroundColor: "rgb(1,194, 154)", fontSize: 22, borderRadius: 10}}>Törlés</Text></TouchableOpacity>
                </View>
       

      </View>
    );
  }
}

export default MyComponent;