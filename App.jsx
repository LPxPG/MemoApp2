import React from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import firebase from 'firebase'

import MemoListScreen from './src/screens/MemoListScreen'
import MemoDetailScreen from './src/screens/MemoDetailScreen'
import MemoEditScreen from './src/screens/MemoEditScreen'
import MemoCreateScreen from './src/screens/MemoCreateScreen'
import LogInScreen from './src/screens/LogInScreen'
import SignUpScreen from './src/screens/SignUpScreen'

import { firebaseConfig } from './env'

require('firebase/firestore')

const Stack = createStackNavigator()

// L102 : Warning非表示 "setting a timer for a long period of time"
LogBox.ignoreLogs([
  'Setting a timer',
])


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="LogIn"
        initialRouteName="MemoList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#467fd3',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTitle: 'Memo App',
          headerTintColor: '#fff',
          headerBackTitle: 'Back',

          // 遷移アニメーションのデフォルトをiOS形式に統一
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // スワイプによる画面遷移を有効化 (iOSはデフォルトで有効)
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        {/* <Stack.Screen name="MemoList" component={MemoListScreen} /> */}
        <Stack.Screen
          name="MemoList"
          component={MemoListScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen name="MemoDetail" component={MemoDetailScreen} />
        <Stack.Screen name="MemoEdit" component={MemoEditScreen} />
        <Stack.Screen name="MemoCreate" component={MemoCreateScreen} />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  // <MemoListScreen />
  // <MemoDetailScreen />
  // <MemoEditScreen />
  // <MemoCreateScreen />
  // <LogInScreen />
  // <SignUpScreen />
  )
}
