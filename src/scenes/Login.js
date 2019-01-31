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
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <ScrollView
                style={{
                flex: 1
            }}
                contentContainerStyle={{
                flex: 1,
                justifyContent: "flex-end"
            }}>

                <Logo size={150}/>

                <Input placeholder={"text"}/>
                <Input placeholder={"text"}/>
                {/* <View
                    style={{
                    flex: 1,
                    marginTop:50
                }}> */}
                    <Button text={"jhgsdfh"}/>
                    <Button text={"jhgsdfh"}/>
                {/* </View> */}

            </ScrollView>
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