import { useState } from 'react';
import { Card, Input, Label, XStack, YStack, RadioGroup, Button, ScrollView } from 'tamagui';

const SaleRecordCard = () => {
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  return (
    <ScrollView p="$4">
      <YStack space="$4">
        <Input placeholder="Product Name" />
        
        <XStack space="$4">
          <Input 
            placeholder="Quantity" 
            inputMode="numeric" 
            flex={1}
          />
          <Input 
            placeholder="Price" 
            inputMode="decimal" 
            flex={1}
          />
        </XStack>
        
        <YStack>
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <RadioGroup 
            id="paymentMethod"
            value={paymentMethod} 
            onValueChange={setPaymentMethod}
          >
            <XStack space="$4" alignItems='center'>
              <RadioGroup.Item value="Cash" id="cash">
                <RadioGroup.Indicator />
              </RadioGroup.Item>
              <Label htmlFor="cash">Cash</Label>
              
              <RadioGroup.Item value="MOMO" id="momo">
                <RadioGroup.Indicator />
              </RadioGroup.Item>
              <Label htmlFor="momo">MOMO</Label>
            </XStack>
          </RadioGroup>
        </YStack>
        
        <Input 
          placeholder="Discount" 
          inputMode="decimal"
        />
        
        <Button theme="active">
          Save Sale Record
        </Button>
      </YStack>
    </ScrollView>
  );
};

export default SaleRecordCard;