/* eslint-disable unicorn/consistent-function-scoping */
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/templates';
import { FontSize } from '@/styles/typography';
import Spacing from '@/styles/spacing';
import AppColors from '@/styles/colors';

function Example() {

  const { layout, gutters } = useTheme();

  const onActionAbout = () => {
    Linking.openURL("https://www.monere.ai/");
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

      <TouchableOpacity style={[styles.buttonStyle,
      styles.additionalButtonStyle]}>
        <Text>Use Sample Camera</Text>
      </TouchableOpacity>
    </SafeScreen>
  );
}

export default Example;

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
