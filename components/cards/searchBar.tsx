import { Input, View, XStack } from "tamagui";

interface SearchBarProps {
    value?: string
    placeholder: string
    onSearch?: (text: string) => void
}

export default function SearchBar({ placeholder, onSearch, value }: SearchBarProps) {
    return (
        <XStack p='$3'>
            <Input
            flex={1} size='$4' br={43} value={value} placeholder={placeholder} onChangeText={onSearch} />
        </XStack>
    )
}