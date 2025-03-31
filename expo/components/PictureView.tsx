import { Image } from "expo-image";
import * as FileSystem from 'expo-file-system';
import { Alert, View } from "react-native";
import IconButton from "./IconButton";
import { shareAsync } from "expo-sharing";
import { saveToLibraryAsync } from "expo-media-library";
import axios from 'axios';
import { FetchResult } from "react-native";
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
interface ErrorWithMessage {
  message: string;
}

const sendImageToServer = async (imageUri: string) => {
  try {
    const formData = new FormData();

    // Ensure imageUri is a valid URI and fetch the image as a Blob
    const response = await fetch(imageUri);
    
    // Check if response is valid
    if (!response.ok) {
      console.error('Failed to fetch the image from the URI:', imageUri);
      throw new Error('Failed to fetch image');
    }

    const blob = await response.blob(); // Convert imageUri to Blob

    // Check the blob type
    console.log('Blob:', blob);

    // Create a File object using the Blob
    const file = new File([blob], 'uploaded-photo.jpg', { type: 'image/jpeg' });

    // Log the File object to confirm it's being created correctly
    console.log('Created File:', file);

    // Append the file to FormData with the field name 'file'
    formData.append('file', file);

    // Log FormData contents
    console.log('Sending FormData:', formData);

    // Send the FormData to the server using fetch
    const responseFromServer = await fetch(backendUrl, {
      method: 'POST',
      body: formData,
    });

    // Check the server's response
    if (!responseFromServer.ok) {
      const errorData = await responseFromServer.json();
      console.error('Server Error:', errorData);
      throw new Error(`Server error with status ${responseFromServer.status}: ${JSON.stringify(errorData)}`);
    }

    const data = await responseFromServer.json();
    console.log('Extracted text:', data.text);
    Alert.alert(data.text);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Upload failed:', error.message);
      Alert.alert('Upload error: ' + error.message);
    } else {
      console.error('Upload failed with unknown error:', error);
      Alert.alert('An unknown error occurred during upload.');
    }
  }
};



// Type guard function
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (error as ErrorWithMessage).message !== undefined;
}

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