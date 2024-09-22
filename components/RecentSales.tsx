import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, XStack, Text, Anchor, Card, Separator } from 'tamagui';

const recentSales = [
    { id: 1, product: 'The Great Gatsby', originalPrice: 19.99, salePrice: 14.99, date: '2024-09-20' },
    { id: 2, product: '1984', originalPrice: 15.99, salePrice: 12.99, date: '2024-09-19' },
    { id: 3, product: 'To Kill a Mockingbird', originalPrice: 18.99, salePrice: 13.99, date: '2024-09-18' },
    { id: 4, product: 'Pride and Prejudice', originalPrice: 14.99, salePrice: 11.99, date: '2024-09-17' },
    { id: 5, product: 'Moby-Dick', originalPrice: 22.99, salePrice: 17.99, date: '2024-09-16' },
];

const calculateDiscount = (original, sale) => {
    return ((original - sale) / original * 100).toFixed(0);
};

const RecentSales = () => {
    return (
        <Card elevate width="100%" space="$4" padding="$2">
            <XStack justifyContent="space-between" px="$2" pt="$3">
                <Text fontSize="$6" fontWeight="bold">Recent Sales</Text>
                <Anchor href="/all-sales" textDecorationLine="none">
                    <Text color="$blue10" fontWeight="bold">See More</Text>
                </Anchor>
            </XStack>
            <Separator />
            <YStack>
                {recentSales.map((sale) => (
                    <Card key={sale.id} padding="$3" b="$1" space="$2">
                        <Text fontSize="$5" fontWeight="bold">{sale.product}</Text>
                        <Separator marginVertical="$2" />
                        <XStack justifyContent="space-between">
                            <Text>Original Price:</Text>
                            <Text>${sale.originalPrice.toFixed(2)}</Text>
                        </XStack>
                        <XStack justifyContent="space-between">
                            <Text>Sale Price:</Text>
                            <Text color="$green10" fontWeight="bold">${sale.salePrice.toFixed(2)}</Text>
                        </XStack>
                        <XStack justifyContent="space-between">
                            <Text>Discount:</Text>
                            <Text color="$red10">{calculateDiscount(sale.originalPrice, sale.salePrice)}% OFF</Text>
                        </XStack>
                        <Text fontSize="$2" color="$gray10" marginTop="$2">{sale.date}</Text>
                    </Card>
                ))}
            </YStack>
        </Card>
    );
};

export default RecentSales;