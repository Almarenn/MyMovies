import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
} from 'react-native';

import {createStackNavigator, createAppContainer}
from 'react-navigation';

//Main View
class HomeScreen extends React.Component{
  constructor(){
    super()
    this.state= {
      dataSource:[],
        isLoading: true
    }
  }

  static navigationOptions = {
    title: 'MyMovies',
      headerStyle: {
          backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold',
      },
  };


  renderItem = ({item}) =>{
    const {navigate} = this.props.navigation;
    return (
        <View style={styles.container}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('DetailsScreen', {myparm: item})}
            >
            <Text style={{ fontSize: 18}}> {item.Title}</Text>
        </TouchableOpacity>
        <View style={[styles.countContainer]}>
          <Text style={[styles.countText]}>
          { this.state.count !== 0 ? this.state.count: null}
  </Text>
  </View>
        </View>

    );
  }

  renderSeparator = () => {
    return (
        <View
          style={{height: 1, width: '100%', backgroundColor: 'red'}}>
          </View>
    )
}
  componentDidMount(){
    fetch('http://www.omdbapi.com/?s=avengers&apikey=480344f1')
        .then((response) => response.json())
        .then((responseJson) =>{
            this.setState({
              dataSource: responseJson.Search,
                isLoading: false
            })
        })
        .catch((error) =>{
            console.log(error)
        })
  }

  render(){
    return(
        this.state.isLoading
        ?
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size= "large" color= "#330066" animating />
            </View>
            :
        <View style={styles.container}>
          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={this.renderSeparator}
            />
        </View>
    );
  }
}

//Second View
class DetailsScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('myparm');
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Image style={{ width: 300, height: 300, margin:5}}
                       source = {{uri: item.Poster}} />
                <Text style={{ fontSize: 24, color: 'blue',  fontWeight: 'bold'}}>
                    Title: {item.Title}
                </Text>
                <Text style={{ fontSize: 24, color: 'blue',  fontWeight: 'bold'}}>
                    imdbID: {item.imdbID}
                </Text>
                    <Text style={{ fontSize: 24, color: 'blue',  fontWeight: 'bold'}}>
                    Year: {item.Year}
                </Text>
            </View>
        );
    }
}

const MainNavigator = createStackNavigator({
    HomeScreen, DetailsScreen
});
export default createAppContainer(MainNavigator);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});