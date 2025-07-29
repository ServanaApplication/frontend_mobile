import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AppNavigation from './navigation/appNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigation />
      </GestureHandlerRootView>
    </Provider>
  );
}