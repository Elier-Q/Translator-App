import { SFSymbol,SymbolView } from "expo-symbols";
import { StyleProp, TouchableOpacity, ViewStyle} from "react-native";
import 'expo-dev-client';

const ICONSIZE = 25;
const CONTAINER_WIDTH = 34;
const CONTAINER_PADDING = 3;

interface IconButtonPrompt{
    iosName: SFSymbol;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
    width?: number
    height?: number

}
export default function IconButton({iosName, containerStyle,onPress,width,height}: IconButtonPrompt){
    return(
        <TouchableOpacity
            onPress={onPress}
            style={[{backgroundColor: "#00000050", padding: CONTAINER_PADDING,
                 borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING*2)/2,
                 width: CONTAINER_WIDTH
                },
                 containerStyle]}
        >
            <SymbolView
                name = {iosName}
                size = {ICONSIZE}
                style={width && height ? {width, height}:{}}
                tintColor={"white"}
            />
            </TouchableOpacity>
    )
}