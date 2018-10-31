import React, { Component } from "react";
import {
    Container,
    Header,
    Title,
    Button,
    Left,
    Right,
    Body,
} from "native-base";
import { View, Alert, NativeModules, TouchableOpacity, ScrollView, Text, StyleSheet, TextInput,Dimensions } from "react-native";
import BottomNavigation, {
    FullTab
} from "react-native-material-bottom-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const tabs = [
    {
        key: "movies-tv",
        icon: "movie",
        label: "Movies & TV",
        barColor: "#388E3C",
        pressColor: "rgba(255, 255, 255, 0.16)"
    },
    {
        key: "chat",
        icon: "gamepad-variant",
        label: "Chat",
        barColor: "#388E3C",
        pressColor: "rgba(255, 255, 255, 0.16)"
    },
    {
        key: "music",
        icon: "music-note",
        label: "Music",
        barColor: "#388E3C",
        pressColor: "rgba(255, 255, 255, 0.16)"
    }
];

// const ApplozicChat = NativeModules;
class BottomTabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            email: "",
            phoneNumer: "",
            pass_word: "",
            displayName: "",
            loggedIn: false,
            visible: false,
            title: "Login/SignUp",
            mytoken: ""
        };
    }
    renderIcon = icon => ({ isActive }) => (
        <MaterialCommunityIcons size={24} color="white" name={icon} />
    )
	static navigationOptions = {
		header: null,
	}
    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            style={{ paddingBottom: 19 }}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )

    handlePress = (newTab) => {
        this.setState({ activeTab: newTab.key });
        if (!this.state.loggedIn) {
            alert("Please register or login to get the features");
        }
        else {
            if (newTab.key === "movies-tv") {
               alert("No Movie  is there");
            }
            else if (newTab.key === "music") {
                alert("No Music Content is there");
            }
           else {
                NativeModules.ApplozicChat.openChat();
            }
        }
    };


    show = () => {
        this.setState({ title: "Loading....!" });
        this.chatLogin();
    }
    chatLogin = () => {

        if (this.state.userId.length > 0 && this.state.pass_word.length > 0) {
            NativeModules.ApplozicChat.login({
                "userId": this.state.userId,
                "email": this.state.email,
                "contactNumber": this.state.phoneNumber,
                "password": this.state.pass_word,
                "displayName": this.state.displayName
            }, (error, response) => {
                if (error) {
                    console.log("error " , error);
                } else {
                  
                    this.setState({ loggedIn: true, title: "Loading..." });
                    this.createGroup();
                    
                  
                }
            });
        } else {
            this.setState({ title: "Login/SignUp" });
            alert("Please Enter UserId & Password");
        }
    }
    createGroup = () => {
        var groupDetails = {
            "groupName": "React Test3",
            "clientGroupId": "recatNativeCGI",
            "groupMemberList": ["ak101", "ak102", "ak103"], // Pass list of user Ids in groupMemberList
            "imageUrl": "https://www.applozic.com/favicon.ico",
            "type": 2,    //'type' : 1, //(required) 1:private, 2:public, 5:broadcast,7:GroupofTwo
            "metadata": {
                "key1": "value1",
                "key2": "value2"
            }
        };
        NativeModules.ApplozicChat.createGroup(groupDetails, (error, response) => {
            if (error) {
                console.log(error);
            } else {
                console.log(response,"ddfgfgh");
            }
        });
    }
    render() {

        return (
            <Container >
                <Header style={{ backgroundColor: "#388E3C"}}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <MaterialCommunityIcons name="menu" size={30} color="white" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>BottomTab</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{ flex: 1}}>
                    {!this.state.loggedIn ?
                        <ScrollView>
                            <Text style={styles.titleText}>
                                Applozic </Text>
                            <TextInput style={styles.inputText}
                                keyboardType="default"
                                placeholder="UserId"
                                maxLength={25}
                                underlineColorAndroid="transparent"
                                value={this.state.userId}
                                onChangeText={userId => this.setState({ userId })} />
                            <TextInput type="email-address"
                                style={styles.inputText}
                                placeholder="Email"
                                keyboardType="email-address"
                                maxLength={30}
                                underlineColorAndroid="transparent"
                                value={this.state.email}
                                onChangeText={email => this.setState({ email })} />
                            <TextInput style={styles.inputText}
                                placeholder="Phone Number"
                                keyboardType="phone-pad"
                                underlineColorAndroid="transparent"
                                maxLength={10}
                                value={this.state.phoneNumber}
                                onChangeText={phoneNumber => this.setState({ phoneNumber })} />
                            <TextInput id="password"
                                type="password"
                                style={styles.inputText}
                                maxLength={25}
                                placeholder="Password"
                                keyboardType="default"
                                underlineColorAndroid="transparent"
                                value={this.state.pass_word}
                                secureTextEntry={true}
                                password="true"
                                onChangeText={pass_word => this.setState({ pass_word })} />
                            <TextInput id="displayName"
                                style={styles.inputText}
                                placeholder="Display Name"
                                keyboardType="default"
                                underlineColorAndroid="transparent"
                                value={this.state.displayName}
                                maxLength={25}
                                onChangeText={displayName => this.setState({ displayName })} />
                            <TouchableOpacity activeOpcaity={0.9} style={{ height:HEIGHT / 100 * 8, width: WIDTH / 100 * 32, backgroundColor: "lightgreen", alignSelf: "center", marginTop: 15, justifyContent: "center" }} onPress={() => this.show()}><Text style={{ textAlign: "center" }}>{this.state.title}</Text></TouchableOpacity>
                        </ScrollView>
                        :
                        <View style={{ flex: 1, justifyContent: "center",alignContent:"center" }}>
                            <Text style={{textAlign:"center",fontSize:22,color:"darkgreen",marginTop:HEIGHT / 100 * 35}}> You are Sucessfully Logged in </Text>

                        </View>
                    }
                     <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <BottomNavigation
                        onTabPress={newTab => this.handlePress(newTab)}
                        renderTab={this.renderTab}
                        tabs={tabs}
                    />
                     </View>
                </View>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#4D394B"
    },
    btn: {
        fontSize: 23,
        fontWeight: "bold",
        color: "yellow",
        marginTop: 20,
        alignSelf: "center"
    },
    baseText: {
        fontFamily: "Cochin",
        color: "#fff",
        marginBottom: 25,
        alignSelf: "center"
    },
    titleText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 15,
        alignSelf: "center"
    },
    inputText: {
        width: 330,
        height: 40,
        backgroundColor: "#fff",
        marginBottom: 6,
        padding: 10,
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10
    }
});
export default BottomTabBar;
