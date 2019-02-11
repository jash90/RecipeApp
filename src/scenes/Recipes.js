import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import {Content, Container} from "native-base";
import {Head} from "../components";
import Color from "../Color";
import EStyleSheet from "react-native-extended-stylesheet";
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import api from "../api";
export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }
  componentDidMount() {
    const ingredients = this
      .props
      .ingredients
      .map(element => {
        return element.id;
      });
    api
      .getByIngredients(ingredients)
      .then(data => {
        this.setState({recipes: data.data.recipes});
      });
  }

  renderIngredient(item) {
    const styleTag = _.find(this.props.ingredients, {id: item.id})
      ? styles.selectedTag
      : styles.tag;
    return (
      <View style={styleTag}>
        <Text style={{
          color: Color.primaryColor
        }}>{item.name}</Text>
      </View>
    );
  }

  renderRecipe(item) {
    return (
      <TouchableOpacity onPress={() => Actions.Recipe({recipe: item})}>
        <View style={styles.recipe}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.content}>{`Czas trwania : ${item.preparationTime}min`}</Text>
          <FlatList
            horizontal
            contentContainerStyle={styles.ingredientList}
            data={_.take(item.ingredients, 5)}
            renderItem={({item}) => this.renderIngredient(item)}/>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container>
        <Head text={"Coś na ząb"}/>
        <Content contentContainerStyle={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <FlatList
              horizontal
              scrollEventThrottle={1900}
              data={this.props.ingredients}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.tagList}
              renderItem={({item}) => this.renderTag(item)}/>
            <FlatList
              data={this.state.recipes}
              renderItem={({item}) => this.renderRecipe(item)}/>
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
      <TouchableOpacity onPress={() => this.toggleIngredient(item)}>
        <View style={styleTag}>
          <Text style={{
            fontSize: 18,
            color
          }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  nextScene() {
    Actions.Recipes({ingredients: this.state.searchings});
  }

  toggleIngredient(ingredient) {
    const index = _.indexOf(this.state.searchings, ingredient);
    if (index > -1) {
      const array = this.state.searchings;
      array.splice(index, 1);
      this.setState({searchings: array});
    } else {
      const array = this.state.searchings;
      array.push(ingredient);
      this.setState({searchings: array});
    }
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
  content: {
    fontSize: 16
  },
  title: {
    fontWeight: "bold",
    fontSize: 22
  },
  ingredientList: {
    width: '100%',
    flexWrap: 'wrap'
  },
  recipeList: {
    width: "100%"
  },
  tagList: {
    width: '100%',
    flexWrap: 'wrap'
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
  button: {
    backgroundColor: 'white',
    width: 100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
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
