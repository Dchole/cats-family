"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, LayoutGrid, GitBranch } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import FamilyTree from "../components/FamilyTree";
import { cats } from "@/lib/cats-data";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_AGE_MIN = 0;
const DEFAULT_AGE_MAX = 10;

export default function CatsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"tree" | "grid">("tree");
  const [filters, setFilters] = useState({
    ageMin: DEFAULT_AGE_MIN,
    ageMax: DEFAULT_AGE_MAX,
    gender: "all" as "all" | "male" | "female",
    color: "all",
    parent: "all",
    availableOnly: false
  });

  // Get unique values for dropdowns
  const uniqueColors = useMemo(
    () => ["all", ...new Set(cats.map(cat => cat.color))],
    []
  );

  const parentCats = useMemo(
    () =>
      cats.filter(cat =>
        cats.some(c => c.motherId === cat.id || c.fatherId === cat.id)
      ),
    []
  );

  // Apply filters
  const { matchingCats, contextCats } = useMemo(() => {
    const matching = new Set<string>();
    const context = new Set<string>();

    cats.forEach(cat => {
      // Check if cat matches filters
      let matches = true;

      if (cat.age < filters.ageMin || cat.age > filters.ageMax) matches = false;
      if (filters.gender !== "all" && cat.gender !== filters.gender)
        matches = false;
      if (filters.color !== "all" && cat.color !== filters.color)
        matches = false;
      if (
        filters.parent !== "all" &&
        cat.motherId !== filters.parent &&
        cat.fatherId !== filters.parent
      )
        matches = false;
      if (filters.availableOnly && !cat.availableForAdoption) matches = false;

      if (matches) {
        matching.add(cat.id);

        // Add family context (parents, children, siblings)
        if (cat.motherId) context.add(cat.motherId);
        if (cat.fatherId) context.add(cat.fatherId);

        // Add siblings (same mother or father)
        cats.forEach(sibling => {
          if (
            sibling.id !== cat.id &&
            ((cat.motherId && sibling.motherId === cat.motherId) ||
              (cat.fatherId && sibling.fatherId === cat.fatherId))
          ) {
            context.add(sibling.id);
          }
        });

        // Add children
        cats.forEach(child => {
          if (child.motherId === cat.id || child.fatherId === cat.id) {
            context.add(child.id);
          }
        });
      }
    });

    return {
      matchingCats: matching,
      contextCats: context
    };
  }, [filters]);

  const hasActiveFilters =
    filters.ageMin > 0 ||
    filters.ageMax < 10 ||
    filters.gender !== "all" ||
    filters.color !== "all" ||
    filters.parent !== "all" ||
    filters.availableOnly;

  // Get filtered cats for grid view
  const filteredCats = useMemo(() => {
    if (matchingCats.size === 0 && !hasActiveFilters) {
      return cats; // Show all if no filters
    }
    return cats.filter(cat => matchingCats.has(cat.id));
  }, [matchingCats, hasActiveFilters]);

  const resetFilters = () => {
    setFilters({
      ageMin: 0,
      ageMax: 10,
      gender: "all",
      color: "all",
      parent: "all",
      availableOnly: false
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      <main id="main-content" className="pt-28 pb-20 px-2 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-[#D4766A] mb-4">
              Our Feline Family Tree
            </h1>
            <p className="text-xl text-gray-700">
              Explore the generations of our adorable cat family
            </p>
          </motion.div>

          {/* Filter Toggle Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center gap-4 mb-8 flex-wrap"
          >
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-[#D4766A] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#C86A5D] hover:shadow-xl transition-all"
              aria-label={
                showFilters ? "Hide filter options" : "Show filter options"
              }
              aria-expanded={showFilters}
            >
              <Filter size={20} />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {hasActiveFilters && (
                <span className="bg-white text-[#D4766A] px-2 py-0.5 rounded-full text-sm font-bold">
                  Active
                </span>
              )}
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-lg border-2 border-[#8B9A8B]/30">
              <button
                onClick={() => setViewMode("tree")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                  viewMode === "tree"
                    ? "bg-[#D4766A] text-white shadow-md"
                    : "text-gray-600 hover:text-[#D4766A]"
                }`}
                aria-label="Switch to tree view"
                aria-pressed={viewMode === "tree"}
              >
                <GitBranch size={20} />
                Tree
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-[#D4766A] text-white shadow-md"
                    : "text-gray-600 hover:text-[#D4766A]"
                }`}
                aria-label="Switch to grid view"
                aria-pressed={viewMode === "grid"}
              >
                <LayoutGrid size={20} />
                Grid
              </button>
            </div>
          </motion.div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-[#8B9A8B]/20">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-3xl font-bold text-[#D4766A]">
                      Filter Family Tree
                    </h3>
                    {hasActiveFilters && (
                      <button
                        onClick={resetFilters}
                        className="flex items-center gap-2 bg-[#8B6F47] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#7A5F3C] hover:shadow-lg transition-all"
                        aria-label="Reset all filters"
                      >
                        <X size={18} />
                        Reset All
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Age Range */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Age Range (years)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={filters.ageMin}
                          onChange={e =>
                            setFilters({
                              ...filters,
                              ageMin: parseFloat(e.target.value)
                            })
                          }
                          className="w-20 px-3 py-2 border-2 border-[#8B9A8B]/30 rounded-xl focus:ring-2 focus:ring-[#D4766A] focus:border-[#D4766A] font-semibold text-gray-800 transition-all"
                        />
                        <span className="text-gray-600 font-medium">to</span>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={filters.ageMax}
                          onChange={e =>
                            setFilters({
                              ...filters,
                              ageMax: parseFloat(e.target.value)
                            })
                          }
                          className="w-20 px-3 py-2 border-2 border-[#8B9A8B]/30 rounded-xl focus:ring-2 focus:ring-[#D4766A] focus:border-[#D4766A] font-semibold text-gray-800 transition-all"
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Gender
                      </label>
                      <select
                        value={filters.gender}
                        onChange={e =>
                          setFilters({
                            ...filters,
                            gender: e.target.value as "all" | "male" | "female"
                          })
                        }
                        className="w-full px-4 py-2 border-2 border-[#8B9A8B]/30 rounded-xl focus:ring-2 focus:ring-[#D4766A] focus:border-[#D4766A] font-semibold text-gray-800 bg-white transition-all cursor-pointer"
                      >
                        <option value="all">All Genders</option>
                        <option value="male">♂ Male</option>
                        <option value="female">♀ Female</option>
                      </select>
                    </div>

                    {/* Color */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Color/Pattern
                      </label>
                      <select
                        value={filters.color}
                        onChange={e =>
                          setFilters({ ...filters, color: e.target.value })
                        }
                        className="w-full px-4 py-2 border-2 border-[#8B9A8B]/30 rounded-xl focus:ring-2 focus:ring-[#D4766A] focus:border-[#D4766A] font-semibold text-gray-800 bg-white transition-all cursor-pointer"
                      >
                        {uniqueColors.map(color => (
                          <option key={color} value={color}>
                            {color === "all" ? "All Colors" : color}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Parent Filter */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Parent
                      </label>
                      <select
                        value={filters.parent}
                        onChange={e =>
                          setFilters({ ...filters, parent: e.target.value })
                        }
                        className="w-full px-4 py-2 border-2 border-[#8B9A8B]/30 rounded-xl focus:ring-2 focus:ring-[#D4766A] focus:border-[#D4766A] font-semibold text-gray-800 bg-white transition-all cursor-pointer"
                      >
                        <option value="all">All Families</option>
                        {parentCats.map(parent => (
                          <option key={parent.id} value={parent.id}>
                            {parent.name}&apos;s Family
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Available for Adoption */}
                    <div className="flex items-center lg:col-span-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={filters.availableOnly}
                            onChange={e =>
                              setFilters({
                                ...filters,
                                availableOnly: e.target.checked
                              })
                            }
                            className="w-6 h-6 text-[#D4766A] border-2 border-[#8B9A8B]/30 rounded-lg focus:ring-2 focus:ring-[#D4766A] cursor-pointer transition-all"
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-800 group-hover:text-[#D4766A] transition-colors">
                          Available for Adoption Only
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Results Info */}
                  <div className="mt-6 pt-6 border-t-2 border-[#8B9A8B]/20">
                    <div className="bg-[#F5F1EA] rounded-2xl p-4">
                      <p className="text-center text-gray-800 font-medium">
                        <span className="font-bold text-[#D4766A] text-lg">
                          {matchingCats.size}
                        </span>{" "}
                        cat{matchingCats.size !== 1 ? "s" : ""} match your
                        filters
                        {contextCats.size > 0 && (
                          <>
                            {" "}
                            +{" "}
                            <span className="font-bold text-[#8B6F47] text-lg">
                              {contextCats.size}
                            </span>{" "}
                            family member{contextCats.size !== 1 ? "s" : ""}{" "}
                            shown for context
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend - only show for tree view */}
          {viewMode === "tree" && (
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-[#8B9A8B]/30">
                <div className="w-4 h-4 rounded-full bg-[#D4766A] ring-2 ring-[#D4766A]/50"></div>
                <span className="text-sm font-bold text-gray-700">
                  Matches Filter
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-gray-300">
                <div className="w-4 h-4 rounded-full bg-gray-300 ring-2 ring-gray-400"></div>
                <span className="text-sm font-bold text-gray-700">
                  Family Context
                </span>
              </div>
            </div>
          )}

          {/* Content - Tree or Grid View */}
          {viewMode === "tree" ? (
            <FamilyTree matchingCats={matchingCats} contextCats={contextCats} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredCats.map((cat, index) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/cats/${cat.id}`}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                      <div className="relative h-64">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {cat.availableForAdoption && (
                          <div className="absolute top-3 right-3 bg-[#8B6F47] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                            Available
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {cat.name}
                        </h3>
                        <div className="space-y-1 text-gray-600">
                          <p>
                            <span className="font-semibold">Age:</span>{" "}
                            {cat.age < 1
                              ? `${Math.round(cat.age * 12)} months`
                              : `${cat.age} year${cat.age !== 1 ? "s" : ""}`}
                          </p>
                          <p>
                            <span className="font-semibold">Gender:</span>{" "}
                            <span
                              className={
                                cat.gender === "male"
                                  ? "text-[#8B9A8B]"
                                  : "text-[#D4766A]"
                              }
                            >
                              {cat.gender === "male" ? "Male ♂" : "Female ♀"}
                            </span>
                          </p>
                          <p>
                            <span className="font-semibold">Color:</span>{" "}
                            {cat.color}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
