// components/Reels.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  FlatList,
  Dimensions,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Video, Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import type { ReelItem } from "../data/reels";

const { width, height } = Dimensions.get("window");

interface Props {
  reels: ReelItem[];
}

export default function Reels({ reels }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Configure audio mode once
  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
    }).catch(console.warn);
  }, []);

  const stopAudio = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    } catch (err) {
      console.warn("stopAudio error:", err);
    }
  };

  const playAudioForIndex = async (index: number) => {
    const item = reels[index];
    if (!item || !item.audio) return;

    try {
      await stopAudio();

      const { sound } = await Audio.Sound.createAsync(
        { uri: item.audio },
        { shouldPlay: true, isLooping: true }
      );

      soundRef.current = sound;
    } catch (err) {
      console.warn("playAudio error:", err);
    }
  };

  // When active reel changes -> play that reel's audio
  useEffect(() => {
    playAudioForIndex(activeIndex);
  }, [activeIndex]);

  // Stop audio when component unmounts (leaving reels page)
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / height);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const renderItem = ({ item, index }: { item: ReelItem; index: number }) => {
    const isActive = index === activeIndex;

    let media: React.ReactNode = null;

    if (item.type === "video" && item.url) {
      media = (
        <Video
          source={{ uri: item.url }}
          style={styles.media}
          resizeMode="cover"
          shouldPlay={isActive}      // only active video plays
          isLooping
          isMuted={false}
        />
      );
    } else if (item.type === "image" && item.url) {
      media = (
        <Image
          source={{ uri: item.url }}
          style={styles.media}
          resizeMode="cover"
        />
      );
    } else if (item.type === "gradient" && item.colors) {
      media = (
        <LinearGradient colors={item.colors} style={styles.media} />
      );
    }

    return (
      <View style={styles.reelContainer}>
        {media}
        <View style={styles.overlay}>
          {item.title && <Text style={styles.title}>{item.title}</Text>}
          {item.subtitle && (
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          )}
          <Text style={styles.musicLabel}>♫ Reel music assigned</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={reels}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      snapToAlignment="start"
      snapToInterval={height}
      onMomentumScrollEnd={handleMomentumEnd}
      getItemLayout={(_, index) => ({
        length: height,
        offset: height * index,
        index,
      })}
      removeClippedSubviews
      windowSize={3}
      initialNumToRender={2}
    />
  );
}

const styles = StyleSheet.create({
  reelContainer: {
    width,
    height,
    backgroundColor: "black",
  },
  media: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    left: 16,
    bottom: 48,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    color: "#f5f5f5",
    fontSize: 14,
    marginTop: 4,
  },
  musicLabel: {
    color: "#ddd",
    fontSize: 12,
    marginTop: 8,
    opacity: 0.8,
  },
});
