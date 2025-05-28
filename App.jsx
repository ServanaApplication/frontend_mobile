import {View} from 'react-native';
import AppNavigation from './navigation/appNavigation';
import './global.css'


export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#1F1B24' }}>
  <AppNavigation />
</View>
  );
}
  