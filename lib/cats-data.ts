export interface Cat {
  id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
  personality: string[];
  favoriteThings: string[];
  quirk: string;
  image: string;
  funFact: string;
}

export const cats: Cat[] = [
  {
    id: "whiskers",
    name: "Whiskers",
    age: 3,
    breed: "Tabby",
    color: "Orange & White",
    personality: ["Playful", "Adventurous", "Curious"],
    favoriteThings: [
      "Chasing laser pointers",
      "Cardboard boxes",
      "Napping in sunbeams"
    ],
    quirk: "Does a little hop before pouncing",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=800&fit=crop",
    funFact: "Once caught a fly mid-air!"
  },
  {
    id: "luna",
    name: "Luna",
    age: 5,
    breed: "Siamese",
    color: "Cream & Brown",
    personality: ["Vocal", "Affectionate", "Demanding"],
    favoriteThings: [
      "Being the center of attention",
      "Tuna treats",
      "Warm laps"
    ],
    quirk: "Meows in response to conversations",
    image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800&h=800&fit=crop",
    funFact: "Knows exactly when dinner time is, down to the minute"
  },
  {
    id: "shadow",
    name: "Shadow",
    age: 2,
    breed: "Black Cat",
    color: "Pure Black",
    personality: ["Mysterious", "Stealthy", "Sweet"],
    favoriteThings: [
      "Hiding in shadows",
      "Surprise attacks",
      "Nighttime zoomies"
    ],
    quirk: "Appears out of nowhere when you open a can",
    image: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800&h=800&fit=crop",
    funFact: "Can squeeze into impossibly small spaces"
  }
];
