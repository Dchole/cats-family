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
  gender: "male" | "female";
  motherId?: string;
  fatherId?: string;
  availableForAdoption?: boolean;
}

export const cats: Cat[] = [
  // Original family - Whiskers is the mother
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
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=800&fit=crop",
    funFact: "Once caught a fly mid-air!",
    gender: "female",
    availableForAdoption: false
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
    image:
      "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800&h=800&fit=crop",
    funFact: "Knows exactly when dinner time is, down to the minute",
    gender: "female",
    availableForAdoption: false
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
    image:
      "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800&h=800&fit=crop",
    funFact: "Can squeeze into impossibly small spaces",
    gender: "male",
    availableForAdoption: false
  },
  // Whiskers' kittens
  {
    id: "mittens",
    name: "Mittens",
    age: 1,
    breed: "Tabby Mix",
    color: "Orange & White",
    personality: ["Energetic", "Friendly", "Clumsy"],
    favoriteThings: ["Wrestling with siblings", "Feather toys", "Milk"],
    quirk: "Always trips over their own paws",
    image:
      "https://images.unsplash.com/photo-1615789591457-74a63395c990?w=800&h=800&fit=crop",
    funFact: "Learned to open cabinet doors at 3 months old",
    gender: "male",
    motherId: "whiskers",
    availableForAdoption: true
  },
  {
    id: "patches",
    name: "Patches",
    age: 1,
    breed: "Calico",
    color: "Orange, Black & White",
    personality: ["Sassy", "Independent", "Loving"],
    favoriteThings: ["High perches", "Grooming", "Solo playtime"],
    quirk: "Refuses to share food bowls",
    image:
      "https://images.unsplash.com/photo-1592194996308-f265ec2b0e91?w=800&h=800&fit=crop",
    funFact: "Has a perfectly symmetrical patch on her nose",
    gender: "female",
    motherId: "whiskers",
    availableForAdoption: true
  },
  {
    id: "ginger",
    name: "Ginger",
    age: 1,
    breed: "Tabby",
    color: "Orange",
    personality: ["Bold", "Curious", "Talkative"],
    favoriteThings: ["Exploring", "Climbing", "Belly rubs"],
    quirk: "Chirps at birds through the window",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&h=800&fit=crop",
    funFact: "Can jump 5 feet high from standing",
    gender: "female",
    motherId: "whiskers",
    availableForAdoption: true
  },
  {
    id: "boots",
    name: "Boots",
    age: 1,
    breed: "Tuxedo",
    color: "Black & White",
    personality: ["Gentle", "Sleepy", "Cuddly"],
    favoriteThings: ["Soft blankets", "Being carried", "Slow pets"],
    quirk: "Falls asleep in weird positions",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&h=800&fit=crop",
    funFact: "Purrs so loud you can hear it across the room",
    gender: "male",
    motherId: "whiskers",
    availableForAdoption: true
  },
  {
    id: "mochi",
    name: "Mochi",
    age: 0.5,
    breed: "Tabby Mix",
    color: "Gray & White",
    personality: ["Tiny", "Brave", "Playful"],
    favoriteThings: ["Milk", "Tiny toys", "Warm laps"],
    quirk: "Smallest but always starts playfights",
    image:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&h=800&fit=crop",
    funFact: "Named after mochi because of her squishy cheeks",
    gender: "female",
    motherId: "whiskers",
    availableForAdoption: true
  },
  // Mittens' kittens (grandchildren of Whiskers)
  {
    id: "pip",
    name: "Pip",
    age: 0.3,
    breed: "Tabby Mix",
    color: "Orange",
    personality: ["Tiny", "Wobbly", "Sweet"],
    favoriteThings: ["Mother's milk", "Sleeping", "Tiny meows"],
    quirk: "Has the tiniest meow ever",
    image:
      "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800&h=800&fit=crop",
    funFact: "Just opened their eyes last week",
    gender: "female",
    motherId: "mittens",
    availableForAdoption: false
  },
  {
    id: "squeaks",
    name: "Squeaks",
    age: 0.3,
    breed: "Tabby Mix",
    color: "Brown Tabby",
    personality: ["Curious", "Wobbly", "Adventurous"],
    favoriteThings: ["Exploring", "Pouncing practice", "Siblings"],
    quirk: "Always wandering away from the nest",
    image:
      "https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?w=800&h=800&fit=crop",
    funFact: "Loves to climb onto everything already",
    gender: "male",
    motherId: "mittens",
    availableForAdoption: false
  },
  // Luna's family (separate tree)
  {
    id: "cleo",
    name: "Cleo",
    age: 2,
    breed: "Siamese Mix",
    color: "Cream & Gray",
    personality: ["Regal", "Intelligent", "Picky"],
    favoriteThings: ["Expensive toys", "Clean litter", "Routine"],
    quirk: "Refuses to eat if the bowl isn't perfectly clean",
    image:
      "https://images.unsplash.com/photo-1573865526739-10c1d3a1f0af?w=800&h=800&fit=crop",
    funFact: "Can recognize her name in multiple languages",
    gender: "female",
    motherId: "luna",
    availableForAdoption: false
  },
  {
    id: "mocha",
    name: "Mocha",
    age: 2,
    breed: "Siamese Mix",
    color: "Brown & Cream",
    personality: ["Chill", "Friendly", "Lazy"],
    favoriteThings: ["Sunbathing", "Treats", "Slow walks"],
    quirk: "Stretches for a full minute after every nap",
    image:
      "https://images.unsplash.com/photo-1573865526739-10c1d3a1f0af?w=800&h=800&fit=crop",
    funFact: "Takes 8+ naps a day",
    gender: "male",
    motherId: "luna",
    availableForAdoption: false
  },
  // Cleo's kittens (Luna's grandchildren)
  {
    id: "pearl",
    name: "Pearl",
    age: 0.5,
    breed: "Siamese Mix",
    color: "White & Cream",
    personality: ["Elegant", "Shy", "Gentle"],
    favoriteThings: ["Quiet corners", "Soft voices", "Gentle touches"],
    quirk: "Hides when strangers visit",
    image:
      "https://images.unsplash.com/photo-1583795128727-6ec3642408f8?w=800&h=800&fit=crop",
    funFact: "Has the fluffiest tail in the family",
    gender: "female",
    motherId: "cleo",
    availableForAdoption: true
  },
  {
    id: "sage",
    name: "Sage",
    age: 0.5,
    breed: "Siamese Mix",
    color: "Gray & White",
    personality: ["Calm", "Observant", "Wise"],
    favoriteThings: ["Watching birds", "High places", "Meditation"],
    quirk: "Sits perfectly still for hours watching outside",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800&h=800&fit=crop",
    funFact: "Seems to understand human emotions",
    gender: "male",
    motherId: "cleo",
    availableForAdoption: true
  }
];
