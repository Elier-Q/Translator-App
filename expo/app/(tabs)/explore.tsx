//import {ThemedView} from '@/components/ThemedView';
import {CameraMode, CameraView , Camera} from 'expo-camera'
import * as WebBrowser from 'expo-web-browser'
import { Image, Button, Platform, StyleSheet,Text, View, Alert } from 'react-native';
import {useState , useRef , useEffect} from 'react';
import 'expo-dev-client';
import BottomRowTools from "@/components/BottomRowTools";
import IconButton from '@/components/IconButtons';

import { StatusBar } from 'expo-status-bar';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';

export default function TabTwoScreen() {

  let cameraRef = useRef<CameraView>(null);
  const [hasCameraPermission , setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission , setHasMediaLibraryPermission] = useState();

  return(
    <View style = {{flex: 1}}>
      <CameraView ref={cameraRef} style = {{flex: 1}}> 
          <BottomRowTools/>
        </CameraView>
    </View> 
    
  );
}

