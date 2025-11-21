// app/index.tsx
import { View, Button } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button title="Open Reels" onPress={() => router.push("/reels")} />
    </View>
  );
}
