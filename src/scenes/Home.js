import React, { Component } from 'react';
import { View, Text, Modal, TextInput, Dimensions} from 'react-native';
import { Head } from '../components';
import EStyleSheet from 'react-native-extended-stylesheet';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import api from '../api';
import { Searching } from '../scenes';
import { Header, Title, Left, Right, Body, Icon } from 'native-base';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      ingredient: '',
      searchings: [],
      visible: false
    };
  }
  componentDidMount() {
    api.ingredients().then(data => {
      this.setState({ ingredients: data.data.data });
    });
  }

  renderFooter() {
    return (
      <View
        style={{
          height: 80,
          flexDirection: 'row',
          backgroundColor: 'blue'
        }}>
        <View style={styles.tab}>
          <Icon name="kitchen" size={30} color="white" />
          <Text style={{ color: 'white', fontSize: 16 }}>Coś na ząb</Text>
        </View>
        <View style={styles.tab}>
          <Icon name="book" size={32} color="white" style={{}} />
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Przepisy
          </Text>
        </View>
        <View style={styles.tab}>
          <Icon name="straighten" size={30} color="white" />
          <Text style={{ color: 'white', fontSize: 16 }}>Przelicznik</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Head
          right
          icon="search"
          onPress={() => this.setState({ visible: true })}
        /> */}
          <Head
              left
              leftIcon="arrow-back"
              leftPress={() => this.setState({ visible: false })}
              content={
                <View style={{width:Dimensions.get('window').width-110, backgroundColor:"white"}}>
                <TextInput placeholder="Text"/>
                </View>
              }
              right
              rightIcon="search"
            />
        <View style={{ flex: 1 }}>
          <Modal
            visible={this.state.visible}
            transparent={false}
            animationType="slide">
            <Head
              left
              leftIcon="arrow-back"
              leftPress={() => this.setState({ visible: false })}
              content={
                <View style={{width:200, height:30, backgroundColor:"white"}}>
                <TextInput placeholder="Text" style={{flex:1,}}/>
                </View>
              }
            />
          </Modal>
        </View>
      </View>
    );
  }
  renderScene() {
    return <Searching />;
  }
}

const styles = EStyleSheet.create({
  styleHeader: { backgroundColor: '$primaryColor' },
  textHeader: { flex: 3, justifyContent: 'center', alignItems: 'center' },
  iconLeftHeader: { color: 'white', paddingLeft: 5 },
  iconRightHeader: { paddingRight: 5 },
  fullStyle: { flex: 1 },
  tab: {
    flex: 1,
    backgroundColor: '$primaryColor',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
