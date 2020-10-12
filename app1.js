
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
      id:0,
      locationX1:[],
      locationX2:[],
      locationY1:[],
      locationY2:[],
      locationArr: [],
      lineArr: []
    }
  }

  UNSAFE_componentWillMount() {
    this.panResponder = PanResponder.create(
      {
        onStartShouldSetPanResponder: (event, gestureState) => true,

        onStartShouldSetPanResponderCapture: (event, gestureState) => true,

        onMoveShouldSetPanResponder: (event, gestureState) => true,

        onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

        onPanResponderGrant: (event, gestureState) => true,

        onPanResponderMove: (event, gestureState) => true,

        onPanResponderRelease: (event, gestureState) => {
          let tempX = event.nativeEvent.locationX.toFixed(2)
          let tempY = event.nativeEvent.locationY.toFixed(2)
          this.state.locationArr.push({
            id:(this.state.id++),
            locationX: tempX,
            locationY: tempY,
          })
          // this.state.lineArr = this.state.locationArr.reduce(function(result, value, index, array) {
          //   if (index % 2 === 0)
          //     result.push(array.slice(index, index + 2));
          //   return result;
          // }, []);
          // console.log("this.state.lineArr :- ", this.state.lineArr);
          if(this.state.locationArr.length >=2){
            let temp = this.state.locationArr.length-2
            console.log("temp :-", temp)
            let temp2 = this.state.locationArr
          let line = temp2.filter((g) => temp === (g.id))
            // this.state.lineArr = [...line,...this.state.lineArr]
            line.map((data)=>{
              this.state.locationX1=data.locationX
              this.state.locationY1= data.locationY
            })
        }
        this.state.locationArr.map((data)=>{
          this.state.locationX2=data.locationX,
          this.state.locationY2=data.locationY
        })
          // console.log("line :- ", this.state.lineArr);
          this.setState({
            // id:(i++),
            locationX: event.nativeEvent.locationX.toFixed(2),

            locationY: event.nativeEvent.locationY.toFixed(2)

          });
        }
      });
  }

  render() {
    const { locationArr,lineArr } = this.state
    console.log("location Arr :- ", locationArr);
    return (
      <View style={styles.MainContainer}>
        <Button title="Undo" onPress={() => { this.setState(locationArr.pop()) }} />

        {/* <View style={styles.childView}>
          {
            locationArr.map((data, key) => {
              return (
                <View key={key}>
                  <View
                    style={{
                      ...styles.point,
                      left: parseFloat(data.locationX),
                      top: parseFloat(data.locationY)

                    }} />
                </View>
              )

            })
          }

          <View><Text>{parseFloat(this.state.locationY)}</Text></View>


          <View style = {{ flex: 1, backgroundColor: 'transparent' }}  { ...this.panResponder.panHandlers } />

        </View> */}
        
        <View style={styles.childView}>
        <Svg style={{position:'absolute'}} height="100%" width="100%" >
          {
            locationArr.map((data, key) => {
              return (
                <Svg key ={key} >
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
      {/* {
        lineArr.map((data,key)=>{
          return(
            <Line key={key} x1={data.locationX} y1={data.locationY} x2={this.state.locationX} y2={this.state.locationY} stroke="red" strokeWidth="2" />
          )
          
        })
      } */}
       <Line  x1={this.state.locationX1} y1={this.state.locationY1} x2={this.state.locationX2} y2={this.state.locationY2} stroke="red" strokeWidth="2" />
          

                  
                
            {/* <Circle
              cx={parseFloat(this.state.locationX)}
              cy={parseFloat(this.state.locationY)}
              r="14"
              stroke="blue"
              strokeWidth="2.5"
              fill="green"
            /> */}
            </Svg>
          <View style = {{ flex: 1, backgroundColor: 'transparent' }}  { ...this.panResponder.panHandlers } />
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

  // this.state.lineArr.map((data)=>{
        //   this.state.lastArr.push({
        //     X1:data.locationX,
        //     Y1:data.locationY,
        //     X2:this.state.locationX,
        //     Y2:this.state.locationY
        //   })
        // })
        // console.log("last arr :- ", this.state.lastArr);