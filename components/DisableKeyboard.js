import React, { PureComponent } from "react";
import { TouchableOpacity, View } from "react-native";

export default class DisableInputKeyboard extends PureComponent {
  static defaultProps = {
    children: null
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View pointerEvents={"box-only"}>{this.props.children}</View>
      </TouchableOpacity>
    );
  }
}