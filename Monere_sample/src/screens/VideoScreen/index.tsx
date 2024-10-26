/* eslint-disable import/no-extraneous-dependencies */

import { Button, StyleSheet } from 'react-native';
import { SafeScreen } from '@/components/templates';
import Video from 'react-native-video';
import { useNavigation, useRoute } from '@react-navigation/native';

function VideoScreen() {

    const route = useRoute();
    const navigation = useNavigation();

    //Passed video path with navigation
    const { videoPath } = route.params as { videoPath: string };

    return (
        <SafeScreen
            isError={false}
            onResetError={() => { }}
            style={styles.container}
        >
            <Video
                controls={true}
                resizeMode="contain"
                source={{ uri: `file://${videoPath}` }}
                style={styles.video}
            />
            <Button
                onPress={() => { navigation.goBack(); }}
                title='Back to camera' />
        </SafeScreen>
    );
}

export default VideoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    video: {
        width: '100%',
        height: '90%',
    },
})
