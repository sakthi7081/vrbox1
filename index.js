import React from "react";
import {
  AppRegistry,
  asset,
  Image,
  NativeModules,
  StyleSheet,
  Text,
  View,
  VrButton,
} from "react-360";

import { Surface } from "react-360-web";
const surfaceModule = NativeModules.surfaceModule;

class InfoPanel extends React.Component {
  state = {
    img: {
      name: "info.png",
      width: 50,
      height: 50,
    },
    set: false,
  };

  transformDisplay(id) {
    this._changeSurfaceDimensions(500, 400, id);
    this.setState({
      img: {
        name: `${id}.png`,
        width: 400,
        height: 300,
      },
      set: true,
    });
  }

  resetPanel(id) {
    this._changeSurfaceDimensions(50, 50, id);
    this.setState({
      img: {
        name: "info.png",
        width: 50,
        height: 50,
      },
      set: false,
    });
  }

  _changeSurfaceDimensions(width, height, id) {
    surfaceModule.resizeSurface(width, height, id);
  }

  render() {
    let { img, set } = this.state;

    return (
      <View
        style={styles.displayPanel}
        hitSlop={20}
        // onEnter={() => this.transformDisplay(this.props.id)}
        // onExit={() => this.resetPanel(this.props.id)}
      >
        <VrButton
          onClick={
            set
              ? () => this.resetPanel(this.props.id)
              : () => this.transformDisplay(this.props.id)
          }
        >
          <Image
            source={asset(`${img.name}`)}
            style={{ width: img.width, height: img.height }}
          />
        </VrButton>
      </View>
    );
  }
}

export default class TourismVR extends React.Component {
  render() {
    return (
      <View>
        {/* <Image
          source={asset("poland.png")}
          style={{ width: 500, height: 300 }}
        /> */}
        <View style={styles.attractionBox}>
          <Text style={styles.attractionText}>Welcome to the Modern House</Text>
          <VrButton onClick={() => surfaceModule.start()}>
            <Text style={styles.attractionText1}>Continue</Text>
          </VrButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  displayPanel: {
    width: 100,
    height: 100,
    flexDirection: "column",
  },
  attractionBox: {
    padding: 20,
    backgroundColor: "#F7F7F7",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    width: 500,
  },
  attractionText: {
    fontSize: 30,
    color: "#000",
  },
  attractionText1: {
    fontSize: 30,
    color: "#C4002F",
  },
});

AppRegistry.registerComponent("vrbox", () => TourismVR);
AppRegistry.registerComponent("InfoPanel", () => InfoPanel);
