import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, Text, Button, XStack, YStack, View, Anchor } from 'tamagui';
import { ArrowRight } from '@tamagui/lucide-icons';

// Define the structure for each slide
interface Slide {
  title: string;
  description: string;
  image: any;
}

// Sample data for the slides
const slides: Slide[] = [
  {
    title: 'Manage your sales the easily way',
    description: 'Easily understand your sale and revenue in a visual way',
    image: require('../assets/images/Ice cream seller.gif'),
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

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();


  const handleNext = () => {
    // complete 
    if (currentIndex === slides.length - 1) {
      console.log('Completed');
      // onboardingComplete$.setValue(true);

      router.navigate('/Register');
      return;
    }

    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  const handleSkip = () => {
    // Implement skip functionality
    router.navigate('/Login');
    console.log('Skipped');
  };

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
    }} >
      <LinearGradient
        colors={['#00d4ff', '#0f5d9d', '#00ff87']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      ></LinearGradient>
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        p='$3.5'
      // px='$'
      >
        <XStack padding="$4" px='$0' jc='space-between' ai='center' w='100%'>
          <View w='$1' h='$1' backgroundColor="" borderRadius={50} />
          <Button fontSize="$4" textAlign="center"
            onPress={handleSkip}
            variant="outlined"
            borderColor='$colorTransparent'
          >
            skip
          </Button>
        </XStack>
        <View flex={1}
          ai='center'
          // bg='$blue10'
          pos='relative'
          jc='center'
          gap='$4'
        >
          {currentIndex < slides.length && (<YStack
            key={currentIndex}
            animation="bouncy"
            alignItems="center"
            justifyContent="center"
          // padding="$4"
          >
            <Image source={slides[currentIndex].image} style={{ width: 316, height: 316 }} />
            <View w='100%' p='$2.5'>
              <Text fontSize="$9" fontWeight="bold" marginTop="$4">
                {slides[currentIndex].title}
              </Text>
              <Text fontSize="$6" marginTop="$2">
                {slides[currentIndex].description}
              </Text>
            </View>
          </YStack>)}
        </View>


        <XStack width="100%" justifyContent="space-between" padding="$2">
          <Button br={25} onPress={handlePrevious}
            opacity={currentIndex === 0 ? 0 : 1}
            variant="outlined"
            borderColor='$white1'
          >
            Previous
          </Button>
          <Button br={25} bg='$blue10' onPress={handleNext}>
            {/* {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'} */}
            <ArrowRight />
          </Button>
        </XStack>
        <XStack space justifyContent="center" alignItems="center" padding="$0">
          {slides.map((_, index) => (
            <Stack
              key={index}
              width={index === currentIndex ? 50 : 10}
              height={10}
              borderRadius="$full"
              backgroundColor={index === currentIndex ? '$blue10' : '$white1'}
              br={5}
            />
          ))}
        </XStack>
      </YStack>

    </View>
  );
};