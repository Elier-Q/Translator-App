//import {ThemedView} from '@/components/ThemedView';
import { CameraView} from 'expo-camera'
import * as WebBrowser from 'expo-web-browser'
import { Image, Button, Platform, StyleSheet,Text, View, Alert } from 'react-native';
import * as React from 'react'
import 'expo-dev-client';
import IconButton from '@/components/IconButtons';

export default function TabTwoScreen() {
  const cameraRef = React.useRef<CameraView>(null);
  return(
    <View>
      <CameraView
        ref={cameraRef} style = {{flex: 1}}/> 
        
        <CameraView/>
    </View> 
    
  );
  }

