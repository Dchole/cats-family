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
  x: number; // x position for this node
  parentX: number | null; // x position of parent for connection lines
}

const CARD_WIDTH = 192; // w-48 = 192px
const CARD_GAP = 16; // gap-4 = 16px
const CARD_SPACING = CARD_WIDTH + CARD_GAP;

export default function FamilyTree({
  matchingCats,
  contextCats
}: FamilyTreeProps) {
  // Build family trees
  const familyTrees = useMemo(() => {
    // Find root cats (no mother or father)
    const roots = cats.filter(cat => !cat.motherId && !cat.fatherId);

    const buildTree = (
      cat: Cat,
      level: number = 0
    ): Omit<TreeNode, "x" | "parentX"> => {
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

  // Calculate x positions for all nodes in the tree
  const calculatePositions = (
    node: Omit<TreeNode, "x" | "parentX">,
    parentX: number | null = null
  ): TreeNode => {
    // Filter visible children
    const visibleChildrenData = node.children.filter(
      child => getCatVisibility(child.cat.id).visible
    );

    // Recursively calculate positions for children
    let childStartX = 0;
    const positionedChildren = visibleChildrenData.map((child, idx) => {
      const positionedChild = calculatePositions(child, 0); // temp parentX
      const result = { ...positionedChild, x: childStartX };
      childStartX += getSubtreeWidth(positionedChild);
      return result;
    });

    // Calculate this node's x position
    let x: number;
    if (positionedChildren.length === 0) {
      // Leaf node: use x=0, will be adjusted relative to siblings
      x = 0;
    } else {
      // Parent node: center above children
      const firstChildX = positionedChildren[0].x;
      const lastChildX = positionedChildren[positionedChildren.length - 1].x;
      x = (firstChildX + lastChildX) / 2;
    }

    // Update children's parentX
    const finalChildren = positionedChildren.map(child => ({
      ...child,
      parentX: x
    }));

    return {
      cat: node.cat,
      children: finalChildren,
      level: node.level,
      x,
      parentX
    };
  };

  // Calculate total width of a subtree
  const getSubtreeWidth = (node: TreeNode): number => {
    const { visible } = getCatVisibility(node.cat.id);
    if (!visible) return 0;

    const visibleChildren = node.children.filter(
      child => getCatVisibility(child.cat.id).visible
    );

    if (visibleChildren.length === 0) {
      return CARD_SPACING;
    }

    const childrenWidth = visibleChildren.reduce(
      (sum, child) => sum + getSubtreeWidth(child),
      0
    );

    return Math.max(CARD_SPACING, childrenWidth);
  };

  // Flatten tree into levels for rendering
  const flattenByLevel = (node: TreeNode): Map<number, TreeNode[]> => {
    const levels = new Map<number, TreeNode[]>();

    const traverse = (n: TreeNode) => {
      const { visible } = getCatVisibility(n.cat.id);
      if (!visible) return;

      if (!levels.has(n.level)) {
        levels.set(n.level, []);
      }
      levels.get(n.level)!.push(n);

      n.children.forEach(child => traverse(child));
    };

    traverse(node);
    return levels;
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

  const renderTreeLayers = (rootNode: Omit<TreeNode, "x" | "parentX">) => {
    const { visible } = getCatVisibility(rootNode.cat.id);
    if (!visible) return null;

    // Calculate positions
    const positionedTree = calculatePositions(rootNode);

    // Flatten into levels
    const levels = flattenByLevel(positionedTree);
    const maxLevel = Math.max(...levels.keys());

    // Calculate total width
    const totalWidth = getSubtreeWidth(positionedTree);

    return (
      <div
        className="relative"
        style={{
          width: `${totalWidth}px`,
          minHeight: `${(maxLevel + 1) * 220}px`
        }}
      >
        {/* Render each level */}
        {Array.from(levels.entries()).map(([level, nodes]) => (
          <div
            key={level}
            className="absolute w-full"
            style={{ top: `${level * 220}px` }}
          >
            {nodes.map(node => (
              <div
                key={node.cat.id}
                className="absolute"
                style={{
                  left: `${node.x}px`,
                  width: `${CARD_WIDTH}px`
                }}
              >
                {renderCatCard(node)}
              </div>
            ))}
          </div>
        ))}

        {/* Render connection lines */}
        <svg
          className="absolute top-0 left-0 pointer-events-none"
          width={totalWidth}
          height={(maxLevel + 1) * 220}
        >
          {Array.from(levels.entries()).map(([level, nodes]) =>
            nodes.map(node => {
              const visibleChildren = node.children.filter(
                child => getCatVisibility(child.cat.id).visible
              );

              if (visibleChildren.length === 0) return null;

              const parentCenterX = node.x + CARD_WIDTH / 2;
              const parentBottomY = level * 220 + 180; // Card height ~180px

              return (
                <g key={node.cat.id}>
                  {/* Vertical line from parent */}
                  <line
                    x1={parentCenterX}
                    y1={parentBottomY}
                    x2={parentCenterX}
                    y2={parentBottomY + 24}
                    stroke="#ff8c42"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />

                  {/* Horizontal line connecting children if multiple */}
                  {visibleChildren.length > 1 && (
                    <>
                      <line
                        x1={visibleChildren[0].x + CARD_WIDTH / 2}
                        y1={parentBottomY + 24}
                        x2={
                          visibleChildren[visibleChildren.length - 1].x +
                          CARD_WIDTH / 2
                        }
                        y2={parentBottomY + 24}
                        stroke="#ff8c42"
                        strokeWidth="2"
                      />
                      {visibleChildren.map(child => {
                        const childCenterX = child.x + CARD_WIDTH / 2;
                        return (
                          <line
                            key={child.cat.id}
                            x1={childCenterX}
                            y1={parentBottomY + 24}
                            x2={childCenterX}
                            y2={parentBottomY + 40}
                            stroke="#ff8c42"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                        );
                      })}
                    </>
                  )}

                  {/* Single child - direct vertical line */}
                  {visibleChildren.length === 1 && (
                    <line
                      x1={parentCenterX}
                      y1={parentBottomY + 24}
                      x2={visibleChildren[0].x + CARD_WIDTH / 2}
                      y2={(level + 1) * 220}
                      stroke="#ff8c42"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  )}
                </g>
              );
            })
          )}
        </svg>
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
              {renderTreeLayers(tree)}
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
