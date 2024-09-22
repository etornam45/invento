import { Badge } from "@tamagui/lucide-icons"
import { ScrollView, YStack } from "tamagui"
import { Card, Paragraph, XStack } from "tamagui"

export const CategoryList = () => {
    return (
        <ScrollView pb="$9">
            {Array.from({ length: 10 }).map((_, i) => (
                <Card bg="$background" p="$4" m="$4" borderRadius="$4" shadowColor="$shadowColor" shadowOpacity={0.1} shadowRadius={10} elevation={2}>
                    <YStack space="$3">
                        <XStack alignItems="center" space="$2">
                            <Paragraph fontSize="$6" fontWeight="bold" color="$colorFocus">
                                Business & Economics
                            </Paragraph>
                        </XStack>
                        <Paragraph fontSize="$3" color="#4a5568">
                            Learn how to innovate and start your own business with practical insights and strategies. This comprehensive guide covers ideation
                        </Paragraph>
                        <XStack space="$2" alignItems="center">
                            <Badge size={20} />
                            <Paragraph fontSize="$4" color="#4a5568">Products Quantity: 10</Paragraph>
                        </XStack>
                    </YStack>
                </Card>
            ))}

            <Card bg="$colorTransparent" p="$4" m="$4" h={100}>
            </Card>
        </ScrollView>
    )
}