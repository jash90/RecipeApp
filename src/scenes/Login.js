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
class Login extends Component {
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
                        <Input placeholder="login"/>
                        <Input placeholder="hasło" />
                    </View>
                        <View style={{width:"100%", height:250, justifyContent:"space-evenly"}}>
                            <Button text={"Zaloguj"}/>
                            <Button text={"Rejestacja"} backgroundColor="white" colorText={Color.primaryColor} style={{borderColor:Color.primaryColor,borderWidth:1}}/>
                    </View>
                </Content>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    fullStyle: {
        flex: 1
    },
    buttonContener: {
        width: "100%",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    }
});

export default Login;