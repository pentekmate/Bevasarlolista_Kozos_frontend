import React, { useState } from 'react';
import { Button, View, Text, TextInput, Alert, NativeEventEmitter, } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import Kiir from './Elso'
import Listaad from './Lista_input';
import Listainputsr from './Listainputsr';
import Login from './Login'
import Regisztracio from './Regisztracio';
import Profil from './Profilom';
import Toltokep from './Tolto'
import Fooldal from './Home';
import Seged from './Seged';
import Felvitel from './felvitel';
import Szerkeszt from './Szerkeszt'

function HomeScreen({ navigation }) {

  return (
    <Fooldal navigation={navigation}></Fooldal>
  );
}

function SzerkesztScreen({ navigation }) {

  return (
    <Szerkeszt navigation={navigation}></Szerkeszt>
  );
}

function Listafel({ navigation }) {
  return (
    <Felvitel navigation={navigation}></Felvitel>
  );
}

function Segedkep({ navigation }) {
  return (
    <Seged navigation={navigation}></Seged>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgb(50,50,50)" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function Elso_lap({ navigation }) {
  return (
    <Listaad navigation={navigation}></Listaad>
  );
}
//Szia
function Toltes({ navigation }) {
  return (
    <Toltokep navigation={navigation}></Toltokep>
  );
}

function Masodik_lap({ navigation }) {
  return (
    <Kiir navigation={navigation}></Kiir>
  );
}
function Bejelentkezes({ navigation }) {
  return (
    <Login navigation={navigation}></Login>);
}

function Regisztr({ navigation }) {
  return (
    <Regisztracio navigation={navigation}></Regisztracio>);
}
function Prof({ navigation }) {
  return (
    <Profil navigation={navigation}></Profil>);
}

function Root({ navigation }) {

  return (
    <Drawer.Navigator initialRouteName="Toltokep"
      screenOptions=
      {{ lazy: false, headerStyle: { backgroundColor: '#01c29a' }, headerTintColor: '#181818', drawerStyle: { backgroundColor: 'rgb(32,32,32)' }, drawerActiveBackgroundColor: "rgb(18,18,18)", drawerActiveTintColor: "white", drawerInactiveTintColor: "white", headerTitleAlign: "center" }} >
      <Drawer.Screen name="Home" component={HomeScreen} options={{
        title: "Home",
        drawerIcon: ({ }) => (
          <AntDesign name="home" size={24} color="white" />
        ),

      }} />


      <Drawer.Screen name="Bejelentkezes" component={Bejelentkezes} options={{
        drawerItemStyle: { height: 0 }, headerShown: false,
      }} />
      <Drawer.Screen name="Toltokep" component={Toltes} options={{
        drawerItemStyle: { height: 0 }, headerShown: false,
      }} />

      <Drawer.Screen name="Meglévő listák" component={Listafel} />

      <Drawer.Screen name="Listalétrehozás" component={Elso_lap} options={{
        title: 'Listalétrehozása',
        drawerIcon: ({ }) => (
          <MaterialIcons name="post-add" size={24} color="white" />
        ),
      }} />
      <Drawer.Screen name="Listák" component={Masodik_lap} options={{
        title: 'Listák',
        drawerIcon: ({ }) => (
          <MaterialCommunityIcons name="clipboard-list-outline" size={24} color="white" />
        ),
      }} />
      <Drawer.Screen name="Profilom" component={Prof} options={{
        title: 'Profilom',
        drawerIcon: ({ }) => (
          <AntDesign name="user" size={24} color="white" />
        ),
        headerRightContainerStyle: { marginRight: 10 },

      }} />

    </Drawer.Navigator>
  )


}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()

const menu = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Listalétrehozása" component={Listainputsr} options={{ title: "Keresés", headerTitle: "Keresés", headerStyle: { backgroundColor: '#01c29a', headerTintColor: '#181818' } }} />
        <Stack.Screen name="Regisztráció" component={Regisztracio} />
        <Stack.Screen name="Seged" component={Seged} options={{ headerStyle: { backgroundColor: '#01c29a' }, headerTintColor: "rgb(18,18,18)", headerTitle: "" }} />
        <Stack.Screen name="Szerkeszt" component={Szerkeszt} options={{ headerStyle: { backgroundColor: '#01c29a' }, headerTintColor: "rgb(18,18,18)", headerTitle: "Lista módosítása" }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


export default menu;