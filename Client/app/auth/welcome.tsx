/* eslint-disable import/no-unresolved */
import { router, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import { useRef, useState } from 'react';
import { onboardingData } from '@/lib/constants';
import { AnimatePresence } from 'moti';
import { Button } from '@/components/ui/button';

export default function Welcome() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastIndex = activeIndex === onboardingData.length - 1;

  function buttonOnClick() {
    if (isLastIndex) {
      router.push('/auth/login');
    } else setActiveIndex(activeIndex + 1);
  }

  return (
    <SafeAreaView className="flex-1 p-2" style={{ gap: 20 }}>
      <Image
        source={{ uri: onboardingData[activeIndex].image }}
        className="h-[310px] w-full rounded-3xl"
        resizeMode="cover"
      />
      <Text className="text-h4 text-center font-bold text-foreground">
        {onboardingData[activeIndex].title}
      </Text>
      <Text className="text-T2 text-center font-medium text-muted-foreground">
        {onboardingData[activeIndex].description}
      </Text>
      <View className="flex-row justify-center">
        {onboardingData.map((item, index) => (
          <>
            {index === activeIndex ? (
              <View className="mx-1 h-[4px] w-[34px] overflow-hidden rounded-full bg-[#0131A1]" />
            ) : (
              <Pressable className="mx-1 h-[4px] w-[34px] rounded-full bg-muted-foreground" />
            )}
          </>
        ))}
      </View>

      <Button onPress={() => buttonOnClick()} className="mt-[50%]">
        <Text>{isLastIndex ? 'Continue' : 'Next'}</Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerGradient: {
    padding: 2,
    borderRadius: 12,
  },
  innerBlur: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Add subtle tint over blur
    overflow: 'hidden', // Important for rounded corners with blur
  },
});
