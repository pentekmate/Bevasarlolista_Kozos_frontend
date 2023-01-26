import React, { Component } from 'react';
import { FlatList, StyleSheet, View, } from 'react-native';
const IP = require('./Ipcim');
import { List } from 'react-native-paper';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adatok: []
            
        };
    }

    componentDidMount() {
        this.getLista();
        let tartalomSplitelve="";
        for (let i = 0; i < this.state.adatok.length; i++) {
            tartalomSplitelve=this.state.adatok[i].listak_tartalom.split(',')
            this.state.adatok[i].listak_tartalom=tartalomSplitelve
        }
        console.log(this.state.adatok)
    }

    _handlePress = (id) =>{
        let tombmentese=this.state.adatok
    
        for (let i = 0; i < this.state.adatok.length; i++) {
          if(this.state.adatok[i].listak_id==id)
          {
           tombmentese[i].kinyitott=!tombmentese[i].kinyitott
          }
          else{
            tombmentese[i].kinyitott=false
          }
          this.setState({adatok:tombmentese})
          console.log(JSON.stringify(tombmentese))
        }
      }

    async getLista() {
        try {
            const response = await fetch(IP.ipcim + 'listak');
            const json = await response.json();
            this.setState({ data: json });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
        console.log(this.state.data)
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

    render() {
        return (
            <View >
                {this.state.adatok.map((item,key)=><List.Section key={key}>
           <List.Accordion
             title={item.listak_nev}
             left={props => <List.Icon {...props} icon="folder" />}
             expanded={item.kinyitott}
             onPress={()=>this._handlePress(item.listak_id)}
           >
            <FlatList
            data={item.listak_tartalom}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <List.Item title={item}></List.Item>
            )}
          />
           </List.Accordion>
         </List.Section>
 )}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    countContainer: {
        alignItems: "center",
        padding: 10
    }
});
