import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  SectionList
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import api from "../api";
export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variable: 1,
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
      console.log({ingredients1:this.props.ingredients, ingredients});
    api
      .getByIngredients(ingredients)
      .then(data => {
        console.log(data.data);
        this.setState({recipes: data.data.recipes});
      });
  }
  renderRenderIngredient(item) {
    const styleTag = _.find(this.props.ingredients, {id: item.id})
      ? styles.selectedTag
      : styles.tag;
    return (
      <View style={styleTag}>
        <Text>{item.name}</Text>
      </View>
    );
  }

  renderRenderRecipe(item) {
    return (
      <View>
        <Text>{item.name}</Text>
        <FlatList
          horizontal
          contentContainerStyle={{
          width: '100%',
          flexWrap: 'wrap'
        }}
          data={_.take(item.ingredients, 5)}
          renderItem={({item}) => this.renderRenderIngredient(item)}/>
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      }}>
        <FlatList
          scrollEventThrottle={1900}
          data={this.props.ingredients}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
          width: '100%',
          flexWrap: 'wrap'
        }}
          renderItem={({item}) => this.renderTag(item)}/>
        <FlatList
          data={this.state.recipes}
          renderItem={({item}) => this.renderRenderRecipe(item)}/>
      </View>
    );
  }
  renderTag(item) {
    const index = _.indexOf(this.props.ingredients, item);
    let styleTag = styles.selectedTag;
    if (index < 0) {
      styleTag = styles.tag;
    }
    return (
      <TouchableOpacity onPress={() => this.toggleIngredient(item)}>
        <View style={styleTag}>
          <Text style={{
            fontSize: 18
          }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  add() {
    this.setState({
      variable: this.state.variable + 1
    });
  }

  remove() {
    this.setState({
      variable: this.state.variable - 1
    });
  }

  nextScene() {
    Actions.Recipes({ingredients: this.state.searchings});
  }
  toggleIngredient(ingredient) {
    const index = _.indexOf(this.state.searchings, ingredient);
    // console.log(index);
    if (index > -1) {
      const array = this.state.searchings;
      array.splice(index, 1);
      this.setState({searchings: array});
    } else {
      const array = this.state.searchings;
      array.push(ingredient);
      console.log(array);
      this.setState({searchings: array});
      //console.log(array);
    }
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  textInputContainer: {
    flex: 1,
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: 'white'
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
    borderColor: 'rgb(22,34,55)',
    backgroundColor: 'white'
  },
  selectedTag: {
    justifyContent: 'center',
    padding: 7,
    margin: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgb(22,34,55)',
    backgroundColor: 'red'
  }
});
