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
const backendUrl = 'http://10.108.69.231:8000/image-file';
const sendImageToServer = async (imageUri: string) => {
  try {
    const formData = new FormData();
    formData.append('photo', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'picTaken.jpg',
    } as any);
    const res = await axios.post(backendUrl, {image: formData}, {
			headers: {
				"Content-Type": "application/json",
				// "Content-Type": "multipart/form-data",
			},
		});
    //const response = await axios.post(backendUrl, formData);
    console.log('Extracted text from image:', res.data.text);
    Alert.alert(res.data.text);
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
          onPress={async () => {
            Alert.alert("Square button selected press ok and wait for feedback");
            if (picture) {
              await sendImageToServer(picture);
            }
            else {
              Alert.alert('No image selected');
            }
            setPicture("")
          }}
          iosName={"square.dashed"}
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