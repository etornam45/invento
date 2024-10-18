import React, { useState } from 'react';
import { Image } from 'react-native';
import { Stack, Text, Button, XStack, YStack } from 'tamagui';

// Define the structure for each slide
interface Slide {
  title: string;
  description: string;
  image: any; // You would replace 'any' with the actual image import type
}

// Sample data for the slides
const slides: Slide[] = [
  {
    title: 'Manage your sales the easily way',
    description: 'Easily understand your sale and revenue in a visual way',
    image: require('../assets/images/Ice cream seller-amico.png'),
  },
  {
    title: 'Keep track of inventory',
    description: 'Never run out of stock with our intelligent inventory management',
    image: require('../assets/images/Barcode-amico.png'),
  },
  {
    title: 'Manage your finance',
    description: 'Record your sales, expenses and revenue the easy way',
    image: require('../assets/images/Coins-pana.png'),
  },
];

export default function OnboardingScreen () {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    // Implement skip functionality
    console.log('Skipped');
  };

  return (
    <YStack flex={1} backgroundColor="$background" alignItems="center" justifyContent="center">
      <XStack flex={1} alignItems="center" justifyContent="center" space>
        {slides.map((slide, index) => (
          <YStack
            key={index}
            opacity={index === currentIndex ? 1 : 0}
            scale={index === currentIndex ? 1 : 0.9}
            animation="lazy"
            alignItems="center"
            padding="$4"
          >
            <Image source={slide.image} style={{ width: 200, height: 200 }} />
            <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$4">
              {slide.title}
            </Text>
            <Text fontSize="$4" textAlign="center" marginTop="$2">
              {slide.description}
            </Text>
          </YStack>
        ))}
      </XStack>

      <XStack space justifyContent="center" alignItems="center" padding="$4">
        {slides.map((_, index) => (
          <Stack
            key={index}
            width={10}
            height={10}
            borderRadius="$full"
            backgroundColor={index === currentIndex ? '$blue10' : '$gray5'}
          />
        ))}
      </XStack>

      <XStack width="100%" justifyContent="space-between" padding="$4">
        <Button onPress={handleSkip} variant="outlined">
          Skip
        </Button>
        <Button onPress={handleNext} disabled={currentIndex === slides.length - 1}>
          Next
        </Button>
      </XStack>
    </YStack>
  );
};