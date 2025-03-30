import { Image, Button, Platform, StyleSheet,Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {usePermissions} from 'expo-media-library'
import { useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import {router} from 'expo-router'
import 'expo-dev-client';

export default function HomeScreen() {
  const [cameraPermissions, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [mediaLibraryPermissions, requestMediaLibraryPermission] = usePermissions();

  async function handleContinue(){
    const allPerms = await requestAllPerms();
    if(allPerms){
      router.replace("/(tabs)/explore")
    }
    else{
      Alert.alert("To continue please provide permissions in settings")
    }
  }

  async function requestAllPerms(){
    const cameraStatus = await requestCameraPermission();
    const micStatus = await requestMicrophonePermission();
    const medLibStatus = await requestMediaLibraryPermission();
    if(!cameraStatus.granted || !micStatus.granted || !medLibStatus.granted){//|| !medLibStatus.granted
      Alert.alert("Error", "All Permission Required");
      return false;
    }
    await AsyncStorage.setItem("hasOpened", "true");
    return true;
  }
  return (
    <><View style={styles.container}>
      <Button title="Continue" onPress={handleContinue}/>
    </View></>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
});