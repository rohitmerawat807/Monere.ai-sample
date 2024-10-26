/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable unicorn/consistent-function-scoping */
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/templates';
import { FontSize } from '@/styles/typography';
import Spacing from '@/styles/spacing';
import AppColors from '@/styles/colors';
import { useNavigation } from '@react-navigation/native';
import { Paths } from '@/navigation/paths';
import { useMicrophonePermission } from 'react-native-vision-camera';
import { useEffect } from 'react';

function Initial() {

  const { layout, gutters } = useTheme();
  const navigation: any = useNavigation();
  const { requestPermission } = useMicrophonePermission();

  useEffect(() => {
    requestPermission();
  }, [])

  const onActionAbout = () => {
    Linking.openURL("https://www.monere.ai/");
  }

  const navigateToCamera = () => {
    navigation.navigate(Paths.CameraScreen);
  }

  return (
    <SafeScreen
      isError={false}
      onResetError={() => { }}
      style={styles.container}
    >
      <View
        style={[
          layout.justifyCenter,
          layout.itemsCenter,
          gutters.marginTop_80,
        ]} >
        <Text style={styles.titleText}>Monere.ai</Text>
      </View>

      <TouchableOpacity
        onPress={() => { onActionAbout() }}
        style={styles.buttonStyle}>
        <Text>About Monere.ai</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => { navigateToCamera() }}
        style={[styles.buttonStyle,
        styles.additionalButtonStyle]}>
        <Text>Use Sample Camera</Text>
      </TouchableOpacity>
    </SafeScreen>
  );
}

export default Initial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontWeight: "800",
    fontSize: FontSize._26
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.SCALE_10,
    backgroundColor: AppColors.THEME,
    width: "90%",
    alignSelf: "center",
    marginTop: Spacing.SCALE_20
  },
  additionalButtonStyle: {
    marginTop: Spacing.SCALE_30
  }
})
