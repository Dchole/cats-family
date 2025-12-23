"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cats, Cat } from "@/lib/cats-data";
import Image from "next/image";
import Link from "next/link";

interface FamilyTreeProps {
  matchingCats: Set<string>;
  contextCats: Set<string>;
}

interface TreeNode {
  cat: Cat;
  children: TreeNode[];
  level: number;
}

export default function FamilyTree({
  matchingCats,
  contextCats
}: FamilyTreeProps) {
  // Build family trees
  const familyTrees = useMemo(() => {
    // Find root cats (no mother or father)
    const roots = cats.filter(cat => !cat.motherId && !cat.fatherId);

    const buildTree = (cat: Cat, level: number = 0): TreeNode => {
      const children = cats
        .filter(c => c.motherId === cat.id || c.fatherId === cat.id)
        .map(child => buildTree(child, level + 1));

      return { cat, children, level };
    };

    return roots.map(root => buildTree(root));
  }, []);

  // Determine if a cat should be shown based on filters
  const getCatVisibility = (catId: string) => {
    const isMatch = matchingCats.size === 0 || matchingCats.has(catId);
    const isContext = contextCats.has(catId);

    // If no filters are active, show everyone as match
    if (matchingCats.size === 0) {
      return { visible: true, isMatch: true, isContext: false };
    }

    // Show if it's a match or context
    return {
      visible: isMatch || isContext,
      isMatch,
      isContext: !isMatch && isContext
    };
  };

  const renderCatCard = (node: TreeNode) => {
    const { visible, isMatch, isContext } = getCatVisibility(node.cat.id);

    if (!visible) return null;

    return (
      <Link href={`/cats/${node.cat.id}`} key={node.cat.id}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isContext ? 0.5 : 1,
            scale: 1
          }}
          className={`relative group cursor-pointer ${
            isContext ? "grayscale" : ""
          }`}
        >
          <div
            className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
              isMatch
                ? "ring-4 ring-orange-400 shadow-orange-200"
                : "hover:bg-orange-50 hover:ring-2 hover:ring-orange-300 hover:shadow-xl"
            }`}
          >
            {/* Image */}
            <div className="relative h-28 overflow-hidden">
              <Image
                src={node.cat.image}
                alt={node.cat.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {node.cat.availableForAdoption && (
                <div className="absolute top-1.5 right-1.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg">
                  Available
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-3">
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                {node.cat.name}
              </h3>
              <p className="text-xs text-gray-600 mb-1">
                {node.cat.age < 1
                  ? `${Math.round(node.cat.age * 12)} months`
                  : `${node.cat.age} year${node.cat.age !== 1 ? "s" : ""}`}{" "}
                •{" "}
                <span
                  className={
                    node.cat.gender === "male"
                      ? "text-blue-500"
                      : "text-pink-500"
                  }
                >
                  {node.cat.gender === "male" ? "♂" : "♀"}
                </span>
              </p>
              <p className="text-xs text-gray-500">{node.cat.color}</p>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  };

  const renderTree = (node: TreeNode, isLast: boolean = false) => {
    const { visible } = getCatVisibility(node.cat.id);
    const visibleChildren = node.children.filter(
      child => getCatVisibility(child.cat.id).visible
    );

    if (!visible && visibleChildren.length === 0) return null;

    return (
      <div key={node.cat.id} className="flex flex-col items-center">
        {/* Cat Card */}
        {visible && <div className="w-48">{renderCatCard(node)}</div>}

        {/* Connector Line to Children (below card) */}
        {visible && visibleChildren.length > 0 && (
          <div className="relative my-4">
            <svg width="2" height="24" className="mx-auto">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="24"
                stroke="#ff8c42"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>
          </div>
        )}

        {/* Children */}
        {visibleChildren.length > 0 && (
          <div className="relative">
            {/* Horizontal connector line for multiple children */}
            {visibleChildren.length > 1 && (
              <div className="absolute top-0 left-0 right-0 flex justify-center">
                <svg
                  width={visibleChildren.length * 208 - 16}
                  height="28"
                  className="absolute"
                  style={{ top: "-28px" }}
                >
                  <line
                    x1={96}
                    y1="0"
                    x2={(visibleChildren.length - 1) * 208 + 96}
                    y2="0"
                    stroke="#ff8c42"
                    strokeWidth="2"
                  />
                  {visibleChildren.map((_, idx) => (
                    <line
                      key={idx}
                      x1={96 + idx * 208}
                      y1="0"
                      x2={96 + idx * 208}
                      y2="28"
                      stroke="#ff8c42"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  ))}
                </svg>
              </div>
            )}

            {/* Children cards */}
            <div className="flex gap-4 justify-center">
              {visibleChildren.map((child, idx) =>
                renderTree(child, idx === visibleChildren.length - 1)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-16 px-4">
      {familyTrees.map((tree, idx) => (
        <motion.div
          key={tree.cat.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-orange-600">
            {tree.cat.name}'s Family
          </h2>
          <div className="overflow-x-auto pb-6">
            <div className="min-w-max flex justify-center">
              {renderTree(tree)}
            </div>
          </div>
        </motion.div>
      ))}

      {familyTrees.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">No cats match your filters</p>
        </div>
      )}
    </div>
  );
}
