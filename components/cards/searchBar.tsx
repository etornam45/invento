import { Input, View, XStack } from "tamagui";

export default function SearchBar() {
    return (
        <XStack p='$2' backgroundColor='$background'>
            <Input
            flex={1} size='$4' placeholder={`Search ...`} />
        </XStack>
    )
}