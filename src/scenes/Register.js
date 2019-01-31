import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import {Content, Container} from "native-base";
import {Button, Logo, Head, Input} from "../components";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View
                style={{
                flex: 120,
                justifyContent: "center"
            }}>

                <Logo size={150}/>
                <Input placeholder={"text"}/>
                <Input placeholder={"text"}/>
                <Input placeholder={"text"}/>
                <Button text={"register"}/>

            </View>
        );
    }
}

export default Register;