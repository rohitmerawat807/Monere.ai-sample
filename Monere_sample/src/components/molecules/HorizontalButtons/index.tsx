import type { FC } from 'react';
import React from 'react';
import { View, TouchableOpacity, Image, Animated, StyleSheet } from 'react-native';
import AppColors from '@/styles/colors';
import Spacing from '@/styles/spacing';
import Images from '../../../assets/index';

interface HorizontalButtonsProps {
    blinkAnimation: Animated.Value;
    isRecording: boolean;
    isTorchOn: boolean;
    onActionCapture: () => void;
    onActionRecord: () => void;
    onActionSwitch: () => void;
    onActionTorch: () => void;
}

const HorizontalButtons: FC<HorizontalButtonsProps> = ({
    onActionTorch,
    onActionCapture,
    onActionRecord,
    onActionSwitch,
    isTorchOn,
    isRecording,
    blinkAnimation,
}) => {
    return (
        <View style={styles.buttonsView}>
            <TouchableOpacity
                disabled={isRecording}
                onPress={onActionTorch}>
                <Image
                    source={Images.torch}
                    style={[
                        styles.miniIconsStyle,
                        isTorchOn && { tintColor: AppColors.THEME },
                    ]}
                />
            </TouchableOpacity>

            <TouchableOpacity
                disabled={isRecording}
                onPress={onActionCapture}>
                <Image source={Images.capture} style={styles.imageStyle} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onActionRecord}>
                <Animated.Image
                    source={Images.record}
                    style={[
                        styles.imageStyleWithoutTint,
                        isRecording && { opacity: blinkAnimation },
                    ]}
                />
            </TouchableOpacity>

            <TouchableOpacity
                disabled={isRecording}
                onPress={onActionSwitch}>
                <Image source={Images.switch} style={styles.miniIconsStyle} />
            </TouchableOpacity>
        </View>
    );
};

export default HorizontalButtons;

const styles = StyleSheet.create({
    buttonsView: {
        position: 'absolute',
        bottom: Spacing.SCALE_30,
        right: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    imageStyle: {
        height: Spacing.SCALE_50,
        width: Spacing.SCALE_50,
        tintColor: AppColors.WHITE,
    },
    miniIconsStyle: {
        height: Spacing.SCALE_30,
        width: Spacing.SCALE_30,
        tintColor: AppColors.WHITE,
    },
    imageStyleWithoutTint: {
        height: Spacing.SCALE_50,
        width: Spacing.SCALE_50,
    },
});
