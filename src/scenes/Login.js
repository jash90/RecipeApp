import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    AsyncStorage
} from 'react-native';
import {Content, Container, Footer} from "native-base";
import {Button, Logo, Head, Input} from "../components";
import {Col, Grid, Row} from "react-native-easy-grid";
import Color from "../Color";
import {Actions} from 'react-native-router-flux';
import api from '../api';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            pass: ""
        };
    }
    render() {
        return (
            <Container>
                <Head text={"Coś na ząb"}/>
                <Content>
                    <Logo size={150}/>
                    <View>
                        <Input
                            placeholder="login"
                            value={this.state.login}
                            onChangeText={text => this.setState({login: text})}/>
                        <Input
                            placeholder="hasło"
                            value={this.state.pass}
                            onChangeText={text => this.setState({pass: text})}/>
                    </View>
                    <View
                        style={{
                        width: "100%",
                        height: 250,
                        justifyContent: "space-evenly"
                    }}>
                        <Button
                            text={"Zaloguj"}
                            onPress={() => this.login(this.state.login, this.state.pass)}/>
                        <Button
                            text={"Rejestacja"}
                            backgroundColor="white"
                            colorText={Color.primaryColor}
                            style={{
                            borderColor: Color.primaryColor,
                            borderWidth: 1
                        }}
                            onPress={() => Actions.Register()}/>
                    </View>
                </Content>
            </Container>
        );
    }

    login = async (login, password) => {
        api
            .login(login, password)
            .then(async (data) => {
              const dataLogin = data.data.data
                await AsyncStorage.setItem('login', dataLogin.login);
                await AsyncStorage.setItem('id', dataLogin.id);
                await AsyncStorage.setItem('accessToken', dataLogin.accessToken);
            })
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