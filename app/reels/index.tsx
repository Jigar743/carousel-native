// app/reels/index.tsx
import React from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Reels from "../../components/Reels";
import { reels } from "../../data/reels";

export default function ReelsPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // unmounts Reels -> audio stops via cleanup
  };

  return (
    <SafeAreaView style={styles.container}>
      <Reels reels={reels} />
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backText: {
    color: "#fff",
    fontSize: 14,
  },
});
