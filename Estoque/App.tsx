import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';

import Login from './src/pages/login.page';
import Loader from './src/pages/loader.page';
import CustomDrawerItem from './src/components/customs/drawerItem';
import Home from './src/pages/home.page';
import { TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import Lancamento from './src/pages/vendas.page'
import Alteracao from './src/pages/alteracao.page';
import Inventario from './src/pages/inventario.page';
import Pedido from './src/pages/pedido.page';
import Carrinho from './src/pages/carrinho.page';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation, state }) {
  const handleSairPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, width: '100%', alignItems: 'center', paddingBottom: 20 }}>
      <DrawerContentScrollView contentContainerStyle={{
        alignItems: 'center',
        gap: 10
      }}>
        <CustomDrawerItem
          label="Menu Inícial"
          onPress={() => navigation.navigate('Menu Inícial')}
          icon={require('./assets/home.png')}
          isActive={state.routes[state.index].name === 'Menu Inícial'}
          type={true}
        />
        <CustomDrawerItem
          label="Lançamento Estoque"
          onPress={() => navigation.navigate('Lançamento Estoque')}
          icon={require('./assets/box.png')}
          isActive={state.routes[state.index].name === 'Lançamento Estoque'}
          type={true}
        />
        <CustomDrawerItem
          label="Alteração Estoque"
          onPress={() => navigation.navigate('Alteração Estoque')}
          icon={require('./assets/return-box.png')}
          isActive={state.routes[state.index].name === 'Alteração Estoque'}
          type={true}
        />
        <CustomDrawerItem
          label="Inventário"
          onPress={() => navigation.navigate('Inventário')}
          icon={require('./assets/checklists.png')}
          isActive={state.routes[state.index].name === 'Inventário'}
          type={true}
        />
      </DrawerContentScrollView>
      <CustomDrawerItem
        label="Sair"
        onPress={handleSairPress}
        icon={require('./assets/exit.png')}
        isActive={false}
        type={false}
      />
    </View>
  );
}

function DrawerHome() {
  return (
    <Drawer.Navigator
      initialRouteName="Menu Inícial"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: 200,
        },
        drawerType: 'back',
        headerStyle: {
          backgroundColor: '#FFF',
          height: 100
        },
        sceneContainerStyle: {
          backgroundColor: '#FFF'
        }
      }}
    >
      <Drawer.Screen name="Menu Inícial" component={Home} options={({ navigation }) => ({
        headerRight: (props) => (
          <View style={{ width: 70, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./assets/logo_folhas.png')} style={{ flex: 1, width: 40 }} contentFit='contain' />
          </View>
        ),
        headerLeft: (props) => (
          <TouchableOpacity style={{ width: 70, height: '100%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.toggleDrawer()}>
            <Image source={require('./assets/menu.png')} style={{ flex: 1, width: 30 }} contentFit='contain' />
          </TouchableOpacity>
        ),
      })} />

      <Drawer.Screen name="Lançamento Estoque" component={Lancamento} options={({ navigation }) => ({
        headerRight: (props) => (
          <View style={{ width: 70, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./assets/logo_folhas.png')} style={{ flex: 1, width: 40 }} contentFit='contain' />
          </View>
        ),
        headerLeft: (props) => (
          <TouchableOpacity style={{ width: 70, height: '100%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.toggleDrawer()}>
            <Image source={require('./assets/menu.png')} style={{ flex: 1, width: 30 }} contentFit='contain' />
          </TouchableOpacity>
        ),
      })} />
      <Drawer.Screen name="Pedido" component={Pedido} options={({ navigation }) => ({
        headerRight: (props) => (
          <View style={{ width: 70, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./assets/logo_folhas.png')} style={{ flex: 1, width: 40 }} contentFit='contain' />
          </View>
        ),
        headerLeft: (props) => (
          <TouchableOpacity style={{ width: 70, height: '100%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.toggleDrawer()}>
            <Image source={require('./assets/menu.png')} style={{ flex: 1, width: 30 }} contentFit='contain' />
          </TouchableOpacity>
        ),
      })} />
      <Drawer.Screen name="Carrinho" component={Carrinho} options={({ navigation }) => ({
        headerRight: (props) => (
          <View style={{ width: 70, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./assets/logo_folhas.png')} style={{ flex: 1, width: 40 }} contentFit='contain' />
          </View>
        ),
        headerLeft: (props) => (
          <TouchableOpacity style={{ width: 70, height: '100%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.toggleDrawer()}>
            <Image source={require('./assets/menu.png')} style={{ flex: 1, width: 30 }} contentFit='contain' />
          </TouchableOpacity>
        ),
      })} />

      <Drawer.Screen name="Alteração Estoque" component={Alteracao} options={({ navigation }) => ({
        headerRight: (props) => (
          <View style={{ width: 70, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./assets/logo_folhas.png')} style={{ flex: 1, width: 40 }} contentFit='contain' />
          </View>
        ),
        headerLeft: (props) => (
          <TouchableOpacity style={{ width: 70, height: '100%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.toggleDrawer()}>
            <Image source={require('./assets/menu.png')} style={{ flex: 1, width: 30 }} contentFit='contain' />
          </TouchableOpacity>
        ),
      })} />

      <Drawer.Screen name="Inventário" component={Inventario} options={({ navigation }) => ({
        headerRight: (props) => (
          <View style={{ width: 70, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./assets/logo_folhas.png')} style={{ flex: 1, width: 40 }} contentFit='contain' />
          </View>
        ),
        headerLeft: (props) => (
          <TouchableOpacity style={{ width: 70, height: '100%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.toggleDrawer()}>
            <Image source={require('./assets/menu.png')} style={{ flex: 1, width: 30 }} contentFit='contain' />
          </TouchableOpacity>
        ),
      })} />

    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Loader" component={Loader} />
        <Stack.Screen name="HomeComponents" component={DrawerHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}