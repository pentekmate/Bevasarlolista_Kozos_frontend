import React, { Component } from 'react';
import { Button, StyleSheet, View, FlatList, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
const IP = require('./Ipcim');

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            adat: [],
            todoList: [
                { id: '1', text: 'Learn JavaScript' },
                { id: '2', text: 'Learn React' },
                { id: '3', text: 'Learn TypeScript' },
            ]
        };
    }



    componentDidMount() {
        this.getLista();
    }

    async getLista() {
        try {
            const response = await fetch(IP.ipcim + 'aktualis');
            const json = await response.json();
            this.setState({ data: json });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }

});