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
    image: "/cats/whiskers.jpg",
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
    image: "/cats/luna.jpg",
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
    image: "/cats/shadow.jpg",
    funFact: "Can squeeze into impossibly small spaces"
  }
];
