import React, { Component } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import ProgressBar from "react-native-animated-progress";
import { ipcim } from "./IPcim";
import { ScrollView } from 'react-native-gesture-handler';
const IP = require('./IPcim')


export default class Seged extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            tartalom_tomb: [],
            zsolt: "",
            adat: [],
            ar: 0,
            zoldseggyumolcs: ["Articsóka",
                "Bimbós kel",
                "Brokkoli",
                "Burgonya (nyári)",
                "Burgonya (téli)",
                "Céklarépa",
                "Cikória",
                "Csicsóka",
                "Cukkini",
                "Édes kömény",
                "Endívia saláta",
                "Fejes saláta",
                "Fekete retek",
                "Fokhagyma",
                "Halványító zeller",
                "Jégcsapsaláta",
                "Káposzta (fejes)",
                "Káposzta, savanyított",
                "Karalábé",
                "Karfiol",
                "Kelkáposzta",
                "Kínai kel",
                "Kukorica tejes",
                "Mangold",
                "Olívabogyó",
                "Padlizsán",
                "Paradicsom",
                "Paraj (spenót)",
                "Pasztinák",
                "Patisszon",
                "Petrezselyem zöldje",
                "Petrezselyemgyökér",
                "Póréhagyma",
                "Rebarbara",
                "Retek, hónapos",
                "Sárgarépa",
                "Sóska",
                "Spárga",
                "Sütőtök",
                "Torma",
                "Tök, főző",
                "Uborka",
                "Újhagyma",
                "Vöröshagyma",
                "Zellergumó",
                "Zöldbab",
                "Zöldborsó",
                "Zöldpaprika",
                "Név",
                "Alma",
                "Ananász",
                "Banán",
                "Birsalma",
                "Citrom",
                "Cseresznye",
                "Csipkebogyó, friss",
                "Cukordinnye/sárgadinnye",
                "Datolya",
                "Egres",
                "Eper, fa",
                "Füge, friss",
                "Füge, szárított",
                "Gránátalma",
                "Grapefruit",
                "Görögdinnye",
                "Kajszibarack",
                "Kivi",
                "Körte",
                "Licsi",
                "Málna",
                "Mandarin",
                "Mangó",
                "Mazsola",
                "Meggy",
                "Mirabella",
                "Narancs",
                "Naspolya",
                "Nektarin",
                "Őszibarack",
                "Papaya",
                "Ribiszke, fekete",
                "Ribiszke, piros",
                "Szamóca, földieper",
                "Szeder",
                "Szilva, besztercei",
                "Szilva, vörös",
                "Szőlő", "Zöldringló"
            ],
            tejtermekek: ["Aludttej",
                "Bivalytej",
                "Brick sajt",
                "Brie sajt",
                "Camembert sajt",
                "Cheddar sajt",
                "Cheshire sajt",
                "Colby sajt",
                "Edámi sajt",
                "Ementáli sajt",
                "Fagylalt",
                "Feta sajt",
                "Fontina sajt",
                "Főzőtejszín 10%-os",
                "Főzőtejszín 20%-os",
                "Gomolya sajt",
                "Gomolyatúró",
                "Gorgonzola sajt",
                "Gouda sajt",
                "Görög joghurt",
                "Gruyere sajt",
                "Habtejszín 30%-os",
                "Halloumi sajt",
                "Havarti sajt",
                "Író",
                "Jégkrém",
                "Joghurt",
                "Juhsajt",
                "Juhtej",
                "Juhtúró",
                "Kávétejszín",
                "Kecskesajt",
                "Kecsketej",
                "Kefir",
                "Kéksajt",
                "Köményes sajt",
                "Körözött",
                "Krémsajt",
                "Krémtúró",
                "Limburger sajt",
                "Márványsajt",
                "Mascarpone sajt",
                "Monterey sajt",
                "Mozzarella sajt",
                "Muenster sajt",
                "Neufchatel sajt",
                "Óvári sajt",
                "Pálpusztai sajt",
                "Parenyica sajt",
                "Parmezán sajt",
                "Provolone sajt",
                "Puding",
                "Ricotta sajt",
                "Rokfort sajt",
                "Romano sajt",
                "Sűrített tej",
                "Tehéntej (0,1%-os)",
                "Tehéntej (1,5%-os)",
                "Tehéntej (2,8%-os)",
                "Tehéntej (3,5%-os)",
                "Tehéntej (3,6%-os)",
                "Tehéntúró (félzsíros)",
                "Tehéntúró (sovány)",
                "Tejföl (12%-os)",
                "Tejföl (20%-os)",
                "Tejpor (sovány)",
                "Tejpor (zsíros)",
                "Tejszínhab",
                "Tilsiti sajt",
                "Trappista sajt",
                "Túró Rudi",
                "Vaj",
                "Vajkrém"
            ],
            pek: ["Abonett",
                "Alföldi kenyér",
                "Bakonyi barna kenyér",
                "Briós",
                "Burgonyás kenyér",
                "Búzacsírás kenyér",
                "Búzakorpás kenyér",
                "Diós csiga",
                "Erzsébet kenyér",
                "Fánk",
                "Fehér kenyér",
                "Félbarna kenyér",
                "Francia kenyér",
                "Gofri",
                "Graham kenyér",
                "Kakaós csiga",
                "Kalács",
                "Kétszersült",
                "Kifli",
                "Kuglóf",
                "Kukoricás kenyér",
                "Lekváros bukta",
                "Lenmagos barnakenyér",
                "Magos kenyér",
                "Magvas barnakenyér",
                "Mazsolás kenyér",
                "Muffin",
                "Olasz kenyér",
                "Palacsinta",
                "Pirítós",
                "Piskótatekercs",
                "Pita (fehér lisztből)",
                "Pita (teljes kiőrlésű)",
                "Pogácsa (tepertős)",
                "Pogácsa (vajas)",
                "Pumpernickel",
                "Rozskenyér",
                "Teljes kiőrlésű kenyér",
                "Teljes kiőrlésű kifli",
                "Teljes kiőrlésű zsemle",
                "Tökmagos kenyér",
                "Túrós batyu",
                "Zabkorpás kenyér",
                "Zsemle"
            ],
            egyeb:[],
            zoldseggyumolcsTalal: [],
            tejtermekekTalal: [],
            pekTalal: [],
            valogatott: [],
            szam: 0,
            tombHossz:0

        };
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

    funckio = () => {
        let uj = [];
        this.state.zsolt = this.props.route.params.akttart;
        uj = this.state.zsolt.split(',')
        this.setState({ data: uj })
        this.state.data = uj;
        let x =uj.length
        this.setState({tombHossz:x})

        this.state.zoldseggyumolcs.map((item) => {
            this.state.data.map((item1) => {
                if (item1.includes(item)) {
                    let index = this.state.data.indexOf(item1)
                    this.state.data.splice(index, 1)
                    this.state.zoldseggyumolcsTalal.push(item1)
                }
            })
        })
        this.state.tejtermekek.map((item) => {
            this.state.data.map((item1) => {
                if (item1.includes(item)) {
                    let index = this.state.data.indexOf(item1)
                    this.state.data.splice(index, 1)
                    this.state.tejtermekekTalal.push(item1)
                }
            })
        })
        this.state.pek.map((item) => {
            this.state.data.map((item1) => {
                if (item1.includes(item)) {
                    let index = this.state.data.indexOf(item1)
                    this.state.data.splice(index, 1)
                    this.state.pekTalal.push(item1)
                }
            })
        })
        if (this.state.pekTalal.length > 0) {
            this.state.valogatott.push("Péksütemény")
            for (let i = 0; i < this.state.pekTalal.length; i++) {
                this.state.valogatott.push(this.state.pekTalal[i])
            }
        }

        if (this.state.zoldseggyumolcsTalal.length > 0) {
            this.state.valogatott.push("Zöldségek")
            for (let i = 0; i < this.state.zoldseggyumolcsTalal.length; i++) {
                this.state.valogatott.push(this.state.zoldseggyumolcsTalal[i])
            }
        }

        if (this.state.tejtermekekTalal.length > 0) {
            this.state.valogatott.push("Tejtermék")
            for (let i = 0; i < this.state.tejtermekekTalal.length; i++) {
                this.state.valogatott.push(this.state.tejtermekekTalal[i])
            }
        }

        if(this.state.data.length>0){
            this.state.valogatott.push("Egyéb")
            this.state.data.map((item) => {
                this.state.valogatott.push(item)
            })
        }
      

        for (let i = 0; i < this.state.valogatott.length; i++) {
            this.state.tartalom_tomb.push({
                id: i,
                isChecked: false,
                nev: this.state.valogatott[i]
            })
        }
    }

    handleChange = (id) => {
        let Noveltszam = this.state.szam
       
        let novelesErteke = (1 / this.state.tombHossz) * 100
        let zoldNoveles = (100 / 100) * novelesErteke

        
        let temp = this.state.tartalom_tomb.map((product) => {
            if (id === product.id) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
    
        this.setState({ tartalom_tomb: temp })
       
       temp.map((item) => {
            if (item.isChecked == true && id==item.id) {
               Noveltszam+=zoldNoveles
               
            }
            else if(item.isChecked==false && id==item.id)
            {
            
                Noveltszam-=zoldNoveles
            }
        })

        
        
     
        this.setState({ szam: Noveltszam})

    }

    componentDidMount() {

        this.funckio();
        fetch(IP.ipcim + 'regilistatorles', { method: 'DELETE' })
        console.log(this.state.valogatott)
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: "rgb(50,50,50)" }}>
           
             <View style={{position:"relative",top:height*0.02}}>
             <Text style={{color:"white",fontSize:18}}>Termékek megvásárolva:</Text>
             <Text style={{alignSelf:"flex-end"}}>a</Text>
                <ProgressBar  progress={this.state.szam} 
                height={8} 
                backgroundColor="rgb(1,194,154)"
                trackColor="red" />
            </View>
       
                <View style={{ marginTop: 40 }}>

                    {this.state.tartalom_tomb.map((item, key) =>
                        <View key={key}>
                            <View style={styles.elemek}>
                                {item.nev == "Péksütemény" || item.nev == "Zöldségek" || item.nev == "Tejtermék" || item.nev == "Egyéb" ?
                                    <Text style={styles.kategorianev}> {item.nev}</Text> :

                                    <Pressable onPress={() => { this.handleChange(item.id); }}>
                                        <MaterialIcons name={item.isChecked ? "radio-button-checked" : "radio-button-unchecked"} size={27} color="white" />
                                    </Pressable>

                                }{item.nev == "Péksütemény" || item.nev == "Zöldségek" || item.nev == "Tejtermék" || item.nev == "Egyéb" ?
                                    <Text style={{ marginBottom: 15 }}></Text> : <Text style={{ fontSize: 20, color: "white" }}> {item.nev}</Text>
                                }

                            </View>
                        </View>)}
                    <View style={{ marginTop: 40 }}>
                        <Text style={{ fontSize: 20, color: "white", marginLeft: 5 }}>Fizetett összeg:</Text>
                        <TextInput
                            style={{ height: 40, backgroundColor: "rgb(1,194, 154)", marginLeft: 5, width: 150, borderRadius: 10, borderColor: "black", borderWidth: 2 }}
                            onChangeText={szoveg => this.setState({ ar: szoveg })}
                            keyboardType='numeric'
                            value={this.state.ar}
                        />
                        <TouchableOpacity onPress={this.felvitel()}>
                            <Text style={{ fontSize: 20, color: "white", marginLeft: 5 }}>Mentés</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{margin:height*0.01}}></View>
            </ScrollView>
        );
    }
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    elemek: {
        backgroundColor: "rgb(50,50,50)",
        flexDirection: 'row',
        flex: 1,
        height: height * 0.08,
        alignItems: "center",
    },
    kategorianev: {
        alignSelf: "center",
        fontSize: 25,
        color: "white",
        width: "100%",
        height: "100%",
        textAlignVertical: "center",
        backgroundColor: "rgb(18,18,18)",
        borderRadius: 5
    }
});
