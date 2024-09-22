/**
 * A list of products that can be filtered by category.
 */

import { BookOpen, Calendar, Package, ShoppingCart, Tag } from "@tamagui/lucide-icons";
import { ScrollView, Card, Paragraph, Button, Accordion, Anchor, YStack, XStack, Separator } from "tamagui";

export const ProductList = () => {
    return (
        <ScrollView pb="$9">
            {Array.from({ length: 10 }).map((_, i) => (
                <Card bg="$background" p="$4" m="$4" borderRadius="$4" shadowColor="$shadowColor" shadowOpacity={0.1} shadowRadius={10} elevation={2}>
                <YStack space="$3">
                    <XStack alignItems="center" space="$2">
                        <BookOpen size={18} color="#4a5568" />
                        <Paragraph fontSize="$6" fontWeight="bold" color="$colorFocus">
                            Innovation and Entrepreneurship
                        </Paragraph>
                    </XStack>
                    <Paragraph fontSize="$3" color="#4a5568">
                        Learn how to innovate and start your own business with practical insights and strategies. This comprehensive guide covers ideation, market research, funding, and scaling your startup.
                    </Paragraph>
                    <Separator />
                    <XStack space="$2" alignItems="center">
                        <Tag size={16} color="#4a5568" />
                        <Paragraph fontSize="$2" color="#4a5568">Category: Business & Economics</Paragraph>
                    </XStack>
                    <XStack space="$2" alignItems="center">
                        <Calendar size={16} color="#4a5568" />
                        <Paragraph fontSize="$2" color="#4a5568">Publication Date: September 15, 2024</Paragraph>
                    </XStack>
                    <XStack space="$2" alignItems="center">
                        <Package size={16} color="#4a5568" />
                        <Paragraph fontSize="$2" color="#4a5568">Quantity in Stock: 42</Paragraph>
                    </XStack>
                    <Separator />
                    <XStack justifyContent="space-between" alignItems="center">
                        <Paragraph fontSize="$5" fontWeight="bold" color="#2d3748">
                            ₵24.99
                        </Paragraph>
                        <Button size="$3" theme="active" icon={ShoppingCart}>
                            Sell
                        </Button>
                    </XStack>
                </YStack>
            </Card>
            ))}

            <Card bg="$colorTransparent" p="$4" m="$4" h={100}>
            </Card>
        </ScrollView>
    )
}