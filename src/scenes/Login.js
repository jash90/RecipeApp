import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Content, Container} from "native-base";
import {Head} from "../components";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Container>
                <Head
                    right={true}
                    icon={"person-add"}
                    text={Language.get("sign")}
                    onPress={() => Actions.Register()}/>
                <View style={styles.fullStyle}>
                    <View>
                        <Logo size={150}/>
                        <Input
                            placeholder={Language.get("email")}
                            onChangeText={text => this.setState({email: text})}
                            value={this.state.email}/>
                        <Input
                            placeholder={Language.get("password")}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({password: text})}
                            value={this.state.password}/>
                    </View>
                    <Content contentContainerStyle={styles.buttonContener}>
                        <Button text={Language.get("login")} onPress={() => this.login()}/>
                    </Content>
                </View>
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
        justifyContent: "space-evenly",
        alignItems: "center"
    }
});

export default Login;