"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cats, Cat } from "@/lib/cats-data";
import Image from "next/image";
import Link from "next/link";

interface FamilyTreeProps {
  matchingCats: Set<string>;
  contextCats: Set<string>;
}

interface BaseTreeNode {
  cat: Cat;
  children: BaseTreeNode[];
  level: number;
}

interface TreeNode extends BaseTreeNode {
  children: TreeNode[];
  x: number; // x position for this node
  parentX: number | null; // x position of parent for connection lines
}

const CARD_WIDTH = 160; // w-40 = 160px
const CARD_GAP = 16; // gap-4 = 16px
const CARD_SPACING = CARD_WIDTH + CARD_GAP;
const MOBILE_CARD_WIDTH = 100; // Smaller for mobile
const MOBILE_CARD_GAP = 8; // Tighter gap on mobile
const MOBILE_CARD_SPACING = MOBILE_CARD_WIDTH + MOBILE_CARD_GAP;

export default function FamilyTree({
  matchingCats,
  contextCats
}: FamilyTreeProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Build family trees
  const familyTrees = useMemo(() => {
    // Find root cats (no mother or father)
    const roots = cats.filter(cat => !cat.motherId && !cat.fatherId);

    const buildTree = (cat: Cat, level: number = 0): BaseTreeNode => {
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
    node: BaseTreeNode,
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

    const spacing = isMobile ? MOBILE_CARD_SPACING : CARD_SPACING;

    if (visibleChildren.length === 0) {
      return spacing;
    }

    const childrenWidth = visibleChildren.reduce(
      (sum, child) => sum + getSubtreeWidth(child),
      0
    );

    return Math.max(spacing, childrenWidth);
  };

  // Get actual card height based on content
  const getCardHeight = (cat: Cat): number => {
    if (!isMobile) return 190; // Desktop height is consistent
    // Mobile: cards with "Available" are taller
    return cat.availableForAdoption ? 80 : 65;
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

  // Mobile-specific card rendering - compact with badge
  const renderMobileCatCard = (node: TreeNode) => {
    const { visible, isMatch, isContext } = getCatVisibility(node.cat.id);

    if (!visible) return null;

    const cardContent = (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isContext ? 0.5 : 1,
          scale: 1
        }}
        className={`relative ${
          isContext ? "grayscale cursor-default" : "cursor-pointer"
        }`}
      >
        <div
          className={`bg-white rounded-xl shadow-md overflow-visible transition-all duration-300 ${
            isMatch
              ? "ring-2 ring-orange-400"
              : isContext
              ? ""
              : "hover:bg-orange-50 hover:ring-2 hover:ring-orange-300"
          }`}
        >
          {/* Image Badge - top right */}
          <div className="absolute -top-1.5 -right-1.5 w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg z-10">
            <Image
              src={node.cat.image}
              alt={node.cat.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Info - more compact */}
          <div className="p-1 pr-5">
            <h3 className="text-sm font-bold text-gray-800 mb-0.5">
              {node.cat.name}
            </h3>
            <p className="text-[10px] text-gray-600 mb-0.5">
              {node.cat.age < 1
                ? `${Math.round(node.cat.age * 12)}mo`
                : `${node.cat.age}yr${node.cat.age !== 1 ? "s" : ""}`}{" "}
              •{" "}
              <span
                className={
                  node.cat.gender === "male" ? "text-blue-500" : "text-pink-500"
                }
              >
                {node.cat.gender === "male" ? "♂" : "♀"}
              </span>
            </p>
            <p className="text-[10px] text-gray-500 truncate">
              {node.cat.color}
            </p>
            {node.cat.availableForAdoption && (
              <p className="text-[10px] font-bold text-pink-600 mt-0.5">
                Available
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );

    // Only wrap in Link if it's not a context card
    if (isContext) {
      return <div key={node.cat.id}>{cardContent}</div>;
    }

    return (
      <Link href={`/cats/${node.cat.id}`} key={node.cat.id}>
        {cardContent}
      </Link>
    );
  };

  const renderCatCard = (node: TreeNode) => {
    const { visible, isMatch, isContext } = getCatVisibility(node.cat.id);

    if (!visible) return null;

    const cardContent = (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isContext ? 0.5 : 1,
          scale: 1
        }}
        className={`relative group ${
          isContext ? "grayscale cursor-default" : "cursor-pointer"
        }`}
      >
        <div
          className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
            isMatch
              ? "ring-4 ring-orange-400 shadow-orange-200"
              : isContext
              ? ""
              : "hover:bg-orange-50 hover:ring-2 hover:ring-orange-300 hover:shadow-xl"
          }`}
        >
          {/* Image */}
          <div className="relative h-28 overflow-hidden">
            <Image
              src={node.cat.image}
              alt={node.cat.name}
              fill
              className={`object-cover transition-transform duration-300 ${
                isContext ? "" : "group-hover:scale-110"
              }`}
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
                  node.cat.gender === "male" ? "text-blue-500" : "text-pink-500"
                }
              >
                {node.cat.gender === "male" ? "♂" : "♀"}
              </span>
            </p>
            <p className="text-xs text-gray-500">{node.cat.color}</p>
          </div>
        </div>
      </motion.div>
    );

    // Only wrap in Link if it's not a context card
    if (isContext) {
      return <div key={node.cat.id}>{cardContent}</div>;
    }

    return (
      <Link href={`/cats/${node.cat.id}`} key={node.cat.id}>
        {cardContent}
      </Link>
    );
  };

  const renderTreeLayers = (rootNode: BaseTreeNode) => {
    const { visible } = getCatVisibility(rootNode.cat.id);
    if (!visible) return null;

    // Use mobile dimensions and card renderer on small screens
    const cardWidth = isMobile ? MOBILE_CARD_WIDTH : CARD_WIDTH;
    const cardSpacing = isMobile ? MOBILE_CARD_SPACING : CARD_SPACING;
    const cardHeight = isMobile ? 65 : 190; // Shorter for mobile badge layout
    const levelHeight = isMobile ? 115 : 260; // Shorter vertical lines on mobile

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
          minHeight: `${(maxLevel + 1) * levelHeight}px`
        }}
      >
        {/* Render each level */}
        {Array.from(levels.entries()).map(([level, nodes]) => (
          <div
            key={level}
            className="absolute w-full"
            style={{ top: `${level * levelHeight}px` }}
          >
            {nodes.map(node => (
              <div
                key={node.cat.id}
                className="absolute"
                style={{
                  left: `${node.x}px`,
                  width: `${cardWidth}px`
                }}
              >
                {isMobile ? renderMobileCatCard(node) : renderCatCard(node)}
              </div>
            ))}
          </div>
        ))}

        {/* Render connection lines */}
        <svg
          className="absolute top-0 left-0 pointer-events-none"
          width={totalWidth}
          height={(maxLevel + 1) * levelHeight}
        >
          {Array.from(levels.entries()).map(([level, nodes]) =>
            nodes.map(node => {
              const visibleChildren = node.children.filter(
                child => getCatVisibility(child.cat.id).visible
              );

              if (visibleChildren.length === 0) return null;

              const parentCenterX = node.x + cardWidth / 2;
              const actualParentCardHeight = getCardHeight(node.cat);
              const parentBottomY =
                level * levelHeight + actualParentCardHeight;
              const gapFromCard = isMobile ? 12 : 8; // Larger gap for mobile to clear badge
              const lineStartY = parentBottomY + gapFromCard; // Add gap so line doesn't touch card

              const childTopY = (level + 1) * levelHeight;
              const lineEndY = childTopY - gapFromCard; // Stop before child card
              const connectorY = lineStartY + (lineEndY - lineStartY) / 2;

              return (
                <g key={node.cat.id}>
                  {/* Vertical line from parent */}
                  <line
                    x1={parentCenterX}
                    y1={lineStartY}
                    x2={parentCenterX}
                    y2={connectorY}
                    stroke="#ff8c42"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />

                  {/* Horizontal line connecting children if multiple */}
                  {visibleChildren.length > 1 && (
                    <>
                      <line
                        x1={visibleChildren[0].x + cardWidth / 2}
                        y1={connectorY}
                        x2={
                          visibleChildren[visibleChildren.length - 1].x +
                          cardWidth / 2
                        }
                        y2={connectorY}
                        stroke="#ff8c42"
                        strokeWidth="2"
                      />
                      {visibleChildren.map(child => {
                        const childCenterX = child.x + cardWidth / 2;
                        return (
                          <line
                            key={child.cat.id}
                            x1={childCenterX}
                            y1={connectorY}
                            x2={childCenterX}
                            y2={lineEndY}
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
                      y1={lineStartY}
                      x2={visibleChildren[0].x + cardWidth / 2}
                      y2={lineEndY}
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
    <div className="space-y-16 md:px-4">
      {familyTrees.map((tree, idx) => {
        const treeContent = renderTreeLayers(tree);

        // Don't render the family tree if it has no visible nodes
        if (!treeContent) return null;

        return (
          <motion.div
            key={tree.cat.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <h2 className="text-2xl font-bold text-center mb-8 text-orange-600">
              {tree.cat.name}'s Family
            </h2>
            <div className="overflow-x-auto pb-6 pt-2">
              <div className="min-w-max flex justify-center">{treeContent}</div>
            </div>
          </motion.div>
        );
      })}

      {familyTrees.every(tree => !renderTreeLayers(tree)) && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">No cats match your filters</p>
        </div>
      )}
    </div>
  );
}
