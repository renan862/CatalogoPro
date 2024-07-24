import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginUser from './src/pages/LoginUser';
import MinhaTela from './src/pages/MinhaTela';
import InsertUser from './src/pages/InsertUser';
import AlterUser from './src/pages/AlterUser';
import SearchProduct from './src/pages/SearchProduct';
import AlterProduct from './src/pages/AlterProduct';
import SearchUser from './src/pages/SearchUser';
import InsertProduct from './src/pages/InsertProduct';
import ProductListScreen from './src/pages/ProductListScreen';
import CartScreen from './src/pages/CartScreen';
import Pagame from './src/pages/pagame';
import Config from './src/pages/config.js';
import PaymentScreen from './src/pages/PaymentScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginUser">
        <Stack.Screen
          name="LoginUser"
          component={LoginUser}
          options={{
            title: 'Login',
            headerShown: false,
            headerTransparent: true,
            headerTintColor: '#00bfff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="MinhaTela"
          component={MinhaTela}
          options={{
            title: 'Tela Inicial',
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="InsertUser"
          component={InsertUser}
          options={{
            title: 'Cadastro de cliente',
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AlterUser"
          component={AlterUser}
          options={{
            title: 'Alteração de cliente',
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="SearchUser"
          component={SearchUser}
          options={{
            title: 'Consulta de cliente',
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AlterProduct"
          component={AlterProduct}
          options={{
            title: 'Alteração de Produto',
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="SearchProduct"
          component={SearchProduct}
          options={{
            title: 'Consulta de Produto',
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="InsertProduct"
          component={InsertProduct}
          options={{
            title: 'Cadastro de Produto',
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ProductListScreen"
          component={ProductListScreen}
          options={{
            title: 'Venda',
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            title: 'CartScreen',
            headerStyle: {
              backgroundColor: '#eb4034',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="Pagame"
          component={Pagame} // Corrigido aqui
          options={{
            title: 'Tela de Pagamento',
            headerStyle: {
              backgroundColor: '#eb4034',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
                  name="Config"
                  component={Config}
                  options={{
                    title: 'Config',
                    headerStyle: {
                      backgroundColor: '#eb4034',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
        <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{
            title: 'Tela de pagamento',
            headerStyle: {
                backgroundColor: '#eb4034',
                },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
            }}
                />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Registre o componente App com AppRegistry
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
AppRegistry.registerComponent(appName, () => App);

export default App;
