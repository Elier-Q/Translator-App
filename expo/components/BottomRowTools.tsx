import { StyleSheet, TouchableOpacity, View} from "react-native";
import IconButton from "./IconButtons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { CameraMode } from "expo-camera";

export default function BottomRowTools(){
    return(
        <View style={[styles.bottomContainer,styles.directionRowItemsCenter]}>
            <IconButton
                iosName="photo.stack"
                onPress = {() => {}}
            />
            <ThemedView>
            <TouchableOpacity onPress={() => {
                console.log("Happy bIRTHDAY")
            }}> 
                <ThemedText>Picture</ThemedText>
            </TouchableOpacity>
            </ThemedView>
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
        top: 200,
    },

});