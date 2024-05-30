import {FC} from "react";
import {TextProps, Text} from "react-native";

export const Title:FC<TextProps> = ({children}) => {
    return <Text className={'text-sm text-white font-medium'}>{children}</Text>
}
