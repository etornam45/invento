import { Input, View, XStack } from "tamagui";

export default function SearchBar({ placeholder }: { placeholder: string }) {
    return (
        <XStack p='$3'>
            <Input
            flex={1} size='$4' placeholder={placeholder} />
        </XStack>
    )
}