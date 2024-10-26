import type { RootStackParamList } from '@/navigation/types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';
import { CameraScreen } from '@/screens';
import VideoScreen from '@/screens/VideoScreen';
import Initial from '@/screens/Initial/Initial';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
          <Stack.Screen component={Initial} name={Paths.Initial} />
          <Stack.Screen component={CameraScreen} name={Paths.CameraScreen} />
          <Stack.Screen component={VideoScreen} name={Paths.VideoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
