import { StyleSheet, View } from "react-native";
import IconButton from "./IconButtons";

export default function BottomRowTools(){
    return(
        <View style = {[styles.bottomContainer, styles.directionRowItemsCenter]}>
            <IconButton
                    iosName="photo.stack"
                    onPress = {() => {}}
                       />
        </View>
    )
}
const styles = StyleSheet.create({
    directionRowItemsCenter:{
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    bottomContainer:{
        width: "100%",
        justifyContent: "space-between",
        position: "absolute",
        alignSelf: "center",
        bottom: 6,
    },

});