"use client";

import { motion } from "framer-motion";
import { Heart, Home, Sparkles } from "lucide-react";
import Image from "next/image";

export default function AboutStory() {
  return (
    <section id="about-section" className="py-20 px-6 bg-[#F5F1EA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-block mb-4"
          >
            <Heart className="text-[#D4766A]" size={48} fill="currentColor" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#D4766A] mb-4">
            Our Story
          </h2>
          <p className="text-xl text-gray-700">
            How three adorable souls became one purr-fect family
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#F5F1EA] p-3 rounded-full mt-1">
                <Home className="text-[#D4766A]" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  It All Started at Home
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our journey began when Whiskers, a curious tabby with an
                  appetite for adventure, found his way into our hearts and
                  home. His playful antics and endless energy brought so much
                  joy that we knew he needed friends to share in the fun.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#F5F1EA] p-3 rounded-full mt-1">
                <Sparkles className="text-[#8B6F47]" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Enter Luna & Shadow
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Luna arrived next, a graceful Siamese with the most beautiful
                  blue eyes and a gentle personality. Then came Shadow, the
                  mysterious black cat who loves to appear out of nowhere.
                  Together, they transformed our house into a home filled with
                  purrs, playfulness, and unconditional love.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#F5F1EA] p-3 rounded-full mt-1 border-2 border-[#D4766A]/30">
                <Heart
                  className="text-[#D4766A]"
                  size={24}
                  fill="currentColor"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  A Family Forever
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Despite their different personalities, these three have formed
                  an unbreakable bond. Whether they&apos;re chasing each other
                  around the house, cuddling up together for afternoon naps, or
                  getting into mischief, they remind us every day why cats are
                  the most wonderful companions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80"
                  alt="Our cats together"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg mt-8"
              >
                <Image
                  src="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800&q=80"
                  alt="Cat playing"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg -mt-8"
              >
                <Image
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80"
                  alt="Sleeping cat"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&q=80"
                  alt="Curious cat"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-center text-[#D4766A] mb-8">
            Fun Family Facts
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#8B6F47] mb-2">3</div>
              <p className="text-gray-600">Years Together</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#D4766A] mb-2">
                1000+
              </div>
              <p className="text-gray-600">Naps Taken</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#D4766A] mb-2">∞</div>
              <p className="text-gray-600">Love Shared</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
