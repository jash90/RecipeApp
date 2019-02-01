import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    FlatList,
    Modal
} from 'react-native';
import {Content, Container, Footer, Icon} from "native-base";
import {Button, Logo, Head, Input} from "../components";
import {Col, Grid, Row} from "react-native-easy-grid";
import Color from "../Color";
class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [
                {
                    name: "masło",
                    unit: "szt.",
                    count: 1
                }
            ]
        };
    }
    render() {
        return (
            <Container>
                <Head text={"Coś na ząb"}/>
                <Content>
                    <View>
                        <Input placeholder="nazwa"/>
                        <Input placeholder="content"/>
                        <Input placeholder="preparationTime" keyboardType="numeric"/>
                        <FlatList
                            data={this.state.ingredients}
                            renderItem={({item}) => {
                            return (
                                <View>
                                    <View
                                        style={{
                                        width: "90%",
                                        paddingVertical: 10,
                                        alignSelf: "center",
                                        flexDirection: "row"
                                    }}>
                                        <View
                                            style={{
                                            flex: 1,
                                            borderRadius: 360,
                                            borderWidth: 1,
                                            borderColor: "black",
                                            padding: 5,
                                            marginHorizontal: 5,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Text
                                                style={{
                                                fontSize: 20
                                            }}>{`${item.count} ${item.unit}`}</Text>
                                        </View>
                                        <View
                                            style={{
                                            flex: 4,
                                            borderRadius: 20,
                                            borderWidth: 1,
                                            borderColor: "black",
                                            padding: 5,
                                            marginHorizontal: 5,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Text
                                                style={{
                                                fontSize: 20
                                            }}>
                                                {item.name}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 360,
                                            borderWidth: 1,
                                            borderColor: "black",
                                            padding: 5,
                                            marginHorizontal: 5,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Icon name="close"/>
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                            ListHeaderComponent={() => {
                            return (
                                <View
                                    style={{
                                    width: "90%",
                                    paddingVertical: 10,
                                    alignSelf: "center",
                                    flexDirection: "row"
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                        let ingredients = this.state.ingredients;
                                        ingredients.push({name: "masło", unit: "szt.", count: 1});
                                        this.setState({ingredients})
                                    }}>
                                        <View
                                            style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 360,
                                            borderWidth: 1,
                                            borderColor: "black",
                                            padding: 5,
                                            marginHorizontal: 5,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Icon name="add"/>
                                        </View>
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                        flex: 1,
                                        borderRadius: 20,
                                        borderWidth: 1,
                                        borderColor: "black",
                                        padding: 5,
                                        marginHorizontal: 5,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Text
                                            style={{
                                            fontSize: 20
                                        }}>
                                            Składniki
                                        </Text>
                                    </View>
                                </View>
                            );
                        }}/>
                    </View>
                    <View
                        style={{
                        width: "100%",
                        height: 250,
                        justifyContent: "space-evenly"
                    }}>
                        <Button text={"Dodaj"}/>
                        <Button
                            text={"Usuń"}
                            backgroundColor="white"
                            colorText={Color.primaryColor}
                            style={{
                            borderColor: Color.primaryColor,
                            borderWidth: 1
                        }}/>
                    </View>
                </Content>
                <Modal transparent={true} visible={true}>
                <View style={{flex:1, backgroundColor:"rgba(255,255,255,0.6)"}}>
                        <Input placeholder="ilość" />
                        <Input placeholder="miara" />
                </View>
                </Modal>
            </Container>
        );
    }s
}

export default AddRecipe;