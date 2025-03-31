import { Image } from "expo-image";
import * as FileSystem from 'expo-file-system';
import { Alert, View } from "react-native";
import IconButton from "./IconButton";
import { shareAsync } from "expo-sharing";
import { saveToLibraryAsync } from "expo-media-library";
import axios from 'axios';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

interface PictureViewProps {
  picture: string;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
}

const sendImageToServer = async (imageUri: string) => {
  try{
    const base64String = await FileSystem.readAsStringAsync(imageUri, {encoding: FileSystem.EncodingType.Base64,});
    //encoding: FileSystem.readAsStringAsync(imageUri, {encoding: FileSystem.EncodingType.Base64,});
    const backendUrl = 'http://10.108.69.231:8000/image-uri';

    //var dataV = 'data:image/jpeg;base64,';
    //dataV += base64String;
    const data = {uri: base64String};
    
    const response = await axios.post(backendUrl, data);
    console.log('Extracted text from image:', response.data.text);
    Alert.alert(response.data.text);
  } catch(error){
    console.error('Error:', error);
    Alert.alert("error");
  }
};

export default function PictureView({ picture, setPicture }: PictureViewProps) {
  return (
    <Animated.View
      layout={LinearTransition}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <View
        style={{
          position: "absolute",
          right: 6,
          zIndex: 1,
          paddingTop: 50,
          gap: 16,
        }}
      >
        <IconButton
          onPress={async () => {
            if(picture){
              await sendImageToServer(picture);
            }
            else{
              Alert.alert('No image selected');
            }
            saveToLibraryAsync(picture);
            const imageBase64Uri = picture;  // Example Base64 string

            // FastAPI backend URL


            // Prepare the data to send (Base64 URI)
            //const data = { image_base64: imageBase64Uri };

            // Use Axios to send a POST request to FastAPI
          /*  axios.post(backendUrl, { uri : imageBase64Uri })
              .then(response => {
                console.log('Extracted text from image:', response.data.text);
                Alert.alert(response.data.text);
              })
              .catch(error => {
                console.error('Error:', error);
                Alert.alert("error");
              }); */
            Alert.alert("✅ Picture saved!");
          }}
          iosName={"arrow.down"}
          androidName="close"
        />
        <IconButton
          onPress={() => setPicture("")}
          iosName={"square.dashed"}
          androidName="close"
        />
        <IconButton
          onPress={() => setPicture("")}
          iosName={"circle.dashed"}
          androidName="close"
        />
        <IconButton
          onPress={() => setPicture("")}
          iosName={"triangle"}
          androidName="close"
        />
        <IconButton
          onPress={async () => await shareAsync(picture)}
          iosName={"square.and.arrow.up"}
          androidName="close"
        />
      </View>

      <View
        style={{
          position: "absolute",
          zIndex: 1,
          paddingTop: 50,
          left: 6,
        }}
      >
        <IconButton
          onPress={() => setPicture("")}
          iosName={"xmark"}
          androidName="close"
        />
      </View>
      <Image
        source={picture}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 5,
        }}
      />
    </Animated.View>
  );

}