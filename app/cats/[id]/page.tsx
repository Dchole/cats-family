"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Calendar,
  Palette,
  Sparkles,
  Home
} from "lucide-react";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import { cats } from "@/lib/cats-data";
import { notFound } from "next/navigation";

export default function CatDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const cat = cats.find(c => c.id === id);

  if (!cat) {
    notFound();
  }

  // Find family members
  const mother = cat.motherId ? cats.find(c => c.id === cat.motherId) : null;
  const father = cat.fatherId ? cats.find(c => c.id === cat.fatherId) : null;
  const siblings = cats.filter(
    c =>
      c.id !== cat.id &&
      ((cat.motherId && c.motherId === cat.motherId) ||
        (cat.fatherId && c.fatherId === cat.fatherId))
  );
  const children = cats.filter(
    c => c.motherId === cat.id || c.fatherId === cat.id
  );

  return (
    <div className="min-h-screen bg-[#F5F1EA]">
      <Navigation />

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/cats">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 text-[#D4766A] hover:text-[#C86A5D] font-semibold mb-8"
            >
              <ArrowLeft size={20} />
              Back to Family Tree
            </motion.button>
          </Link>

          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative h-96 md:h-125 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {cat.availableForAdoption && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                  className="absolute -top-4 -right-4 bg-[#D4766A] text-white px-6 py-3 rounded-full font-bold shadow-xl"
                >
                  Available for Adoption! 💕
                </motion.div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-[#D4766A] mb-4">
                {cat.name}
              </h1>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-lg">
                  <Calendar className="text-[#D4766A]" size={24} />
                  <span className="text-gray-700">
                    <span className="font-semibold">Age:</span>{" "}
                    {cat.age < 1
                      ? `${Math.round(cat.age * 12)} months old`
                      : `${cat.age} year${cat.age !== 1 ? "s" : ""} old`}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-lg">
                  <Home className="text-[#D4766A]" size={24} />
                  <span className="text-gray-700">
                    <span className="font-semibold">Breed:</span> {cat.breed}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-lg">
                  <Palette className="text-[#8B6F47]" size={24} />
                  <span className="text-gray-700">
                    <span className="font-semibold">Color:</span> {cat.color}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-lg">
                  <span className="text-2xl">
                    {cat.gender === "male" ? "♂" : "♀"}
                  </span>
                  <span className="text-gray-700">
                    <span className="font-semibold">Gender:</span>{" "}
                    <span
                      className={
                        cat.gender === "male"
                          ? "text-blue-500"
                          : "text-[#D4766A]"
                      }
                    >
                      {cat.gender === "male" ? "Male" : "Female"}
                    </span>
                  </span>
                </div>
              </div>

              {/* Personality Tags */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="text-[#8B6F47]" size={20} />
                  Personality
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.personality.map((trait, idx) => (
                    <motion.span
                      key={trait}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      className="bg-[#D4766A] text-white px-4 py-2 rounded-full font-semibold text-sm"
                    >
                      {trait}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Fun Fact */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="text-4xl">✨</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Fun Fact</h3>
                    <p className="text-gray-600 italic">
                      &quot;{cat.funFact}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quirk Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 mb-12 shadow-lg border-2 border-[#D4766A]/30"
          >
            <h2 className="text-2xl font-bold text-[#D4766A] mb-4">
              Signature Quirk 😸
            </h2>
            <p className="text-lg text-gray-700 italic">{cat.quirk}</p>
          </motion.div>

          {/* Favorite Things */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-[#D4766A] mb-6 flex items-center gap-2">
              <Heart className="text-[#D4766A]" fill="currentColor" />
              Favorite Things
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {cat.favoriteThings.map((thing, idx) => (
                <motion.div
                  key={thing}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-3xl mb-2">
                    {idx === 0 ? "🎯" : idx === 1 ? "🎁" : "💫"}
                  </div>
                  <p className="text-gray-700 font-medium">{thing}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Family Section */}
          {(mother || father || siblings.length > 0 || children.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-[#D4766A] mb-6">
                Family Members
              </h2>

              {/* Parents */}
              {(mother || father) && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Parents
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {mother && (
                      <Link href={`/cats/${mother.id}`}>
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md md:shadow-lg hover:shadow-xl transition-all flex items-center gap-3 md:gap-4"
                        >
                          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden">
                            <Image
                              src={mother.image}
                              alt={mother.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Mother</p>
                            <p className="font-bold text-gray-800 text-lg">
                              {mother.name}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    )}
                    {father && (
                      <Link href={`/cats/${father.id}`}>
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md md:shadow-lg hover:shadow-xl transition-all flex items-center gap-3 md:gap-4"
                        >
                          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden">
                            <Image
                              src={father.image}
                              alt={father.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Father</p>
                            <p className="font-bold text-gray-800 text-lg">
                              {father.name}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Siblings */}
              {siblings.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Siblings ({siblings.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {siblings.map(sibling => (
                      <Link key={sibling.id} href={`/cats/${sibling.id}`}>
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl transition-all"
                        >
                          <div className="relative h-24 md:h-32">
                            <Image
                              src={sibling.image}
                              alt={sibling.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-2 md:p-3">
                            <p className="font-bold text-gray-800">
                              {sibling.name}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Children */}
              {children.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Children ({children.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {children.map(child => (
                      <Link key={child.id} href={`/cats/${child.id}`}>
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl transition-all"
                        >
                          <div className="relative h-24 md:h-32">
                            <Image
                              src={child.image}
                              alt={child.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-2 md:p-3">
                            <p className="font-bold text-gray-800">
                              {child.name}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Adoption CTA */}
          {cat.availableForAdoption && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-[#8B6F47] rounded-3xl p-8 text-white text-center"
            >
              <h2 className="text-3xl font-bold mb-4">
                Interested in Adopting {cat.name}?
              </h2>
              <p className="text-lg mb-6">
                {cat.name} is looking for a loving forever home! Get in touch to
                learn more about the adoption process.
              </p>
              <Link href="/#contact-section">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#8B6F47] px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Contact Us About {cat.name}
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
