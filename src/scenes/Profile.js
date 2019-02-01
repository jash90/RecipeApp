import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import {Content, Container, Footer} from "native-base";
import {Button, Logo, Head, Input} from "../components";
import {Col, Grid, Row} from "react-native-easy-grid";
import Color from "../Color";
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Container>
                <Head text={"Coś na ząb"}/>
                <Content>
                    <Logo size={150}/>
                    <View>
                        <Text>Text</Text>
                    </View>
                    <View
                        style={{
                        width: "100%",
                        height: 250,
                        justifyContent: "space-evenly"
                    }}>
                        <Button text={"Moje przepisy"}/>
                        <Button
                            text={"Dodaj przepis"}
                            backgroundColor="white"
                            colorText={Color.primaryColor}
                            style={{
                            borderColor: Color.primaryColor,
                            borderWidth: 1
                        }}/>
                        <Button
                            text={"Wyloguj"}
                            backgroundColor="black"
                            colorText="white"
                            style={{
                            borderColor: "black",
                            borderWidth: 1
                        }}/>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default Profile;