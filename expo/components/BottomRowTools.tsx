import { StyleSheet, TouchableOpacity, View } from "react-native";
import IconButton from "./IconButtons";
import { ThemedText } from "./ThemedText";
import { CameraMode } from "expo-camera";

export default function BottomRowTools(){
    return(
        <View>
            <IconButton
                iosName="photo.stack"
                onPress = {() => {}}
            />
            <View>
            <TouchableOpacity onPress={() => {}}> 
                <ThemedText>Picture</ThemedText>
            </TouchableOpacity> 
            </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    directionRowItemsCenter: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    bottomContainer:{
        width: "100%",
        justifyContent: "center", 
        position: "absolute",  
        alignSelf: "center",
        bottom: 6,            
    },

});