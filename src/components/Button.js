import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";

import Color from "../Color";

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{ width: "100%", height: 60 }}
        onPress={this.props.onPress}
      >
        <View
          style={[{
            borderRadius: 20,
            width: "90%",
            height: 60,
            backgroundColor: this.props.backgroundColor?this.props.backgroundColor:Color.primaryColor,
            justifyContent:"center",
            alignItems:"center",
            alignSelf:"center"
          }, this.props.style]}
        >
          <Text style={{ color: this.props.colorText?this.props.colorText:"white", fontSize: 20, }}>
            {this.props.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
