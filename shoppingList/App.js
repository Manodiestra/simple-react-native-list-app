import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {Button, Container} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShoppingListScreen from './src/components/screens/shopping_list_screen';
import CreateListScreen from './src/components/screens/create_list_screen';
import store from './src/store/store';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Shopping List"
              component={ShoppingListScreen}
              options={({navigation}) => ({
                headerRight: () => (
                  <Container style={this.styles.addListButton}>
                    <Button
                      transparent
                      onPress={() =>
                        navigation.navigate('Create Shopping List')
                      }>
                      <Icon name="plus" size={24} color="blue" />
                    </Button>
                  </Container>
                ),
              })}
            />
            <Stack.Screen
              name="Create Shopping List"
              component={CreateListScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
  styles = StyleSheet.create({
    addListButton: {
      margin: 8,
    },
  });
}
