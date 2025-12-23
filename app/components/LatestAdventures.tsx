"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface Adventure {
  id: string;
  title: string;
  date: string;
  location: string;
  media: MediaItem[];
  catName: string;
  catId: string;
}

const adventures: Adventure[] = [
  {
    id: "1",
    title: "Conquering the Kitchen Counter",
    date: "Dec 20, 2025",
    location: "Kitchen",
    media: [
      { type: "video", url: "https://www.pexels.com/download/video/27895556/" },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=800&q=80"
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?w=800&q=80"
      }
    ],
    catName: "Whiskers",
    catId: "whiskers"
  },
  {
    id: "2",
    title: "The Great Box Expedition",
    date: "Dec 18, 2025",
    location: "Living Room",
    media: [
      {
        type: "video",
        url: "https://www.pexels.com/download/video/855282/"
      },
      {
        type: "video",
        url: "https://www.pexels.com/download/video/5495527/"
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80"
      }
    ],
    catName: "Luna",
    catId: "luna"
  },
  {
    id: "3",
    title: "Sunbeam Napping Championship",
    date: "Dec 15, 2025",
    location: "Window Sill",
    media: [
      {
        type: "video",
        url: "https://www.pexels.com/download/video/19607907/"
      },
      {
        type: "video",
        url: "https://www.pexels.com/download/video/28965622/"
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&q=80"
      }
    ],
    catName: "Shadow",
    catId: "shadow"
  }
];

function StoryCard({
  adventure,
  index
}: {
  adventure: Adventure;
  index: number;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const duration = 5000; // 5 seconds per slide

  useEffect(() => {
    if (isPaused) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / duration) * 100;

      if (newProgress >= 100) {
        // Move to next slide
        if (currentSlide < adventure.media.length - 1) {
          setCurrentSlide(currentSlide + 1);
          setProgress(0);
        } else {
          // Loop back to start
          setCurrentSlide(0);
          setProgress(0);
        }
      } else {
        setProgress(newProgress);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, adventure.media.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    setProgress(0);
  };

  const currentMedia = adventure.media[currentSlide];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/cats/${adventure.catId}`}>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
        >
          {/* Story Media with Progress Bars */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
            {/* Progress Indicators */}
            <div className="absolute top-2 left-2 right-2 z-20 flex gap-1">
              {adventure.media.map((_, idx) => (
                <button
                  key={idx}
                  onClick={e => {
                    e.preventDefault();
                    goToSlide(idx);
                  }}
                  className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width:
                        idx === currentSlide
                          ? `${progress}%`
                          : idx < currentSlide
                          ? "100%"
                          : "0%"
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </button>
              ))}
            </div>

            {/* Cat name badge */}
            <div className="absolute top-8 right-4 z-20 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {adventure.catName}
            </div>

            {/* Media Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {currentMedia.type === "image" ? (
                  <Image
                    src={currentMedia.url}
                    alt={adventure.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <video
                    src={currentMedia.url}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {adventure.title}
            </h3>

            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-pink-500" />
                <span className="text-sm">{adventure.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-purple-500" />
                <span className="text-sm">{adventure.location}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function LatestAdventures() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-purple-600 mb-4">
            Latest Adventures
          </h2>
          <p className="text-xl text-gray-700">
            Check out what our feline friends have been up to!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {adventures.map((adventure, index) => (
            <StoryCard key={adventure.id} adventure={adventure} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/cats">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              View All Adventures
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
