// data/reels.ts
export type ReelType = "image" | "video" | "gradient";

export interface ReelItem {
  id: number;
  type: ReelType;
  url?: string;        // image or video url
  colors?: string[];   // for gradient cards
  title?: string;
  subtitle?: string;
  audio: string;       // audio url for each reel
}

export const reels: ReelItem[] = [
  {
    id: 1,
    type: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "City Vibes",
    subtitle: "Sample HD video + music",
  },
  {
    id: 2,
    type: "image",
    url: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=1080",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    title: "Mountain View",
    subtitle: "Chill ambient track",
  },
  {
    id: 3,
    type: "gradient",
    colors: ["#ff7e5f", "#feb47b"],
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    title: "Sunset Mood",
    subtitle: "Gradient background + warm track",
  },
  {
    id: 4,
    type: "image",
    url: "https://images.pexels.com/photos/210307/pexels-photo-210307.jpeg?auto=compress&cs=tinysrgb&w=1080",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    title: "Ocean Breeze",
    subtitle: "Relaxing vibes",
  },
  {
    id: 5,
    type: "video",
    url: "https://www.w3schools.com/html/movie.mp4",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    title: "Street Life",
    subtitle: "Energetic beat",
  },
  {
    id: 6,
    type: "gradient",
    colors: ["#00c6ff", "#0072ff"],
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    title: "Deep Focus",
    subtitle: "Lo-fi background gradient",
  },
];
