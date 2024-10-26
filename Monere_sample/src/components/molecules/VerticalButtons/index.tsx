import type { FC } from 'react';
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import AppColors from '@/styles/colors';
import Spacing from '@/styles/spacing';
import Images from '../../../assets/index';

interface VerticalButtonsProps {
    fpsValue: number;
    isHDR: boolean;
    isNightMode: boolean;
    onActionZoomIn: () => void;
    onActionZoomOut: () => void;
    onToggleFPS: () => void;
    onToggleHDR: () => void;
    onToggleNightMode: () => void;
    supports60Fps: boolean;
}

const VerticalButtons: FC<VerticalButtonsProps> = ({
    isHDR,
    supports60Fps,
    isNightMode,
    fpsValue,
    onActionZoomIn,
    onActionZoomOut,
    onToggleHDR,
    onToggleNightMode,
    onToggleFPS
}) => {
    return (
        <View style={styles.buttonsView}>
            <TouchableOpacity
                onPress={onToggleFPS}>
                <Text style={{color: AppColors.WHITE}}>{`${fpsValue} FPS`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onToggleNightMode}>
                <Image
                    source={Images.dayNight}
                    style={[styles.miniIconsStyle, isNightMode && { tintColor: AppColors.THEME }]}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onToggleHDR}>
                <Image
                    source={Images.hdr}
                    style={[styles.miniIconsStyle, isHDR && { tintColor: AppColors.THEME }]}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onActionZoomIn}>
                <Image
                    source={Images.zoomIn}
                    style={[
                        styles.miniIconsStyle,
                    ]}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onActionZoomOut}>
                <Image
                    source={Images.zoomOut}
                    style={[
                        styles.miniIconsStyle,
                    ]}
                />
            </TouchableOpacity>
        </View>
    );
};

export default VerticalButtons;

const styles = StyleSheet.create({
    buttonsView: {
        position: 'absolute',
        left: Spacing.SCALE_20,
        bottom: "15%",
        justifyContent: "space-between",
        height: "28%"
    },
    miniIconsStyle: {
        height: Spacing.SCALE_36,
        width: Spacing.SCALE_36,
        tintColor: AppColors.WHITE,
    },
});
