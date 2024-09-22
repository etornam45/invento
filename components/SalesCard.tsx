import { Card, H2, Paragraph, XStack, YStack, Separator, H4, Stack } from 'tamagui';
import { DollarSign, Package, Percent, CreditCard } from '@tamagui/lucide-icons';

type PaymentMethod = 'MOMO' | 'Cash';

interface SaleRecordProps {
    productName: string;
    quantity: number;
    price: number;
    paymentMethod: PaymentMethod;
    discount: number;
}

export default function SaleRecordCard({ productName, quantity, price, paymentMethod, discount }: SaleRecordProps) {
    const totalPrice = price * quantity * (1 - discount / 100);

    return (
        <Card elevate size="$4" mb="$4" bordered height="auto" scale={0.9} hoverStyle={{ scale: 0.925 }}>
            <Card.Header padded>
                <H4>{productName}</H4>
            </Card.Header>
            <Separator />
            <XStack space="$2" padding="$4" gap='$4' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
                <YStack gap='$2'>
                    <XStack space="$2" alignItems="center">
                        <Package size={16} />
                        <Paragraph>Quantity: {quantity}</Paragraph>
                    </XStack>
                    <XStack space="$2" alignItems="center">
                        <DollarSign size={16} />
                        <Paragraph>Price: ₵{price.toFixed(2)}</Paragraph>
                    </XStack>
                </YStack>
                <YStack gap='$2'>
                    <XStack space="$2" alignItems="center">
                        <CreditCard size={16} />
                        <Paragraph>Payment: {paymentMethod}</Paragraph>
                    </XStack>
                    <XStack space="$2" alignItems="center">
                        <Percent size={16} />
                        <Paragraph>Discount: {discount}%</Paragraph>
                    </XStack>
                </YStack>
            </XStack>
            <Separator />
            <Card.Footer padded>
                <Paragraph fontWeight="bold">Total: ${totalPrice.toFixed(2)}</Paragraph>
            </Card.Footer>
        </Card>
    );
}