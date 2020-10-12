
import React, { Component } from 'react';

import { StyleSheet, View, Platform, Text, PanResponder, Button } from 'react-native';
import Svg, {
  Circle,
  Line,
} from 'react-native-svg';

export default class Project extends Component {
  constructor() {
    super();
    this.panResponder;
    this.state = {
      locationX: 0,
      locationY: 0,
      id: 0,
      locationArr: [],
      lineArr: [],
      extraArr: [],
      extra1Arr: [],
      finalArr: [],
      uniqueArr: []
    }
  }

  UNSAFE_componentWillMount() {
    this.panResponder = PanResponder.create(
      {
        onStartShouldSetPanResponder: (event, gestureState) => true,

        onStartShouldSetPanResponderCapture: (event, gestureState) => true,

        onMoveShouldSetPanResponder: (event, gestureState) => false,

        onMoveShouldSetPanResponderCapture: (event, gestureState) => false,

        onPanResponderGrant: (event, gestureState) => false,

        onPanResponderMove: (event, gestureState) => false,

        onPanResponderRelease: (event, gestureState) => {
          let tempX = event.nativeEvent.locationX.toFixed(2)
          let tempY = event.nativeEvent.locationY.toFixed(2)
          this.state.locationArr.push({
            id: (this.state.id++),
            locationX: tempX,
            locationY: tempY,
          })
          if (this.state.locationArr.length >= 2) {
            let temp = this.state.locationArr.length - 2
            let temp2 = this.state.locationArr
            let line = temp2.filter((g) => temp === (g.id))
            this.state.lineArr = [...line]
            line.map((data) => {
              this.state.extraArr.push(data)
            })
          }
          this.setState({
            locationX: event.nativeEvent.locationX.toFixed(2),

            locationY: event.nativeEvent.locationY.toFixed(2)

          });

          if (this.state.extraArr.length === this.state.locationArr) {
            return
          } else {
            this.state.locationArr.map((data) => {
              if (data.id > 0) {
                this.state.extra1Arr.push({
                  id: data.id - 1,
                  X2: data.locationX,
                  Y2: data.locationY
                })
              }
            })
          }

          this.state.uniqueArr = [...new Map(this.state.extra1Arr.map(item => [item.id, item])).values()]

          if (this.state.extraArr.length > 0 && this.state.uniqueArr.length > 0) {
            let op = this.state.extraArr.map((e, i) => {
              let temp = this.state.uniqueArr.find(element => element.id === e.id)
              if (temp.X2 || temp.Y2) {
                e.X2 = temp.X2,
                  e.Y2 = temp.Y2
              }
              return e;
            })
            this.state.finalArr = [...op]
          }

        }
      });
  }

  render() {
    const { locationArr, lineArr, finalArr, uniqueArr, extraArr } = this.state
    return (
      <View style={styles.MainContainer}>
        <Button title="Undo" onPress={() => {
          this.setState(locationArr.pop())
          this.setState(finalArr.pop())
          this.setState(uniqueArr.pop())
          this.setState(extraArr.pop())
        }} />
        <View style={styles.childView}>
          <Svg style={{ position: 'absolute' }} height="100%" width="100%" >
            {
              locationArr.map((data, key) => {
                return (
                  <Svg key={key} >
                    <Circle
                      cx={parseFloat(data.locationX)}
                      cy={parseFloat(data.locationY)}
                      r="14"
                      stroke="blue"
                      strokeWidth="2.5"
                      fill="green"
                    />
                  </Svg>
                )

              })


            }
            {
              finalArr.map((data, key) => {
                return (
                  <Line key={key} x1={data.locationX} y1={data.locationY} x2={data.X2} y2={data.Y2} stroke="red" strokeWidth="2" />
                )

              })
            }

          </Svg>
          <View style={{ flex: 1, backgroundColor: 'transparent' }}  {...this.panResponder.panHandlers} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    MainContainer:
    {
      flex: 1,
      paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },

    childView:
    {
      flex: 1,
      backgroundColor: '#263238',
      overflow: 'hidden'
    },

    text:
    {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      padding: 8,
      backgroundColor: '#607D8B',
    },

    point:
    {
      height: 27,
      width: 27,
      position: 'absolute',
      borderRadius: 15,
      backgroundColor: '#FF3D00'
    }
  });