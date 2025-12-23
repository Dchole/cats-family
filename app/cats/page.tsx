"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import FamilyTree from "../components/FamilyTree";
import { cats } from "@/lib/cats-data";

export default function CatsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    ageMin: 0,
    ageMax: 10,
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

  const hasActiveFilters =
    filters.ageMin > 0 ||
    filters.ageMax < 10 ||
    filters.gender !== "all" ||
    filters.color !== "all" ||
    filters.parent !== "all" ||
    filters.availableOnly;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50">
      <Navigation />

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-orange-600 mb-4">
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
            className="flex justify-center mb-8"
          >
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <Filter size={20} />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {hasActiveFilters && (
                <span className="bg-white text-orange-600 px-2 py-0.5 rounded-full text-sm font-bold">
                  Active
                </span>
              )}
            </button>
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
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Filter Family Tree
                    </h3>
                    {hasActiveFilters && (
                      <button
                        onClick={resetFilters}
                        className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
                      >
                        <X size={18} />
                        Reset All
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Age Range */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <span className="text-gray-500">to</span>
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
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        value={filters.gender}
                        onChange={e =>
                          setFilters({
                            ...filters,
                            gender: e.target.value as any
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="all">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>

                    {/* Color */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Color/Pattern
                      </label>
                      <select
                        value={filters.color}
                        onChange={e =>
                          setFilters({ ...filters, color: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Parent
                      </label>
                      <select
                        value={filters.parent}
                        onChange={e =>
                          setFilters({ ...filters, parent: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="all">All Families</option>
                        {parentCats.map(parent => (
                          <option key={parent.id} value={parent.id}>
                            {parent.name}'s Family
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Available for Adoption */}
                    <div className="flex items-center">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.availableOnly}
                          onChange={e =>
                            setFilters({
                              ...filters,
                              availableOnly: e.target.checked
                            })
                          }
                          className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm font-semibold text-gray-700">
                          Available for Adoption Only
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Results Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-center text-gray-600">
                      <span className="font-bold text-orange-600">
                        {matchingCats.size}
                      </span>{" "}
                      cat{matchingCats.size !== 1 ? "s" : ""} match your filters
                      {contextCats.size > 0 && (
                        <>
                          {" "}
                          +{" "}
                          <span className="font-bold text-pink-600">
                            {contextCats.size}
                          </span>{" "}
                          family member{contextCats.size !== 1 ? "s" : ""} shown
                          for context
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-pink-500"></div>
              <span className="text-sm font-medium text-gray-700">
                Matches Filter
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-300"></div>
              <span className="text-sm font-medium text-gray-700">
                Family Context
              </span>
            </div>
          </div>

          {/* Family Tree */}
          <FamilyTree matchingCats={matchingCats} contextCats={contextCats} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
