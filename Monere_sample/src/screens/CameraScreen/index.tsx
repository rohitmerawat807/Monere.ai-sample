
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */

import AppColors from '@/styles/colors';
import Spacing from '@/styles/spacing';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, StyleSheet, Image, Button, Animated, Alert } from 'react-native';
import type { CameraRuntimeError } from 'react-native-vision-camera';
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission } from 'react-native-vision-camera';
import { SafeScreen } from '@/components/templates';
import HorizontalButtons from '@/components/molecules/HorizontalButtons';
import { useNavigation } from '@react-navigation/native';
import { Paths } from '@/navigation/paths';
import VerticalButtons from '@/components/molecules/VerticalButtons';

export default function CameraScreen() {

    const navigation = useNavigation();
    const cameraRef = useRef<Camera>(null)
    const deviceBack = useCameraDevice("back");
    const deviceFront = useCameraDevice("front");
    const { hasPermission, requestPermission } = useCameraPermission();

    const [enableNightMode, setEnableNightMode] = useState(false);
    const [targetFps, setTargetFps] = useState(30);
    const [isCameraInitialized, setIsCameraInitialized] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isTorchOn, setTorchOn] = useState(false);
    const [isRearCamera, setCameraView] = useState(false);
    const [capturedImageObject, setCapturedImage] = useState<any>({});
    const [showPreview, setShowPreview] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(2);
    const [isHdR, setHDR] = useState(false);
    const blinkAnimation = useRef(new Animated.Value(1)).current;

    const format: any = useCameraFormat(isRearCamera ? deviceBack : deviceFront, [
        { photoHdr: isHdR },
        { videoHdr: isHdR },
    ]);
    const realDevice = isRearCamera ? deviceBack : deviceFront;
    const fps = Math.min(format?.maxFps ?? 1, targetFps)
    const supportsFlash = realDevice?.hasFlash ?? false
    const supportsHdr = format?.supportsPhotoHdr
    const supports60Fps = useMemo(() => realDevice?.formats.some((f) => f.maxFps >= 60), [realDevice?.formats])
    const canToggleNightMode = realDevice?.supportsLowLightBoost ?? false

    // Lifecycle Methods
    useEffect(() => {
        //Requesting for camera usage permission;
        requestPermission();
    }, []);

    useEffect(() => {
        //While recording, recording icon should be blink for better use experience;
        const blink = Animated.loop(
            Animated.sequence([
                Animated.timing(blinkAnimation, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(blinkAnimation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        );
        blink.start();
        return () => blink.stop();
    }, [blinkAnimation]);
    // Lifecycle Methods

    //Action Area Started
    const onActionTorch = () => {
        //Toggle-Torch or Flash
        if (supportsFlash) {
            setTorchOn(!isTorchOn);
        } else {
            Alert.alert("Camera", "This device doesn't have flash");
        }
    }

    const onActionSwitch = () => {
        //Switching Camera, front to rear and rear to front
        setCameraView(!isRearCamera);
    }

    const onActionCapture = async () => {
        //Capturing image with internal torch props managed
        const photo = await cameraRef.current.takePhoto({ flash: isTorchOn ? "on" : "off" });
        setCapturedImage(photo);
        setShowPreview(true);
        setZoomLevel(2)
        setHDR(false)
    }

    const onActionRecord = async () => {
        //Video Recording and after recording navigating user to video player screen to play recorded video.
        if (isRecording) {
            await cameraRef.current?.stopRecording();
            setIsRecording(false);
        } else {
            setIsRecording(true);
            cameraRef.current?.startRecording({
                flash: isTorchOn ? "on" : "off",
                onRecordingFinished: (video) => {
                    setIsRecording(false);
                    navigation.navigate(Paths.VideoScreen, { videoPath: video.path });
                },
                onRecordingError: (error) => console.log(error),
            });
        }
    }

    const onActionRetake = () => {
        //After captured image preview, user can retake
        setShowPreview(!showPreview);
    }

    const onToggleHDR = () => {
        //User can use HDR feature also
        if (supportsHdr) {
            setHDR(!isHdR);
        } else {
            Alert.alert("Camera", "This device doesn't support HDR");
        }
    }

    const onToggleNightMode = () => {
        //User can use nightmode feature also
        if (canToggleNightMode) {
            setEnableNightMode(!enableNightMode);
        } else {
            Alert.alert("Camera", "Night mode not available");
        }
    }

    const onZoomIn = () => {
        //Zoom in to max 16
        if (zoomLevel === 16) {
            return;
        }
        setZoomLevel(zoomLevel + 1)
    }

    const onZoomOut = () => {
        //Zoom out to minimum 1
        if (zoomLevel === 1) {
            return;
        }
        setZoomLevel(zoomLevel - 1)
    }

    const onToggleFPS = () => {
        //Set FPS to 30 or 60
        if (supports60Fps) {
            setTargetFps((t) => (t === 30 ? 60 : 30))
        } else {
            Alert.alert("Camera", "60 FPS is not available in your device camera");
        }
    }

    const onInitialized = useCallback(() => {
        //Camera Initialization
        setIsCameraInitialized(true)
    }, [])

    const onError = useCallback((error: CameraRuntimeError) => {
        //Managing camera runtime errors
        switch (error.code) {
            case "device/configuration-error":
                Alert.alert("Camera Error", "Camera Configuration error");
                break
            case "device/microphone-unavailable":
                Alert.alert("Camera Error", "Camera permission is not granted");
                break
            case "device/invalid-device":
                Alert.alert("Camera Error", "Invalid camera device");
                break
            default:
                break
        }
    }, [])
    //Action Area Ended

    //UI Area Started
    const renderHorizontalActionButtons = () => {
        //Showing Flash/Torch, Capture, Record and Camera-Switch buttons Icons
        return (
            <HorizontalButtons
                blinkAnimation={blinkAnimation}
                isRecording={isRecording}
                isTorchOn={isTorchOn}
                onActionCapture={onActionCapture}
                onActionRecord={onActionRecord}
                onActionSwitch={onActionSwitch}
                onActionTorch={onActionTorch}
            />
        )
    }

    const renderVerticalActionButtons = () => {
        //Showing HDR, Zoom-in and Zoom-out buttons Icons
        return (
            <VerticalButtons
                fpsValue={targetFps}
                isHDR={isHdR}
                isNightMode={enableNightMode}
                onActionZoomIn={onZoomIn}
                onActionZoomOut={onZoomOut}
                onToggleFPS={onToggleFPS}
                onToggleHDR={onToggleHDR}
                onToggleNightMode={onToggleNightMode}
                supports60Fps={true}
            />
        )
    }

    const renderImagePreview = () => {
        //Image preview of captured image
        return (
            <>
                <Image
                    source={{ uri: `file://${capturedImageObject?.path}` }}
                    style={styles.preview} />

                <Button onPress={onActionRetake} title='Retake' />
            </>

        )
    }

    if (!hasPermission) { return (<Text>No permission</Text>) }
    if (realDevice == null) { return (<Text>No Devices</Text>) }

    return (
        <SafeScreen
            isError={false}
            onResetError={() => { }}
            style={styles.container}
        >
            {!showPreview ? <Camera
                audio={true}
                device={realDevice}
                enableZoomGesture={true}
                format={format}
                fps={fps}
                isActive={true}
                lowLightBoost={realDevice.supportsLowLightBoost && enableNightMode}
                onError={onError}
                onInitialized={onInitialized}
                outputOrientation="device"
                photo={true}
                photoHdr={format.supportsPhotoHdr}
                photoQualityBalance="quality"
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                video={true}
                videoHdr={format.supportsVideoHdr}
                zoom={zoomLevel}
            /> : null}
            {isCameraInitialized && !showPreview ? renderHorizontalActionButtons() : null}
            {isCameraInitialized && !showPreview ? renderVerticalActionButtons() : null}
            {showPreview ? renderImagePreview() : null}
        </SafeScreen>

    )
}
//UI Area Ended

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonsView: {
        position: "absolute",
        bottom: Spacing.SCALE_30,
        right: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    button: {
        padding: Spacing.SCALE_6,
        backgroundColor: AppColors.THEME,
        width: "20%",
        borderRadius: Spacing.SCALE_8,
        justifyContent: "center",
        alignItems: "center"
    },
    imageStyle: {
        height: Spacing.SCALE_50,
        width: Spacing.SCALE_50,
        tintColor: AppColors.WHITE
    },
    imageStyleWithoutTint: {
        height: Spacing.SCALE_50,
        width: Spacing.SCALE_50,
    },
    miniIconsStyle: {
        height: Spacing.SCALE_30,
        width: Spacing.SCALE_30,
        tintColor: AppColors.WHITE
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: Spacing.SCALE_20
    },
    preview: {
        height: "90%",
        width: "100%",
    }
})
