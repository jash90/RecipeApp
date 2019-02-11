import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import {Content, Container} from "native-base";
import {Head} from "../components";
import Color from "../Color";
import EStyleSheet from "react-native-extended-stylesheet";
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';

export default class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        };
    }

    render() {
        return (
            <Container>
                <Head text={"Coś na ząb"}/>
                <Content contentContainerStyle={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{this.props.recipe.name}</Text>
                        </View>
                        <FlatList
                            scrollEventThrottle={1900}
                            data={this.props.recipe.ingredients}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.list}
                            renderItem={({item}) => this.renderTag(item)}/>
                        <View>
                            <Text style={styles.content}>{`Czas trwania : ${this.props.recipe.preparationTime}min`}</Text>
                            <Text style={styles.content}>{this.props.recipe.content}</Text>
                        </View>
                    </ScrollView>
                </Content>
            </Container>
        );
    }
    renderTag(item) {
        const index = _.indexOf(this.props.ingredients, item);
        let styleTag = styles.selectedTag;
        let color = "white";
        if (index < 0) {
            styleTag = styles.tag;
            color = Color.primaryColor;
        }
        return (
            <View style={styleTag}>
                <Text
                    style={{
                    fontSize: 18,
                    color
                }}>{`${item.count} ${item.unit} ${item.name}`}</Text>
            </View>
        );
    }

    nextScene() {
        Actions.Recipes({ingredients: this.state.searchings});
    }
}

const styles = EStyleSheet.create({
    recipe: {
        flex: 1,
        borderColor: Color.primaryColor,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        margin: 5
    },
    title: {
        fontWeight: "bold",
        fontSize: 22
    },
    content: {
        fontSize: 16
    },
    ingredientList: {
        width: '100%',
        flexWrap: 'wrap'
    },
    content: {
        fontSize: 18,
        padding: 10
    },
    list: {
        width: '100%'
    },
    title: {
        padding: 10,
        fontWeight: "bold",
        fontSize: 25
    },
    titleContainer: {
        alignSelf: "center"
    },
    scrollView: {
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    container: {
        width: "100%",
        height: "100%"
    },
    icon: {
        fontSize: 40,
        color: 'red'
    },
    iconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tag: {
        justifyContent: 'center',
        padding: 7,
        margin: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Color.primaryColor,
        backgroundColor: 'white'
    },
    selectedTag: {
        justifyContent: 'center',
        padding: 7,
        margin: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Color.primaryColor,
        backgroundColor: Color.primaryColor
    }
});
