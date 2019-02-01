import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Content, Container, Footer } from "native-base";
import { Button, Logo, Head, Input } from "../components";
import { Col, Grid, Row } from "react-native-easy-grid";
import Color from "../Color";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Container>
                <Head text={"Rejestracja"} back/>
                <Content>
                    <Logo size={50} />
                    <View>
                        <Input placeholder="login" />
                        <Input placeholder="hasło" />
                        <Input placeholder="powtórz hasło" />
                    </View>
                    <View
                        style={{
                            width: "100%",
                            height: 250,
                            justifyContent: "flex-end"
                        }}>
                        <Button
                            text={"Rejestacja"}
                            backgroundColor="white"
                            colorText={Color.primaryColor}
                            style={{
                                borderColor: Color.primaryColor,
                                borderWidth: 1
                            }} />
                    </View>
                </Content>
            </Container>
        );
    }
}

export default Register;